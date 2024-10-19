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
          { text: "临江仙-送钱穆父", icon: "alias", link: "赵宋/临江仙-送钱穆父" },
          { text: "观书有感-朱熹", icon: "alias", link: "赵宋/观书有感-其二" },
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
