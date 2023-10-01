import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "悟已往之不谏，知来者之可追",
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
