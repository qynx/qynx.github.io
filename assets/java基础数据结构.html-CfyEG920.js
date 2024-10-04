import{_ as s,c as a,d as e,o as t}from"./app-B-Ddy27p.js";const h={};function l(n,i){return t(),a("div",null,i[0]||(i[0]=[e(`<h1 id="java-基础数据结构" tabindex="-1"><a class="header-anchor" href="#java-基础数据结构"><span>java 基础数据结构</span></a></h1><h2 id="_1-优先队列-堆" tabindex="-1"><a class="header-anchor" href="#_1-优先队列-堆"><span>1. 优先队列(堆)</span></a></h2><h3 id="_1-0-初始化" tabindex="-1"><a class="header-anchor" href="#_1-0-初始化"><span>1.0 初始化</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">PriorityQueue</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Integer</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> priorityQueue </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> PriorityQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">((a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> b) </span><span style="--shiki-light:#C18401;--shiki-dark:#C678DD;">-&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> a</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">b)</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-1-入队列" tabindex="-1"><a class="header-anchor" href="#_1-1-入队列"><span>1.1 入队列</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">priorityQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">offer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-2-出队列" tabindex="-1"><a class="header-anchor" href="#_1-2-出队列"><span>1.2 出队列</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">priorityQueue</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">poll</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-3-demo" tabindex="-1"><a class="header-anchor" href="#_1-3-demo"><span>1.3 demo</span></a></h3><iframe src="https://pl.kotl.in/tBnF-3eSf" height="220" width="600"></iframe><h2 id="_2-栈" tabindex="-1"><a class="header-anchor" href="#_2-栈"><span>2. 栈</span></a></h2><h3 id="_1-0-初始化-1" tabindex="-1"><a class="header-anchor" href="#_1-0-初始化-1"><span>1.0 初始化</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Deque</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Integer</span><span style="--shiki-light:#E45649;--shiki-dark:#ABB2BF;">&gt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> deque </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ArrayDeque</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-1-入栈" tabindex="-1"><a class="header-anchor" href="#_1-1-入栈"><span>1.1 入栈</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">deque</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">push</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">deque</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">push</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-出栈" tabindex="-1"><a class="header-anchor" href="#_1-2-出栈"><span>1.2 出栈</span></a></h3><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">deque</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pop</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">()</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="_1-3-demo-1" tabindex="-1"><a class="header-anchor" href="#_1-3-demo-1"><span>1.3 demo</span></a></h3><iframe src="https://pl.kotl.in/z6KeB8t3P" height="220" width="600"></iframe>`,19)]))}const d=s(h,[["render",l],["__file","java基础数据结构.html.vue"]]),k=JSON.parse('{"path":"/posts/%E5%8D%9A%E5%AE%A2/java%E5%9F%BA%E7%A1%80%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.html","title":"java 基础数据结构","lang":"zh-CN","frontmatter":{"icon":"java","date":"2024-01-01T00:00:00.000Z","title":"java 基础数据结构","category":["博客"],"tag":["java","数据结构"],"gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/%E5%8D%9A%E5%AE%A2/java%E5%9F%BA%E7%A1%80%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.html"}],["meta",{"property":"og:site_name","content":"向来枉费推移力 此日中流自在行"}],["meta",{"property":"og:title","content":"java 基础数据结构"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"数据结构"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"java 基础数据结构\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"荆州牧\\",\\"url\\":\\"https://mrhope.site\\"}]}"]]},"headers":[{"level":2,"title":"1. 优先队列(堆)","slug":"_1-优先队列-堆","link":"#_1-优先队列-堆","children":[{"level":3,"title":"1.0 初始化","slug":"_1-0-初始化","link":"#_1-0-初始化","children":[]},{"level":3,"title":"1.1 入队列","slug":"_1-1-入队列","link":"#_1-1-入队列","children":[]},{"level":3,"title":"1.2 出队列","slug":"_1-2-出队列","link":"#_1-2-出队列","children":[]},{"level":3,"title":"1.3 demo","slug":"_1-3-demo","link":"#_1-3-demo","children":[]}]},{"level":2,"title":"2. 栈","slug":"_2-栈","link":"#_2-栈","children":[{"level":3,"title":"1.0 初始化","slug":"_1-0-初始化-1","link":"#_1-0-初始化-1","children":[]},{"level":3,"title":"1.1 入栈","slug":"_1-1-入栈","link":"#_1-1-入栈","children":[]},{"level":3,"title":"1.2 出栈","slug":"_1-2-出栈","link":"#_1-2-出栈","children":[]},{"level":3,"title":"1.3 demo","slug":"_1-3-demo-1","link":"#_1-3-demo-1","children":[]}]}],"readingTime":{"minutes":0.37,"words":112},"filePathRelative":"posts/博客/java基础数据结构.md","localizedDate":"2024年1月1日","excerpt":"\\n"}');export{d as comp,k as data};
