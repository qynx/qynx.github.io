// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import Element from 'element-plus';
import 'element-plus/dist/index.css'
import pinyin from './cp/pinyin.vue'
import naive from 'naive-ui'


export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.use(Element)
    app.use(naive)
    app.component("pinyin", pinyin)
  },
});
