<template>
  <div class="git-stats-dashboard">
    <!-- 顶部概览卡片 -->
    <div class="overview-cards">
      <div class="stat-card">
        <div class="stat-value">{{ totalCommits }}</div>
        <div class="stat-label">总提交数</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ contributorsCount }}</div>
        <div class="stat-label">贡献者</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ firstCommitDate }}</div>
        <div class="stat-label">首次提交</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ lastCommitDate }}</div>
        <div class="stat-label">最近提交</div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-container">
      <!-- 作者贡献图 -->
      <div class="chart-card">
        <h3 class="chart-title">作者贡献分布</h3>
        <div class="chart-wrapper">
          <canvas ref="authorChart"></canvas>
        </div>
      </div>

       <!-- 作者贡献图 -->
      <!--<div class="chart-card">
        <h3 class="chart-title">作者贡献分布2</h3>
        <div class="chart-wrapper">
          <canvas ref="authorChart2" class="echarts-chart"></canvas>
        </div>
      </div>-->
      
      
      <!-- 时间线图 -->
      <div class="chart-card">
        <h3 class="chart-title">提交时间线</h3>
        <div class="chart-wrapper">
          <canvas ref="timelineChart"></canvas>
        </div>
      </div>
      
      <!-- 月度统计 -->
      <div class="chart-card">
        <h3 class="chart-title">月度提交统计</h3>
        <div class="chart-wrapper">
          <canvas ref="monthlyChart"></canvas>
        </div>
      </div>
      
      <!-- 星期分布 -->
      <div class="chart-card">
        <h3 class="chart-title">星期提交分布</h3>
        <div class="chart-wrapper">
          <canvas ref="weeklyChart"></canvas>
        </div>
      </div>
    </div>

    <!-- 详细信息区域 -->
    <div class="details-container">
      <!-- 高频修改文件 -->
      <div class="detail-card">
        <h3 class="detail-title">高频修改文件</h3>
        <ul class="file-list">
          <li v-for="(file, index) in popularFiles" :key="index" class="file-item">
            <span class="file-path">{{ file[0] }}</span>
            <span class="file-count">{{ file[1] }} 次修改</span>
          </li>
        </ul>
      </div>
      
      <!-- 提交关键词 -->
      <div class="detail-card">
        <h3 class="detail-title">提交关键词热度</h3>
        <div class="word-cloud">
          <span 
            v-for="(word, index) in popularWords" 
            :key="index" 
            class="word-tag"
            :style="{ fontSize: 12 + word[1] * 0.5 + 'px' }"
          >
            {{ word[0] }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- 底部信息 -->
    <div class="footer">
      <p>数据更新时间: {{ currentTime }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Chart from 'chart.js/auto';
import { TimeScale } from 'chart.js/auto';
import { fi } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import * as echarts from 'echarts';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);


const props = defineProps({
  gitStats: {
    type: Object,
    default: () => (undefined)
  }
});

Chart.register(
  TimeScale
)

const myGitStats = ref({})
    const finalGitStats = ref(props.gitStats || myGitStats.value);

    const initCharts =()=>{
      console.log(`initCharts  ${JSON.stringify(finalGitStats.value.authors)}`)
      if (!finalGitStats.value || !finalGitStats.value.meta) {
        return
      }

      if (authorChart2.value) {
        var ech = echarts.init(authorChart2.value)
        const option2 = {
          xAxis: {
            type: "category",
            data: finalGitStats.value.authors.slice(0, 10).map(a => a.author.split('<')[0].trim())
          },
          yAxis: {
            type: "value",
            axisLabel: {
              interval: 200
            }
          },
          series: [
            {
              data: finalGitStats.value.authors.slice(0, 10).map(a => a.count),
              type: 'bar'
            }
          ]
        }
        ech.setOption(option2)
      }
      
      // 作者贡献图
      if (authorChart.value) {
       

        new Chart(authorChart.value, {
          type: 'bar',
          data: {
            labels: finalGitStats.value.authors.slice(0, 10).map(a => a.author.split('<')[0].trim()),
            datasets: [{
              label: '提交次数',
              data: finalGitStats.value.authors.slice(0, 10).map(a => a.count),
              backgroundColor: [
                '#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#e74c3c',
                '#1abc9c', '#34495e', '#d35400', '#7f8c8d', '#2c3e50'
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
      
      // 时间线图
      if (timelineChart.value) {
        console.log(finalGitStats.value.timeline)
        new Chart(timelineChart.value, {
          type: 'line',
          data: {
            labels: finalGitStats.value.timeline.map(t => t[0]),
            datasets: [{
              label: '每日提交量',
              data: finalGitStats.value.timeline.map(t => t[1]),
              borderColor: '#3498db',
              backgroundColor: 'rgba(52, 152, 219, 0.1)',
              tension: 0.3,
              fill: true
            }]
          },
          options: {
            responsive: true,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'month',
                  tooltipFormat: 'yyyy-MM-dd'
                }
              }
            }
          }
        });
      }
      
      // 月度统计图
      if (monthlyChart.value) {
        new Chart(monthlyChart.value, {
          type: 'bar',
          data: {
            labels: finalGitStats.value.monthly.map(m => m[0]),
            datasets: [{
              label: '提交次数',
              data: finalGitStats.value.monthly.map(m => m[1]),
              backgroundColor: '#9b59b6',
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: false }
            }
          }
        });
      }
      
      // 星期分布图
      if (weeklyChart.value) {
        new Chart(weeklyChart.value, {
          type: 'doughnut',
          data: {
            labels: finalGitStats.value.weekly.map(w => w[0]),
            datasets: [{
              label: '提交次数',
              data: finalGitStats.value.weekly.map(w => w[1]),
              backgroundColor: [
                '#e74c3c', '#3498db', '#2ecc71', '#f1c40f', 
                '#9b59b6', '#1abc9c', '#d35400'
              ],
              borderWidth: 0
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'right'
              }
            }
          }
        });
      }
    }
    const formatDate = (dateStr)=>{
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      }
    const updateCurrentTime = () => {
        const now = new Date();
        currentTime.value = now.toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      }
    const initData =  async() => {
        const res=  await (await fetch('/data/git-stats.json')).json()
        //console.log(`init data ${JSON.stringify(res)}`)
        finalGitStats.value = res
        return res
      }

    // 图表引用
    const authorChart = ref(null);
    const authorChart2 = ref(null);
    const timelineChart = ref(null);
    const monthlyChart = ref(null);
    const weeklyChart = ref(null);
    
    // 当前时间
    const currentTime = ref('');
    
    // 计算属性
    const totalCommits = computed(() => finalGitStats.value.meta?.totalCommits || 0);
    const contributorsCount = computed(() => finalGitStats.value.meta?.authorsCount || 0);
    const firstCommitDate = computed(() => formatDate(finalGitStats.value.meta?.firstCommit));
    const lastCommitDate = computed(() => formatDate(finalGitStats.value.meta?.lastCommit));
    const popularFiles = computed(() => finalGitStats.value.files || []);
    const popularWords = computed(() => finalGitStats.value.words || []);
    

    // 更新当前时间
    updateCurrentTime();
    // 设置定时器每秒更新时间
    //setInterval(updateCurrentTime, 1000);
    // 初始化图表
    setTimeout(initCharts, 500);
    onMounted(async() => {
      await initData(); 
    })
</script>

<style scoped>
.git-stats-dashboard {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.stat-value {
  font-size: 2.8rem;
  font-weight: 700;
  margin: 15px 0;
  color: #3498db;
}

.stat-label {
  font-size: 1.1rem;
  color: #7f8c8d;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 30px;
}

.echarts-chart {
  width: 300px;
  height: 150px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.chart-title {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 600;
}

.chart-wrapper {
  height: 300px;
  position: relative;
}

.details-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .details-container {
    grid-template-columns: 1fr;
  }
}

.detail-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.detail-title {
  margin-top: 0;
  margin-bottom: 20px;
  color: #2c3e50;
  font-size: 1.4rem;
  font-weight: 600;
}

.file-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.file-item:last-child {
  border-bottom: none;
}

.file-path {
  font-family: monospace;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.file-count {
  color: #2ecc71;
  font-weight: bold;
  margin-left: 15px;
}

.word-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.word-tag {
  background: #e3f2fd;
  color: #3498db;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s;
}

.word-tag:hover {
  background: #3498db;
  color: white;
  transform: translateY(-3px);
}

.footer {
  text-align: center;
  padding: 20px;
  color: #7f8c8d;
  font-size: 0.9rem;
}
</style>