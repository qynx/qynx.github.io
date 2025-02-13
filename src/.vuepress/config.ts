import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { viteBundler } from '@vuepress/bundler-vite'


export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "清明在躬 氣志如神",
      description: "荆州牧's blog",
    },
    "/en/": {
      lang: "en-US",
      title: "jingzhoumu's blog",
      description: "荆州牧's blog",
    }
  },

  theme,

  shouldPrefetch: false,
});
