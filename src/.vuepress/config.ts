import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from '@vuepress/bundler-vite'


export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  head: [
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
      title: "ChiYing's blog",
      description: "ChiYing's blog",
    }
  },

  theme,

  shouldPrefetch: false,
});
