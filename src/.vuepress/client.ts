// .vuepress/client.ts
import { defineClientConfig } from "vuepress/client";
import pinyin from './cp/pinyin.vue'
import SblgRate from './cp/SblgRate.vue'
import naive from 'naive-ui'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';



export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.use(naive)
    app.use(Antd)
    app.component("pinyin", pinyin)
    app.component("sblg-rate", SblgRate)
  },
});
