// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import Element from 'element-plus';
import 'element-plus/dist/index.css'
import pinyin from './cp/pinyin.vue'

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.use(Element)
    app.component("pinyin", pinyin)
  },
});
