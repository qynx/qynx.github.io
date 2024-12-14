import{_ as i,c as a,b as e,o as t}from"./app-Biy8uaaL.js";const n={};function l(r,s){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="mybatis" tabindex="-1"><a class="header-anchor" href="#mybatis"><span>mybatis</span></a></h1><p>mybatis 简单使用</p><h2 id="mapper-scan-配置" tabindex="-1"><a class="header-anchor" href="#mapper-scan-配置"><span>mapper scan 配置</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Bean</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> MapperScannerConfigurer</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> mapperScannerConfigurer</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">() {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">        MapperScannerConfigurer</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> mapperScannerConfigurer </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> MapperScannerConfigurer</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        mapperScannerConfigurer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">setBasePackage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;mybatis.mapper&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        return</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> mapperScannerConfigurer</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="xml-扫描目录配置" tabindex="-1"><a class="header-anchor" href="#xml-扫描目录配置"><span>xml 扫描目录配置</span></a></h2><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ResourcePatternResolver</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> resourceResolver </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> new</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> PathMatchingResourcePatternResolver</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">()</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">Resource</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">[] xmlResource </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> resourceResolver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getResources</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;classpath:*.xml&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">bean</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">setMapperLocations</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(xmlResource);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const h=i(n,[["render",l],["__file","mybatis.html.vue"]]),k=JSON.parse('{"path":"/posts/%E5%85%A5%E9%97%A8/mybatis.html","title":"mybatis","lang":"zh-CN","frontmatter":{"icon":"blog","date":"2023-06-23T00:00:00.000Z","category":["入门"],"tag":["mybatis","java","orm"],"description":"mybatis 简单使用","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/%E5%85%A5%E9%97%A8/mybatis.html"}],["meta",{"property":"og:site_name","content":"向来枉费推移力 此日中流自在行"}],["meta",{"property":"og:title","content":"mybatis"}],["meta",{"property":"og:description","content":"mybatis 简单使用"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"mybatis"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"orm"}],["meta",{"property":"article:published_time","content":"2023-06-23T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mybatis\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-23T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"荆州牧\\",\\"url\\":\\"https://mrhope.site\\"}]}"]]},"headers":[{"level":2,"title":"mapper scan 配置","slug":"mapper-scan-配置","link":"#mapper-scan-配置","children":[]},{"level":2,"title":"xml 扫描目录配置","slug":"xml-扫描目录配置","link":"#xml-扫描目录配置","children":[]}],"readingTime":{"minutes":0.19,"words":56},"filePathRelative":"posts/入门/mybatis.md","localizedDate":"2023年6月23日","excerpt":"\\n<p>mybatis 简单使用</p>\\n","autoDesc":true}');export{h as comp,k as data};