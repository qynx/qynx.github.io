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
      title: "向来枉费推移力 此日中流自在行",
      description: "viper3's blog",
    },
    "/en/": {
      lang: "en-US",
      title: "viper3's blog",
      description: "viper3's blog",
    }
  },

  theme,

  shouldPrefetch: false,
});
