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
        text: "词",
        icon: "edit",
        prefix: "诗词/",
        children: [
          { text: "临江仙-滚滚长江东逝水", icon: "alias", link: "明/临江仙_杨慎" },
          { text: "相见欢-林花谢了春红", icon: "alias", link: "赵宋/相见欢-林花谢了春红" },
          { text: "临江仙-送钱穆父", icon: "alias", link: "赵宋/临江仙-送钱穆父" }
        ],
      },
      {
        text: "诗",
        icon: "edit",
        prefix: "诗词/",
        children: [
          { text: "锦瑟", icon: "alias", link: "李唐/锦瑟" },
          { text: "把酒问月", icon: "alias", link: "李唐/把酒问月" },
        ],
      },
      {
        text: "文",
        icon: "edit",
        prefix: "古文/",
        children: [
          { text: "游褒禅山记", icon: "alias", link: "游褒禅山记" },
        ],
      }
    ],
  },
  {
    text: "历史",
    icon: "edit",
    prefix: "/posts/历史/",
    children: [
      {
        text: "朝代",
        icon: "edit",
        link: "朝代/",
      }
    ],
  },
  {
    text: "vuepress-theme-hope",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
