import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from '@vuepress/bundler-vite'
import { getPostsPlugin } from './plugins/getPosts.js'


export default defineUserConfig({
  plugins: [getPostsPlugin()],
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  head: [
    [
      'link', // 定义图标链接
      { rel: 'icon', href: 'http://cdnblog.laikesxw.top/2025/裁剪.png' } // rel='icon' 设置图标，href 指向 public 文件夹下的图片
    ],
    [ 
      "script",
      {},
      `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "secidbe7fv");
      `
      
    ],
      [
      "script",
      {},
      `
      console.log("load js")

      `

      ]
  ],
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "清明在躬 氣志如神",
      description: "持盈's blog",
    },
    "/en/": {
      lang: "en-US",
      title: "Le vent se lève, il faut tenter de vivre",
      description: "ChiYing's blog",
    }
  },

  theme,

  shouldPrefetch: false,
});
