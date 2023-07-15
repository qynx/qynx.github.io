import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  //{ text: "演示", icon: "discover", link: "/zh/demo/" },
  {
    text: "博文",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "诗词",
        icon: "edit",
        prefix: "诗词/",
        children: [
          { text: "神童诗", icon: "edit", link: "神童诗" },
          { text: "秦王扫..", icon: "edit", link: "秦王扫六合" },
        ],
      },
      {
        text: "博客",
        icon: "edit",
        prefix: "博客/",
        children: [
          {
            text: "aes",
            icon: "edit",
            link: "java_aes",
          }
        ],
      },
      //{ text: "樱桃", icon: "edit", link: "cherry" },
      //{ text: "火龙果", icon: "edit", link: "dragonfruit" },
      //"tomato",
      //"strawberry",
    ],
  },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://vuepress-theme-hope.github.io/v2/zh/",
  },
]);
