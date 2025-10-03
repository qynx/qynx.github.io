import fs from 'fs'
import path from 'path'
import gitlog from 'gitlog'
import { format, subMonths } from 'date-fns'
import chalk from 'chalk'
import { fileURLToPath } from 'url';
//const fs = require('fs');
//const path = require('path');
//const gitlog = require('gitlog');
//const { format, subMonths } = require('date-fns');
//const chalk = require('chalk');

// 确保输出目录存在
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../.vuepress/public/data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Git日志选项配置
const options = {
  repo: process.cwd(),
  number: 10000, // 获取所有提交
  fields: [
    'hash', 'abbrevHash', 'subject', 'authorName', 'authorEmail', 'authorDate', 
    'authorDateRel', 'body', 'rawBody', 'authorDate', 'authorDateRel'
  ],
  execOptions: { maxBuffer: 1024 * 1024 * 10 } // 10MB缓冲区
};


export const generate = async() => {
      try {
      // 获取Git提交日志
      const commits = await gitlog(options);
      if (commits.length === 0) {
        console.log(chalk.yellow('⚠️ 未找到任何Git提交记录'));
        return;
      }
      
      // 按作者统计
      const authorStats = commits.reduce((acc, commit) => {
        const author = `${commit.authorName} <${commit.authorEmail}>`;
        acc[author] = (acc[author] || 0) + 1;
        return acc;
      }, {});
      
      // 按日期统计
      const dateStats = commits.reduce((acc, commit) => {
        const date = format(new Date(commit.authorDate), 'yyyy-MM-dd');
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      
      // 按时间段统计（最近6个月）
      const now = new Date();
      const monthStats = {};
      for (let i = 0; i < 6; i++) {
        const month = format(subMonths(now, i), 'yyyy-MM');
        monthStats[month] = 0;
      }
      
      commits.forEach(commit => {
        const month = format(new Date(commit.authorDate), 'yyyy-MM');
        if (monthStats[month] !== undefined) {
          monthStats[month] += 1;
        }
      });
      
      // 按星期统计
      const dayStats = {
        '周日': 0, '周一': 0, '周二': 0, '周三': 0, 
        '周四': 0, '周五': 0, '周六': 0
      };
      
      commits.forEach(commit => {
        const day = new Date(commit.authorDate).getDay();
        const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        dayStats[dayNames[day]] += 1;
      });
      
      // 提交信息关键词分析
      const wordStats = {};
      commits.forEach(commit => {
        const words = commit.subject.toLowerCase().match(/\b(\w{3,})\b/g) || [];
        words.forEach(word => {
          wordStats[word] = (wordStats[word] || 0) + 1;
        });
      });
      
      // 最活跃的文件
      const fileStats = {};
      console.log(commits[0])
      commits.forEach(commit => {
        if (commit.files) {
          commit.files.forEach(file => {
            fileStats[file] = (fileStats[file] || 0) + 1;
          });
        }
      });
      
      // 热门文件排序
      const popularFiles = Object.entries(fileStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      console.log(popularFiles)
      
      // 热门关键词排序
      const popularWords = Object.entries(wordStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);
      
      // 构建最终报告
      const report = {
        meta: {
          totalCommits: commits.length,
          firstCommit: commits[commits.length - 1].authorDate,
          lastCommit: commits[0].authorDate,
          period: `${format(new Date(commits[commits.length - 1].authorDate), 'yyyy-MM-dd')} 至 ${format(new Date(commits[0].authorDate), 'yyyy-MM-dd')}`,
          authorsCount: Object.keys(authorStats).length
        },
        authors: Object.entries(authorStats)
          .sort((a, b) => b[1] - a[1])
          .map(([author, count]) => ({ author, count })),
        timeline: Object.entries(dateStats)
          .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)),
        monthly: Object.entries(monthStats)
          .sort(([monthA], [monthB]) => new Date(monthA) - new Date(monthB)),
        weekly: Object.entries(dayStats),
        files: popularFiles,
        words: popularWords
      };
      
      // 保存报告
      const reportPath = path.join(outputDir, 'git-stats.json');
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      
      console.log(chalk.green(`✅ Git统计报告已生成: ${reportPath}`));
      console.log(chalk.blue(`📊 总提交数: ${report.meta.totalCommits}`));
      console.log(chalk.blue(`👥 贡献者: ${report.meta.authorsCount}人`));
      console.log(chalk.blue(`📅 统计周期: ${report.meta.period}`));
      
    } catch (error) {
      console.error(chalk.red('❌ 生成报告失败:'), error);
      process.exit(1);
    }
}