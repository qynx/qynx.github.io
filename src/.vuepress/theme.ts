import { hopeTheme } from "vuepress-theme-hope";
import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";
import { codeTabs } from "@vuepress/plugin-markdown-tab";

export default hopeTheme({
  hostname: "https://mister-hope.github.io",

  author: {
    name: "持盈",
    url: "https://mrhope.site",
  },

  logo: "/avatar.jpg",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "docs",
  changelog: true,
  hotReload: true,


  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    medias: {
      BiliBili: "https://bilibili.com",
      Tumblr: "https://blog.csdn.net/zslngu?type=blog",
    },
  },

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "本网站由 <image src='/youpaiyun_logo8.svg' width='70' height='70' /> <a href='https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral'>又拍云</a> 提供CDN加速/云存储服务",

      displayFooter: true,

      blog: {
        description: "自是人生长恨水长东",
        intro: "/zh/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "批红",
      },
    },
    "/en/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "Default footer",

      displayFooter: true,

      blog: {
        description: "A Java programmer",
        intro: "/en/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * Chinese locale config
     */
    "/zh/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "默认页脚",

      displayFooter: true,

      blog: {
        description: "",
        intro: "/zh/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "批红",
      },
    },
  },

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/zh/demo/encrypt.html": ["1234"],
    },
  },

  markdown: {
    highlighter: {
      type: "shiki",
      lineNumbers: 15,
      notationDiff: true,
      themes: {
        light: "one-light",
        dark: "one-dark-pro",
      },
    },
    // 启用 figure
    figure: true,
    // 启用图片懒加载
    imgLazyload: true,
    // 启用图片标记
    imgMark: true,
    // 启用图片大小
    imgSize: true,
    codeTabs:true,
    align: true,
    attrs: true,
    chartjs: true,
    demo: true,
    echarts: true,
    flowchart: true,
    gfm: true,
    include: true,
    mark: true,
    mermaid: true,
    tasklist: true,
    playground: {
      presets: ["ts", "vue"],
    },
    revealjs: {
      plugins: ["highlight", "math", "search", "notes", "zoom"],
      themes: [
        "auto",
        "beige",
        "black",
        "blood",
        "league",
        "moon",
        "night",
        "serif",
        "simple",
        "sky",
        "solarized",
        "white",
      ],
    },
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    vPre: true,
    vuePlayground: true,
    kotlinPlayground: true,
  },




  plugins: {
    blog: true,
    slimsearch: {
      customFields: [
        {
          name: 'author',
          getter: (page) => {
            if (typeof(page.frontmatter.author) == 'string') {
              return page.frontmatter.author
            }
            if (page.frontmatter.author && page.frontmatter.author.name) {
              return page.frontmatter.author.name
            }
            if (page.frontmatter.author && page.frontmatter.author instanceof Array) {
              return page.frontmatter.author.map(it => it.name).join(" ")
            }
            return undefined
          },
          formatter: '作者：$content',
        },
      ],
    },
    components: {
      components: [
        'BiliBili'
      ]
    },
    // If you don’t need comment feature, you can remove following option
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
    comment: {
      /**
       * Using Giscus
       */
      provider: "Giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    icon: {
      // 关键词: "iconify", "fontawesome", "fontawesome-with-brands"
     assets: "iconify"
   },

  

    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },

    // Disable features you don’t want here

  },
});
