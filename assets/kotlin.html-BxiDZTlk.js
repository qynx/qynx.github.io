import{_ as t,r as o,o as c,c as i,e as l,a,b as n,d as p,f as s}from"./app-cXef-UEa.js";const r={},d=a("h1",{id:"kotlin",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#kotlin","aria-hidden":"true"},"#"),n(" kotlin")],-1),u=s(`<h2 id="if-条件" tabindex="-1"><a class="header-anchor" href="#if-条件" aria-hidden="true">#</a> if 条件</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>fun <span class="token function">maxOf</span><span class="token punctuation">(</span>a<span class="token operator">:</span> <span class="token class-name">Int</span><span class="token punctuation">,</span> b<span class="token operator">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">&gt;</span> b<span class="token punctuation">)</span> a <span class="token keyword">else</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="enum" tabindex="-1"><a class="header-anchor" href="#enum" aria-hidden="true">#</a> enum</h2><h3 id="枚举构造函数" tabindex="-1"><a class="header-anchor" href="#枚举构造函数" aria-hidden="true">#</a> 枚举构造函数</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token class-name">TestEnum</span><span class="token punctuation">(</span>val value<span class="token operator">:</span> <span class="token class-name">Int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">FIRST</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="枚举值遍历" tabindex="-1"><a class="header-anchor" href="#枚举值遍历" aria-hidden="true">#</a> 枚举值遍历</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>label in <span class="token class-name">TestEnum</span><span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">println</span><span class="token punctuation">(</span>labal<span class="token punctuation">.</span><span class="token function">toStirng</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="jackson" tabindex="-1"><a class="header-anchor" href="#jackson" aria-hidden="true">#</a> jackson</h2><h3 id="jsonproperty" tabindex="-1"><a class="header-anchor" href="#jsonproperty" aria-hidden="true">#</a> JsonProperty</h3><p>使用 <code>@JsonProperty</code> 标识类的属性时和java 不一样要用 <code>@get:JsonProperty</code></p>`,10),v={href:"https://stackoverflow.com/questions/47982148/usage-of-jackson-jsonproperty-annotation-for-kotlin-data-classes",target:"_blank",rel:"noopener noreferrer"},k=s(`<h2 id="高阶函数" tabindex="-1"><a class="header-anchor" href="#高阶函数" aria-hidden="true">#</a> 高阶函数</h2><h3 id="let" tabindex="-1"><a class="header-anchor" href="#let" aria-hidden="true">#</a> let</h3><div class="hint-container tip"><p class="hint-container-title">提示</p><p>作用域函数 取最后一行作为返回值</p></div><h2 id="null-判断" tabindex="-1"><a class="header-anchor" href="#null-判断" aria-hidden="true">#</a> null 判断</h2><h3 id="safe-null" tabindex="-1"><a class="header-anchor" href="#safe-null" aria-hidden="true">#</a> safe null</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// a 不为 null时执行</span>
a<span class="token operator">?</span><span class="token punctuation">.</span>apply <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="null" tabindex="-1"><a class="header-anchor" href="#null" aria-hidden="true">#</a> null ||</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// a为null时默认值</span>
a<span class="token operator">?</span><span class="token operator">:</span><span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="协程" tabindex="-1"><a class="header-anchor" href="#协程" aria-hidden="true">#</a> 协程</h2><h3 id="completablefuture-转-协程" tabindex="-1"><a class="header-anchor" href="#completablefuture-转-协程" aria-hidden="true">#</a> CompletableFuture 转 协程</h3><p>前置依赖</p><div class="language-groovy line-numbers-mode" data-ext="groovy"><pre class="language-groovy"><code>implementation<span class="token string">&#39;org.jetbrains.kotlinx:kotlinx-coroutines-jdk8&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>直接调用 await 方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CompletableFuture</span><span class="token punctuation">.</span>supplyAsync <span class="token punctuation">{</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>ex<span class="token operator">:</span> <span class="token class-name">Exception</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        ex<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> class</h2><h3 id="静态成员" tabindex="-1"><a class="header-anchor" href="#静态成员" aria-hidden="true">#</a> 静态成员</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span>
    companion object <span class="token punctuation">{</span>
        val b <span class="token operator">=</span> <span class="token string">&quot;com/&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function h(m,b){const e=o("ExternalLinkIcon");return c(),i("div",null,[d,l(" more "),u,a("p",null,[n("详情见 "),a("a",v,[n("stackoverflow-47982148"),p(e)])]),k])}const g=t(r,[["render",h],["__file","kotlin.html.vue"]]);export{g as default};