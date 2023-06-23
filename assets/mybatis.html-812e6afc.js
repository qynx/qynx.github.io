const e=JSON.parse(`{"key":"v-76ee3dfa","path":"/posts/%E5%85%A5%E9%97%A8/mybatis.html","title":"Mybatis","lang":"zh-CN","frontmatter":{"icon":"edit","date":"2023-06-23T00:00:00.000Z","category":["入门"],"tag":["mybatis","java","orm"],"description":"Mybatis mapper scan 配置 @Bean public MapperScannerConfigurer mapperScannerConfigurer() { MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer(); mapperScannerConfigurer.setBasePackage(\\"mybatis.mapper\\"); return mapperScannerConfigurer; }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/posts/%E5%85%A5%E9%97%A8/mybatis.html"}],["meta",{"property":"og:site_name","content":"viper3's blog"}],["meta",{"property":"og:title","content":"Mybatis"}],["meta",{"property":"og:description","content":"Mybatis mapper scan 配置 @Bean public MapperScannerConfigurer mapperScannerConfigurer() { MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer(); mapperScannerConfigurer.setBasePackage(\\"mybatis.mapper\\"); return mapperScannerConfigurer; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-06-23T10:06:24.000Z"}],["meta",{"property":"article:author","content":"Viper3"}],["meta",{"property":"article:tag","content":"mybatis"}],["meta",{"property":"article:tag","content":"java"}],["meta",{"property":"article:tag","content":"orm"}],["meta",{"property":"article:published_time","content":"2023-06-23T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-06-23T10:06:24.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mybatis\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-06-23T00:00:00.000Z\\",\\"dateModified\\":\\"2023-06-23T10:06:24.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Viper3\\",\\"url\\":\\"https://mrhope.site\\"}]}"]]},"headers":[{"level":2,"title":"mapper scan 配置","slug":"mapper-scan-配置","link":"#mapper-scan-配置","children":[]},{"level":2,"title":"xml 扫描目录配置","slug":"xml-扫描目录配置","link":"#xml-扫描目录配置","children":[]}],"git":{"createdTime":1687514784000,"updatedTime":1687514784000,"contributors":[{"name":"zsl","email":"zslngu@163.com","commits":1}]},"readingTime":{"minutes":0.17,"words":50},"filePathRelative":"posts/入门/mybatis.md","localizedDate":"2023年6月23日","excerpt":"<h1> Mybatis</h1>\\n<h2> mapper scan 配置</h2>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code>    <span class=\\"token annotation punctuation\\">@Bean</span>\\n    <span class=\\"token keyword\\">public</span> <span class=\\"token class-name\\">MapperScannerConfigurer</span> <span class=\\"token function\\">mapperScannerConfigurer</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token class-name\\">MapperScannerConfigurer</span> mapperScannerConfigurer <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">MapperScannerConfigurer</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        mapperScannerConfigurer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setBasePackage</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"mybatis.mapper\\"</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token keyword\\">return</span> mapperScannerConfigurer<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};
