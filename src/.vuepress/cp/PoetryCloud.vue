<template>
  <section class="poetry-cloud">
    <canvas ref="canvasRef" class="poetry-cloud__canvas" @pointermove="handlePointerMove" @click="handleCanvasClick" />

    <div class="poetry-cloud__brand" aria-hidden="true">
      <span>诗</span>
      <span>云</span>
    </div>

    <aside class="poetry-cloud__panel" aria-label="诗云检索">
      <div class="poetry-cloud__controls">
        <input v-model.trim="keyword" type="search" placeholder="搜题名、作者、诗句" />
        <select v-model="dynasty">
          <option value="">全部时代</option>
          <option v-for="item in dynasties" :key="item" :value="item">{{ item }}</option>
        </select>
        <button type="button" @click="pickRandom">随机一首</button>
      </div>
      <div class="poetry-cloud__stats">
        <span>{{ filteredPoems.length }} 首</span>
        <span>{{ authorsCount }} 位作者</span>
      </div>

      <article v-if="selectedAuthor" class="poetry-cloud__card">
        <div class="poetry-cloud__meta">
          <span>诗人</span>
          <span>{{ selectedAuthorPoems.length }} 首</span>
          <span>{{ selectedAuthorDynasties }}</span>
        </div>
        <h2>{{ selectedAuthor }}</h2>
        <div class="poetry-cloud__poem-list">
          <a v-for="poem in selectedAuthorPoems" :key="poem.id" :href="poem.path" @click.prevent="selectPoem(poem)">
            <span>{{ poem.title }}</span>
            <small>{{ poem.dynasty }}</small>
          </a>
        </div>
      </article>

      <article v-else-if="selectedPoem" class="poetry-cloud__card">
        <div class="poetry-cloud__meta">
          <span>{{ selectedPoem.dynasty }}</span>
          <span>{{ selectedPoem.author }}</span>
          <span v-if="selectedPoem.star">★ {{ selectedPoem.star }}</span>
        </div>
        <h2>{{ selectedPoem.title }}</h2>
        <div class="poetry-cloud__lines">
          <p v-for="line in selectedPoem.lines" :key="line">{{ line }}</p>
        </div>
        <a :href="selectedPoem.path">打开原文</a>
      </article>
    </aside>

    <footer class="poetry-cloud__hint">移动鼠标漫游星图，点击星点捞起一首诗。</footer>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { withBase } from "vuepress/client";
import { poetryCloudData } from "@temp/poetryCloudData.js";

const poems = poetryCloudData.map((poem, index) => ({ ...poem, index, path: withBase(poem.path) }));
const canvasRef = ref(null);
const keyword = ref("");
const dynasty = ref("");
const selectedPoem = ref(poems[0]);
const selectedAuthor = ref("");
const pointer = { x: 0, y: 0 };

let ctx;
let frame = 0;
let animationId = 0;
let points = [];
let bursts = [];
let poemLinkCache = { author: "", ids: "", pairs: [] };
let size = { width: 0, height: 0, dpr: 1 };

const dynasties = computed(() => [...new Set(poems.map((poem) => poem.dynasty))]);
const filteredPoems = computed(() => {
  const text = keyword.value.toLowerCase();

  return poems.filter((poem) => {
    const matchesDynasty = !dynasty.value || poem.dynasty === dynasty.value;
    const haystack = `${poem.title} ${poem.author} ${poem.dynasty} ${poem.lines.join(" ")}`.toLowerCase();
    return matchesDynasty && (!text || haystack.includes(text));
  });
});
const authorsCount = computed(() => new Set(filteredPoems.value.map((poem) => poem.author)).size);
const authors = computed(() => {
  const map = new Map();
  filteredPoems.value.forEach((poem) => {
    const item = map.get(poem.author) ?? { name: poem.author, poems: [], dynasties: new Set(), star: 0 };
    item.poems.push(poem);
    item.dynasties.add(poem.dynasty);
    item.star = Math.max(item.star, poem.star || 0);
    map.set(poem.author, item);
  });

  return [...map.values()].sort((a, b) => b.poems.length - a.poems.length || a.name.localeCompare(b.name, "zh-CN"));
});
const selectedAuthorPoems = computed(() => filteredPoems.value.filter((poem) => poem.author === selectedAuthor.value));
const selectedAuthorDynasties = computed(() => [...new Set(selectedAuthorPoems.value.map((poem) => poem.dynasty))].join("、"));

const hashText = (text) => {
  let hash = 2166136261;
  for (const char of text) {
    hash ^= char.charCodeAt(0);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0);
};

const starPalettes = [
  ["#b8d9ff", "#7aa7ff"],
  ["#c7f2d2", "#65d49a"],
  ["#f8d889", "#f0a94f"],
  ["#f3b4d8", "#df6ea7"],
  ["#d4c4ff", "#9c82ff"],
  ["#aee7ef", "#54cad7"],
];
const classicalFont = "'LXGW WenKai', 'STKaiti', 'KaiTi', 'Noto Serif SC', 'Songti SC', serif";
const beamPalettes = [
  [255, 241, 184],
  [184, 217, 255],
  [199, 242, 210],
  [243, 180, 216],
  [212, 196, 255],
  [174, 231, 239],
];

const buildPoints = () => {
  const groups = dynasties.value;
  const radius = Math.min(size.width, size.height) * 0.38;
  const centerX = size.width * 0.5;
  const centerY = size.height * 0.5;

  const authorPoints = authors.value.map((author, index) => {
    const seed = hashText(`author:${author.name}`);
    const angle = ((index / Math.max(authors.value.length, 1)) * Math.PI * 2) + (((seed % 1000) / 1000 - 0.5) * 0.5);
    const distance = Math.min(size.width, size.height) * (0.12 + ((seed >> 8) % 1000) / 1000 * 0.16);
    const palette = starPalettes[(index + author.star) % starPalettes.length];

    return {
      id: `author:${author.name}`,
      nodeType: "author",
      author: author.name,
      poems: author.poems,
      orbit: distance,
      angle,
      side: (((seed >> 16) % 1000) / 1000 - 0.5) * 26,
      depth: 1,
      speed: 0.00025,
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance * 0.42,
      r: Math.min(11, 5.4 + Math.sqrt(author.poems.length) * 0.95),
      phase: (seed % 628) / 100,
      active: selectedAuthor.value === author.name,
      color: palette[0],
      glow: palette[1],
    };
  });

  const poemPoints = filteredPoems.value.map((poem) => {
    const groupIndex = Math.max(groups.indexOf(poem.dynasty), 0);
    const seed = hashText(poem.id);
    const armCount = 4;
    const arm = groupIndex % armCount;
    const t = 0.08 + ((seed % 1000) / 1000) * 0.92;
    const spin = t * 5.8;
    const jitter = (((seed >> 8) % 1000) / 1000 - 0.5) * 0.62;
    const angle = (Math.PI * 2 * arm) / armCount + spin + jitter;
    const distance = 18 + Math.pow(t, 1.75) * radius;
    const thickness = (1 - t) * 56 + 12;
    const side = (((seed >> 16) % 1000) / 1000 - 0.5) * thickness;
    const depth = ((seed >> 24) % 1000) / 1000;
    const palette = starPalettes[(groupIndex + Math.max(poem.star, 1)) % starPalettes.length];

    return {
      id: `poem:${poem.id}`,
      nodeType: "poem",
      poem,
      orbit: distance,
      angle,
      side,
      depth,
      speed: 0.00045 + (1 - t) * 0.0012,
      x: centerX + Math.cos(angle) * distance - Math.sin(angle) * side,
      y: centerY + (Math.sin(angle) * distance + Math.cos(angle) * side) * 0.42,
      r: 1.8 + Math.sqrt(Math.max(poem.star, 1)) * 1.25,
      phase: (seed % 628) / 100,
      active: selectedPoem.value?.id === poem.id || selectedAuthor.value === poem.author,
      color: palette[0],
      glow: palette[1],
    };
  });

  points = [...authorPoints, ...poemPoints];
  poemLinkCache = { author: "", ids: "", pairs: [] };
};

const resize = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  size = {
    width: rect.width,
    height: rect.height,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
  };
  canvas.width = Math.floor(size.width * size.dpr);
  canvas.height = Math.floor(size.height * size.dpr);
  ctx = canvas.getContext("2d");
  ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
  buildPoints();
};

const draw = () => {
  if (!ctx) return;

  frame += 0.01;
  ctx.clearRect(0, 0, size.width, size.height);
  const gradient = ctx.createRadialGradient(size.width * 0.5, size.height * 0.46, 0, size.width * 0.5, size.height * 0.5, size.width * 0.72);
  gradient.addColorStop(0, "#172033");
  gradient.addColorStop(0.5, "#080b14");
  gradient.addColorStop(1, "#02030a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size.width, size.height);

  const driftX = pointer.x * 18;
  const driftY = pointer.y * 12;
  const centerX = size.width * 0.5;
  const centerY = size.height * 0.5;

  points.forEach((point) => {
    const angle = point.angle + frame * point.speed * 90;
    const wave = Math.sin(frame * 1.7 + point.phase) * (point.nodeType === "author" ? 3 : 7);
    const x = centerX + Math.cos(angle) * (point.orbit + wave) - Math.sin(angle) * point.side;
    const y = centerY + (Math.sin(angle) * (point.orbit + wave) + Math.cos(angle) * point.side) * 0.42;
    point.screenX = x;
    point.screenY = y;
    point.renderX = x + driftX;
    point.renderY = y + driftY;
  });

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgba(164, 184, 220, 0.08)";
  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < Math.min(i + 5, points.length); j += 1) {
      if (points[i].nodeType !== "poem" || points[j].nodeType !== "poem") continue;
      if (points[i].poem.dynasty !== points[j].poem.dynasty) continue;
      ctx.beginPath();
      ctx.moveTo(points[i].renderX, points[i].renderY);
      ctx.lineTo(points[j].renderX, points[j].renderY);
      ctx.stroke();
    }
  }

  const core = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(size.width, size.height) * 0.16);
  core.addColorStop(0, "rgba(248, 222, 146, 0.5)");
  core.addColorStop(0.45, "rgba(126, 166, 255, 0.14)");
  core.addColorStop(1, "rgba(126, 166, 255, 0)");
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, size.width, size.height);

  drawAuthorSelection();

  points.forEach((point) => {
    const pulse = Math.sin(frame * 4.2 + point.phase) * 0.55;
    const unrelated = selectedAuthor.value && point.nodeType === "poem" && point.poem.author !== selectedAuthor.value;
    const alpha = unrelated ? 0.18 : 0.55 + point.depth * 0.45;
    const selectedAuthorPoem = point.nodeType === "poem" && selectedAuthor.value === point.poem.author;
    const activeScale = point.nodeType === "author" && point.active ? 1.62 : selectedAuthorPoem ? 1.58 : point.active ? 1.28 : unrelated ? 0.7 : 1;
    ctx.beginPath();
    ctx.fillStyle = point.active || selectedAuthorPoem ? "#fff1b8" : hexToRgba(point.color, alpha);
    ctx.shadowColor = point.active || selectedAuthorPoem ? "#f5d889" : point.glow;
    ctx.shadowBlur = point.active || selectedAuthorPoem ? 46 : point.nodeType === "author" ? 18 : unrelated ? 0 : 10;
    ctx.arc(point.renderX, point.renderY, point.r * activeScale + pulse + (point.active ? 2 : 0), 0, Math.PI * 2);
    ctx.fill();

    if (point.nodeType === "author" && point.active) {
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255, 241, 184, 0.96)";
      ctx.font = `600 24px ${classicalFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(point.author, point.renderX, point.renderY - point.r * activeScale - 16);
    } else if (selectedAuthorPoem) {
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(223, 231, 248, 0.82)";
      ctx.font = `14px ${classicalFont}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(point.poem.title, point.renderX, point.renderY + point.r * activeScale + 14);
    }
  });

  drawBursts();
  ctx.shadowBlur = 0;
  animationId = window.requestAnimationFrame(draw);
};

const drawAuthorSelection = () => {
  if (!selectedAuthor.value) return;

  const authorPoint = points.find((point) => point.nodeType === "author" && point.author === selectedAuthor.value);
  if (!authorPoint) return;

  const now = performance.now();
  const breathe = (Math.sin(now / 360) + 1) / 2;
  const relatedPoems = points.filter((point) => point.nodeType === "poem" && point.poem.author === selectedAuthor.value);
  const effect = getAuthorEffectProfile(relatedPoems.length);

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  if (effect.beamCount > 0) drawScatteredBeams(authorPoint, breathe, effect);
  relatedPoems.slice(0, effect.maxPierce).forEach((point) => {
    const edge = projectRayToEdge(authorPoint.renderX, authorPoint.renderY, point.renderX, point.renderY);
    const beam = ctx.createLinearGradient(authorPoint.renderX, authorPoint.renderY, edge.x, edge.y);
    beam.addColorStop(0, `rgba(255, 241, 184, ${effect.pierceAlpha * 2})`);
    beam.addColorStop(0.28, `rgba(248, 222, 146, ${effect.pierceAlpha})`);
    beam.addColorStop(0.62, `rgba(126, 166, 255, ${effect.pierceAlpha * 0.5})`);
    beam.addColorStop(1, "rgba(126, 166, 255, 0)");

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = effect.pierceWidth + breathe * 1.2;
    ctx.strokeStyle = beam;
    ctx.shadowColor = "#f5d889";
    ctx.shadowBlur = 5;
    ctx.moveTo(authorPoint.renderX, authorPoint.renderY);
    ctx.lineTo(edge.x, edge.y);
    ctx.stroke();
  });
  ctx.restore();

  ctx.save();
  ctx.globalCompositeOperation = "screen";
  drawConstellationLinks(authorPoint, relatedPoems, breathe, effect);
  ctx.setLineDash([12, 18]);
  ctx.lineDashOffset = -frame * 150;
  relatedPoems.forEach((point) => {
    const edge = projectRayToEdge(authorPoint.renderX, authorPoint.renderY, point.renderX, point.renderY);
    const core = ctx.createLinearGradient(authorPoint.renderX, authorPoint.renderY, edge.x, edge.y);
    core.addColorStop(0, "rgba(255, 248, 214, 0.95)");
    core.addColorStop(0.35, "rgba(255, 241, 184, 0.72)");
    core.addColorStop(0.7, "rgba(174, 216, 255, 0.22)");
    core.addColorStop(1, "rgba(174, 216, 255, 0)");

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 1.15;
    ctx.strokeStyle = core;
    ctx.shadowColor = "#fff1b8";
    ctx.shadowBlur = 6;
    ctx.moveTo(authorPoint.renderX, authorPoint.renderY);
    ctx.lineTo(edge.x, edge.y);
    ctx.stroke();
  });
  ctx.restore();

  const haloRadius = authorPoint.r * (4.2 + breathe * 1.2);
  const halo = ctx.createRadialGradient(authorPoint.renderX, authorPoint.renderY, 0, authorPoint.renderX, authorPoint.renderY, haloRadius);
  halo.addColorStop(0, "rgba(255, 241, 184, 0.34)");
  halo.addColorStop(0.45, "rgba(248, 222, 146, 0.18)");
  halo.addColorStop(1, "rgba(248, 222, 146, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(authorPoint.renderX - haloRadius, authorPoint.renderY - haloRadius, haloRadius * 2, haloRadius * 2);

  for (let i = 0; i < 2; i += 1) {
    ctx.beginPath();
    ctx.lineWidth = i === 0 ? 2.4 : 1.2;
    ctx.strokeStyle = `rgba(255, 241, 184, ${0.56 - i * 0.24})`;
    ctx.arc(authorPoint.renderX, authorPoint.renderY, authorPoint.r * (2.3 + i * 1.25 + breathe * 0.7), 0, Math.PI * 2);
    ctx.stroke();
  }

  relatedPoems.forEach((point) => {
    const radius = point.r * (2.55 + breathe * 0.55);
    ctx.beginPath();
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = "rgba(255, 241, 184, 0.46)";
    ctx.arc(point.renderX, point.renderY, radius, 0, Math.PI * 2);
    ctx.stroke();
  });
};

const getAuthorEffectProfile = (count) => {
  if (count <= 2) return { beamCount: 10, maxPierce: count, pierceWidth: 2.2, pierceAlpha: 0.02, poemNeighbors: 1 };
  if (count <= 6) return { beamCount: 16, maxPierce: count, pierceWidth: 2.4, pierceAlpha: 0.018, poemNeighbors: 1 };
  if (count <= 14) return { beamCount: 24, maxPierce: 8, pierceWidth: 2.8, pierceAlpha: 0.014, poemNeighbors: 2 };
  return { beamCount: 32, maxPierce: 10, pierceWidth: 3, pierceAlpha: 0.011, poemNeighbors: 2 };
};

const drawScatteredBeams = (origin, breathe, effect) => {
  const beamCount = effect.beamCount;
  const baseAngle = frame * 0.18 + origin.phase;
  const seed = hashText(origin.id);

  for (let i = 0; i < beamCount; i += 1) {
    const jitter = (((seed >> (i % 16)) + i * 97) % 1000) / 1000;
    const angle = baseAngle + (Math.PI * 2 * (i + jitter * 0.5)) / beamCount + Math.sin(frame * 1.1 + i) * 0.025;
    const distance = Math.max(size.width, size.height) * (0.46 + (((seed + i * 131) % 1000) / 1000) * 0.42);
    const endX = origin.renderX + Math.cos(angle) * distance;
    const endY = origin.renderY + Math.sin(angle) * distance;
    const beam = ctx.createLinearGradient(origin.renderX, origin.renderY, endX, endY);
    const color = beamPalettes[(seed + i * 7) % beamPalettes.length];
    const strength = 0.0055 + ((i % 3) * 0.0018) + breathe * 0.0025;

    beam.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${strength * 3.2})`);
    beam.addColorStop(0.2, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${strength * 1.35})`);
    beam.addColorStop(0.62, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${strength * 0.5})`);
    beam.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 0.55 + (i % 4) * 0.16 + breathe * 0.16;
    ctx.strokeStyle = beam;
    ctx.shadowColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    ctx.shadowBlur = 1.4;
    ctx.moveTo(origin.renderX, origin.renderY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
};

const drawConstellationLinks = (origin, relatedPoems, breathe, effect) => {
  const sorted = [...relatedPoems].sort((a, b) => Math.atan2(a.renderY - origin.renderY, a.renderX - origin.renderX) - Math.atan2(b.renderY - origin.renderY, b.renderX - origin.renderX));

  ctx.save();
  ctx.setLineDash([]);
  ctx.lineCap = "round";
  ctx.shadowColor = "#fff1b8";
  ctx.shadowBlur = 10;
  ctx.lineWidth = 0.72 + breathe * 0.18;
  ctx.strokeStyle = "rgba(255, 241, 184, 0.42)";

  sorted.forEach((point) => {
    ctx.beginPath();
    ctx.moveTo(origin.renderX, origin.renderY);
    ctx.lineTo(point.renderX, point.renderY);
    ctx.stroke();
  });

  drawPoemLinks(sorted, effect.poemNeighbors);
  ctx.restore();
};

const drawPoemLinks = (poems, neighbors) => {
  if (poems.length < 2) return;

  const ids = poems.map((point) => point.id).join("|");
  if (poemLinkCache.author !== selectedAuthor.value || poemLinkCache.ids !== ids) {
    const drawn = new Set();
    const pairs = [];

    poems.forEach((point, index) => {
      const nearest = poems
        .map((other, otherIndex) => ({
          otherIndex,
          distance: index === otherIndex ? Number.POSITIVE_INFINITY : Math.hypot(point.x - other.x, point.y - other.y),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, Math.min(neighbors, poems.length - 1));

      nearest.forEach(({ otherIndex }) => {
        const key = [index, otherIndex].sort((a, b) => a - b).join("-");
        if (drawn.has(key)) return;
        drawn.add(key);
        pairs.push([index, otherIndex]);
      });
    });

    poemLinkCache = { author: selectedAuthor.value, ids, pairs };
  }

  ctx.lineWidth = 0.72;
  ctx.strokeStyle = "rgba(174, 216, 255, 0.42)";
  ctx.shadowColor = "#aee7ef";
  ctx.shadowBlur = 5;

  poemLinkCache.pairs.forEach(([from, to]) => {
    const point = poems[from];
    const other = poems[to];
    if (!point || !other) return;

    ctx.beginPath();
    ctx.moveTo(point.renderX, point.renderY);
    ctx.lineTo(other.renderX, other.renderY);
    ctx.stroke();
  });
};

const projectRayToEdge = (x1, y1, x2, y2) => {
  const dx = x2 - x1 || 1;
  const dy = y2 - y1 || 1;
  const candidates = [];

  if (dx > 0) candidates.push((size.width - x1) / dx);
  if (dx < 0) candidates.push((0 - x1) / dx);
  if (dy > 0) candidates.push((size.height - y1) / dy);
  if (dy < 0) candidates.push((0 - y1) / dy);

  const t = Math.max(1.2, Math.min(...candidates.filter((value) => value > 0)));
  return { x: x1 + dx * t, y: y1 + dy * t };
};

const drawBursts = () => {
  const now = performance.now();
  bursts = bursts.filter((burst) => now - burst.start < 1400);
  bursts.forEach((burst) => {
    const t = (now - burst.start) / 1400;
    const ease = 1 - Math.pow(1 - t, 3);
    const radius = 24 + ease * (burst.kind === "author" ? 230 : 150);

    for (let i = 0; i < 3; i += 1) {
      const ringRadius = radius - i * 22;
      if (ringRadius <= 0) continue;
      ctx.beginPath();
      ctx.strokeStyle = hexToRgba(burst.color, (1 - t) * (0.78 - i * 0.18));
      ctx.lineWidth = Math.max(0.8, 4.8 - i * 1.1 - t * 2);
      ctx.arc(burst.x, burst.y, ringRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    const flare = ctx.createRadialGradient(burst.x, burst.y, 0, burst.x, burst.y, radius * 0.55);
    flare.addColorStop(0, `rgba(255, 241, 184, ${(1 - t) * 0.54})`);
    flare.addColorStop(0.34, `rgba(248, 222, 146, ${(1 - t) * 0.2})`);
    flare.addColorStop(1, "rgba(255, 241, 184, 0)");
    ctx.fillStyle = flare;
    ctx.fillRect(burst.x - radius, burst.y - radius, radius * 2, radius * 2);

    const sparkCount = burst.kind === "author" ? 18 : 10;
    ctx.fillStyle = `rgba(255, 241, 184, ${(1 - t) * 0.8})`;
    for (let i = 0; i < sparkCount; i += 1) {
      const angle = (Math.PI * 2 * i) / sparkCount + burst.seed;
      const sparkRadius = radius * (0.32 + ((i * 37) % 100) / 260);
      ctx.beginPath();
      ctx.arc(burst.x + Math.cos(angle) * sparkRadius, burst.y + Math.sin(angle) * sparkRadius, 1.1 + (i % 3) * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }
  });
};

const hexToRgba = (hex, alpha) => {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const pointFromEvent = (event) => {
  const rect = canvasRef.value.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
};

const handlePointerMove = (event) => {
  const { x, y } = pointFromEvent(event);
  pointer.x = (x / size.width - 0.5) * -1;
  pointer.y = (y / size.height - 0.5) * -1;
};

const handleCanvasClick = (event) => {
  const { x, y } = pointFromEvent(event);
  const driftX = pointer.x * 18;
  const driftY = pointer.y * 12;
  const nearest = points
    .map((point) => ({ point, distance: Math.hypot((point.screenX ?? point.x) + driftX - x, (point.screenY ?? point.y) + driftY - y) }))
    .sort((a, b) => a.distance - b.distance)[0];

  if (!nearest || nearest.distance >= Math.max(28, nearest.point.r + 18)) return;

  bursts.push({ x, y, start: performance.now(), color: nearest.point.glow, kind: nearest.point.nodeType, seed: nearest.point.phase });
  if (nearest.point.nodeType === "author") {
    selectedAuthor.value = nearest.point.author;
    selectedPoem.value = nearest.point.poems[0] ?? selectedPoem.value;
  } else {
    selectPoem(nearest.point.poem);
  }
};

const selectPoem = (poem) => {
  selectedAuthor.value = "";
  selectedPoem.value = poem;
};

const pickRandom = () => {
  const list = filteredPoems.value;
  if (!list.length) return;
  selectPoem(list[Math.floor(Math.random() * list.length)]);
};

watch([filteredPoems, selectedPoem, selectedAuthor], () => {
  nextTick(buildPoints);
});

onMounted(() => {
  selectedPoem.value = poems.find((poem) => poem.star >= 5) ?? poems[0];
  resize();
  window.addEventListener("resize", resize);
  draw();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resize);
  window.cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.poetry-cloud {
  position: relative;
  min-height: 100vh;
  margin: calc(var(--navbar-height, 3.6rem) * -1) 0 0;
  overflow: hidden;
  background: #03050c;
  color: #edf2ff;
}

.poetry-cloud__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}

.poetry-cloud__brand,
.poetry-cloud__panel,
.poetry-cloud__hint {
  position: relative;
  z-index: 1;
}

.poetry-cloud__brand {
  display: flex;
  position: absolute;
  left: clamp(22px, 4vw, 62px);
  top: 50%;
  flex-direction: column;
  align-items: center;
  gap: 0.08em;
  transform: translateY(-50%);
  color: rgba(255, 241, 184, 0.9);
  font-family: "Noto Serif SC", "Songti SC", serif;
  font-size: clamp(46px, 7vw, 96px);
  font-weight: 500;
  letter-spacing: 0;
  line-height: 0.95;
  text-shadow: 0 0 30px rgba(245, 216, 137, 0.32), 0 10px 36px rgba(0, 0, 0, 0.5);
  writing-mode: vertical-rl;
  pointer-events: none;
}

.poetry-cloud__stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
  color: #bcc8de;
  font-size: 14px;
  margin-bottom: 12px;
}

.poetry-cloud__stats span,
.poetry-cloud__controls input,
.poetry-cloud__controls select,
.poetry-cloud__controls button,
.poetry-cloud__card {
  border: 1px solid rgba(191, 211, 255, 0.18);
  background: rgba(7, 11, 22, 0.72);
  backdrop-filter: blur(18px);
}

.poetry-cloud__stats span {
  padding: 8px 12px;
  border-radius: 999px;
}

.poetry-cloud__panel {
  box-sizing: border-box;
  width: min(420px, calc(100vw - 32px));
  margin: 0;
  padding: clamp(18px, 3vw, 30px) 0 0 clamp(18px, 4vw, 32px);
}

.poetry-cloud__controls {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  margin-bottom: 12px;
}

.poetry-cloud__controls input,
.poetry-cloud__controls select,
.poetry-cloud__controls button {
  min-height: 42px;
  border-radius: 8px;
  color: #edf2ff;
  font: inherit;
}

.poetry-cloud__controls input,
.poetry-cloud__controls select {
  padding: 0 12px;
}

.poetry-cloud__controls input {
  grid-column: 1 / -1;
}

.poetry-cloud__controls button {
  padding: 0 14px;
  color: #0b1020;
  background: #d8c89a;
  cursor: pointer;
}

.poetry-cloud__card {
  border-radius: 8px;
  padding: 22px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
}

.poetry-cloud__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: #d8c89a;
  font-size: 13px;
}

.poetry-cloud__card h2 {
  margin: 12px 0 18px;
  font-family: "LXGW WenKai", "STKaiti", "KaiTi", "Noto Serif SC", "Songti SC", serif;
  font-size: 28px;
  font-weight: 500;
  letter-spacing: 0;
}

.poetry-cloud__lines {
  max-height: 38vh;
  overflow: auto;
  color: #dfe7f8;
  font-family: "Noto Serif SC", "Songti SC", serif;
  line-height: 2;
}

.poetry-cloud__lines p {
  margin: 0;
}

.poetry-cloud__poem-list {
  display: grid;
  gap: 8px;
  max-height: 42vh;
  overflow: auto;
}

.poetry-cloud__poem-list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 38px;
  padding: 8px 10px;
  border: 1px solid rgba(191, 211, 255, 0.12);
  border-radius: 8px;
  color: #dfe7f8;
  font-family: "Noto Serif SC", "Songti SC", serif;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.035);
}

.poetry-cloud__poem-list a:hover {
  border-color: rgba(216, 200, 154, 0.42);
  color: #fff1b8;
}

.poetry-cloud__poem-list span {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.poetry-cloud__poem-list small {
  flex: 0 0 auto;
  color: #8f9db8;
  font-family: "LXGW WenKai", "STKaiti", "KaiTi", "Noto Serif SC", "Songti SC", serif;
}

.poetry-cloud__card a {
  display: inline-flex;
  margin-top: 18px;
  color: #d8c89a;
  text-decoration: none;
}

.poetry-cloud__hint {
  position: absolute;
  left: clamp(20px, 5vw, 72px);
  bottom: 24px;
  color: #8f9db8;
  font-size: 13px;
}

@media (max-width: 719px) {
  .poetry-cloud {
    min-height: 100vh;
    margin-top: calc(var(--navbar-height, 3.6rem) * -1);
  }

  .poetry-cloud__brand {
    left: auto;
    right: 14px;
    top: 28%;
    font-size: clamp(38px, 18vw, 64px);
    opacity: 0.6;
  }

  .poetry-cloud__stats {
    justify-content: flex-start;
  }

  .poetry-cloud__panel {
    box-sizing: border-box;
    width: min(420px, calc(100vw - 28px));
    padding: 16px 0 0 14px;
  }

  .poetry-cloud__hint {
    display: none;
  }
}

:global(.theme-container:has(.poetry-cloud)) {
  background: #03050c;
}

:global(.theme-container:has(.poetry-cloud) .vp-page) {
  padding-bottom: 0;
}

:global(.theme-container:has(.poetry-cloud) .vp-page-title),
:global(.theme-container:has(.poetry-cloud) .vp-page-meta),
:global(.theme-container:has(.poetry-cloud) .vp-footer-wrapper),
:global(.theme-container:has(.poetry-cloud) .vp-breadcrumb),
:global(.theme-container:has(.poetry-cloud) #comment),
:global(.theme-container:has(.poetry-cloud) .vp-navbar),
:global(.theme-container:has(.poetry-cloud) .vp-sidebar),
:global(.theme-container:has(.poetry-cloud) .toggle-sidebar-wrapper) {
  display: none !important;
}

:global(.theme-container:has(.poetry-cloud)) {
  --navbar-height: 0px;
}

:global(.theme-container:has(.poetry-cloud) .vp-page),
:global(.theme-container:has(.poetry-cloud) .vp-project-home) {
  padding-inline-start: 0 !important;
  padding-top: 0 !important;
}

:global(.theme-container:has(.poetry-cloud) [vp-content]),
:global(.theme-container:has(.poetry-cloud) #markdown-content) {
  width: 100%;
  max-width: none;
  padding: 0;
  margin: 0;
}
</style>
