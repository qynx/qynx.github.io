import{_ as s,o as i,c as a,e as n}from"./app-B5v9PERm.js";const l={},e=n(`<h1 id="maven-gradle-镜像配置" tabindex="-1"><a class="header-anchor" href="#maven-gradle-镜像配置"><span>maven/gradle 镜像配置</span></a></h1><h2 id="gradle" tabindex="-1"><a class="header-anchor" href="#gradle"><span>gradle</span></a></h2><div class="language-groovy line-numbers-mode" data-highlighter="shiki" data-ext="groovy" data-title="groovy" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">allprojects {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    repositories {</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        maven { url </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;https://maven.aliyun.com/repository/public/&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="maven" tabindex="-1"><a class="header-anchor" href="#maven"><span>maven</span></a></h2><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-dark:#7F848E;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">&lt;!-- 配置阿里云仓库 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">repositories</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">repository</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;aliyun-repos&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">url</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;https://maven.aliyun.com/repository/public&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">url</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">releases</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">enabled</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">enabled</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">releases</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">snapshots</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">enabled</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;false&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">enabled</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">snapshots</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">repository</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">repositories</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">pluginRepositories</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">pluginRepository</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;aliyun-repos&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">url</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;https://maven.aliyun.com/repository/public&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">url</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">releases</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">enabled</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;true&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">enabled</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">releases</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">snapshots</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">enabled</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;false&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">enabled</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">snapshots</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">pluginRepository</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">pluginRepositories</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),t=[e];function h(p,k){return i(),a("div",null,t)}const d=s(l,[["render",h],["__file","gradle.html.vue"]]),g=JSON.parse('{"path":"/posts/%E5%85%A5%E9%97%A8/gradle.html","title":"maven/gradle 镜像配置","lang":"zh-CN","frontmatter":{"icon":"blog","date":"2023-06-22T00:00:00.000Z","category":["入门"],"tag":["gradle","maven","镜像","java"],"head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/%E5%85%A5%E9%97%A8/gradle.html"}],["meta",{"property":"og:site_name","content":"向来枉费推移力 此日中流自在行"}],["meta",{"property":"og:title","content":"maven/gradle 镜像配置"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-28T15:29:58.000Z"}],["meta",{"property":"article:author","content":"唐州牧"}],["meta",{"property":"article:tag","content":"gradle"}],["meta",{"property":"article:tag","content":"maven"}],["meta",{"property":"article:tag","content":"镜像"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:published_time","content":"2023-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-28T15:29:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"maven/gradle 镜像配置\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-28T15:29:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"唐州牧\\",\\"url\\":\\"https://mrhope.site\\"}]}"]]},"headers":[{"level":2,"title":"gradle","slug":"gradle","link":"#gradle","children":[]},{"level":2,"title":"maven","slug":"maven","link":"#maven","children":[]}],"git":{"createdTime":1687430586000,"updatedTime":1690558198000,"contributors":[{"name":"zsl","email":"zslngu@163.com","commits":3}]},"readingTime":{"minutes":0.27,"words":82},"filePathRelative":"posts/入门/gradle.md","localizedDate":"2023年6月22日","excerpt":"\\n"}');export{d as comp,g as data};