import fs from "node:fs";
import path from "node:path";

const POETRY_ROOT = path.resolve(process.cwd(), "src/posts/诗词");
const EXCLUDED_DIRS = new Set(["收录"]);

const walkMarkdownFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) return [];
      return walkMarkdownFiles(fullPath);
    }

    if (entry.isFile() && entry.name.endsWith(".md")) return [fullPath];
    return [];
  });
};

const parseFrontmatterValue = (frontmatter, key) => {
  const lines = frontmatter.split(/\r?\n/);
  const index = lines.findIndex((line) => line.trim().startsWith(`${key}:`));
  if (index < 0) return "";

  const firstValue = lines[index].replace(new RegExp(`^\\s*${key}:\\s*`), "").trim();
  if (firstValue) return firstValue.replace(/^["']|["']$/g, "");

  const values = [];
  for (let i = index + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\w[\w-]*:/.test(line.trim())) break;
    const match = line.match(/^\s*-\s*(.+)\s*$/);
    if (match) values.push(match[1].trim());
  }
  return values.join("、");
};

const stripMarkdown = (line) =>
  line
    .replace(/<[^>]+>/g, "")
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/==(.+?)==/g, "$1")
    .replace(/[`*_~#>\[\]()]/g, "")
    .trim();

const extractCenterBlocks = (body) => {
  const blocks = [];
  const lines = body.split(/\r?\n/);
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^:::\s*center\b/i.test(trimmed) || /^::::\s*center\b/i.test(trimmed)) {
      current = [];
      const inline = trimmed.replace(/^:{3,4}\s*center\s*/i, "").trim();
      if (inline) current.push(inline);
      continue;
    }

    if (current && /^:{3,4}\s*$/.test(trimmed)) {
      blocks.push(current);
      current = null;
      continue;
    }

    if (current) current.push(line);
  }

  return blocks.flat();
};

const isNoiseLine = (line, title) => {
  if (!line || line === title) return true;
  if (/^:{3,4}/.test(line)) return true;
  if (/^<!--|-->$/.test(line)) return true;
  if (line === "more" || line === "正文") return true;
  if (/^[-:]{3,}$/.test(line)) return true;
  if (/^https?:\/\//.test(line)) return true;
  if (/^\d+\.\s*https?:\/\//.test(line)) return true;
  if (/^[.#]?[\w-]+\s*\{?$/.test(line)) return true;
  if (/^[\w-]+\s*:\s*[^，。！？；、]*;?$/.test(line)) return true;
  if (/^\}?$/.test(line)) return true;
  return false;
};

const parsePoem = (filePath) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const frontmatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const frontmatter = frontmatterMatch?.[1] ?? "";
  const body = raw.slice(frontmatterMatch?.[0]?.length ?? 0);
  const title = body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(filePath, ".md");
  const relative = path.relative(POETRY_ROOT, filePath).replace(/\\/g, "/");
  const [dynasty] = relative.split("/");

  if (relative === "诗词进度.md" || !dynasty || dynasty === relative) return null;

  const candidateLines = extractCenterBlocks(body);
  const sourceLines = candidateLines.length ? candidateLines : body.split(/\r?\n/);
  const contentLines = sourceLines
    .map(stripMarkdown)
    .filter((line) => !isNoiseLine(line, title));
  if (contentLines.length === 0) return null;

  const author = parseFrontmatterValue(frontmatter, "author") || "佚名";
  const star = Number.parseInt(parseFrontmatterValue(frontmatter, "star"), 10) || 0;
  const slug = relative.replace(/\.md$/, "");

  return {
    id: slug,
    title,
    author,
    dynasty,
    star,
    lines: contentLines,
    excerpt: contentLines.slice(0, 2).join(" "),
    path: `/posts/诗词/${slug}.html`,
  };
};

export const getPoetryCloudData = () =>
  walkMarkdownFiles(POETRY_ROOT)
    .map(parsePoem)
    .filter(Boolean)
    .sort((a, b) => {
      if (b.star !== a.star) return b.star - a.star;
      return a.title.localeCompare(b.title, "zh-CN");
    });
