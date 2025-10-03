// .vuepress/client.ts
import { defineClientConfig } from "vuepress/client";
// @ts-ignore
import pinyin from './cp/pinyin.vue'
// @ts-ignore
import SblgRate from './cp/SblgRate.vue'
// @ts-ignore
import SbTimeline from "./cp/SbTimeline.vue";
// @ts-ignore
import MonthlyChart from './cp/MonthlyChart.vue';
import naive from 'naive-ui'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import GithubContris from "./cp/GithubContris.vue";
import GitCommitPanel from "./cp/GitCommitPanel.vue";


export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.use(naive)
    app.use(Antd)
    app.component("pinyin", pinyin)
    app.component("sblg-rate", SblgRate)
    app.component("sb-timeline", SbTimeline)
    app.component("monthly-chart", MonthlyChart)
    app.component("github-contris", GithubContris)
    app.component("git-commit-panel", GitCommitPanel)
  },
});
