import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/posts/诗词": "structure",
  "/posts/古文": "structure",
  "/posts/life": "structure",
  "/": [
    {
      text: "文章",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    }
  ],
});
