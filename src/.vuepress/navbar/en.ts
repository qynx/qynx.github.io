import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  {
    text: "Posts",
    icon: "edit",
    prefix: "/en/posts/",
    children: [
     
    ],
  },
  {
    text: "VuePress Theme Doc",
    icon: "note",
    link: "https://vuepress-theme-hope.github.io/v2/",
  },
]);
