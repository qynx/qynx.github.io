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
      description: "希文's blog",
    },
    "/en/": {
      lang: "en-US",
      title: "xiwen's blog",
      description: "xiwen's blog",
    }
  },

  theme,

  shouldPrefetch: false,
});
