import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Blog Demo",
      description: "viper3's blog",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "viper3's blog",
      description: "viper3's blog",
    },
  },

  theme,

  shouldPrefetch: false,
});
