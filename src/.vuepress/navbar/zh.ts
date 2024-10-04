import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  //{ text: "演示", icon: "discover", link: "/zh/demo/" },
  {
    text: "诗词",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "诗词",
        icon: "edit",
        prefix: "诗词/",
        children: [
          { text: "临江仙-杨慎", icon: "alias", link: "明/临江仙_杨慎" },
          { text: "相见欢-李煜", icon: "alias", link: "赵宋/相见欢_林花谢了春红" },
          { text: "锦瑟-李商隐", icon: "alias", link: "李唐/锦瑟" },
          { text: "观书有感-朱熹", icon: "alias", link: "赵宋/观书有感-其二" },
        ],
      }
      //{ text: "樱桃", icon: "edit", link: "cherry" },
      //{ text: "火龙果", icon: "edit", link: "dragonfruit" },
      //"tomato",
      //"strawberry",
    ],
  },
  {
    text: "博客",
    icon: "edit",
    prefix: "/posts/博客/",
    children: [
      {
        text: "aes",
        icon: "edit",
        link: "java_aes",
      }
    ],
  },
  {
    text: "vuepress-theme-hope",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
