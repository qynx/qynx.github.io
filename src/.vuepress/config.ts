import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "viper3's blog",
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
