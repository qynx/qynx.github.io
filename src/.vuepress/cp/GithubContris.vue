<script setup lang="js">
  import { ref, computed, onMounted } from 'vue'
   const tooltip = ref({
          visible: false,
          date: '',
          count: 0,
          x: 0,
          y: 0
        })
        
        const monthLabels = ref([])
        const contributions = ref([])
        const showRealData = ref(false)
        
        const totalCommits = computed(() => {
          return contributions.value.reduce((sum, day) => sum + day.count, 0)
        })
        
        const maxCommits = computed(() => {
          return Math.max(...contributions.value.map(day => day.count))
        })
        
        const maxCommitsDate = computed(() => {
          const maxDay = contributions.value.find(day => day.count === maxCommits.value)
          return maxDay ? maxDay.date : ''
        })
        
        const currentStreak = computed(() => {
          let streak = 0
          const today = new Date()
          const todayStr = formatDate(today)
          
          // 从今天开始往前找连续提交的天数
          for (let i = contributions.value.length - 1; i >= 0; i--) {
            const day = contributions.value[i]
            if (day.date === todayStr && day.count > 0) {
              streak++
            } else if (day.count > 0) {
              streak++
            } else {
              break
            }
          }
          
          return streak
        })
        
        const generateMonthLabels = () => {
          const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          const today = new Date()
          const monthLabelsArr = []
          
          // 显示过去12个月的月份标签
          for (let i = 11; i >= 0; i--) {
            const date = new Date(today)
            date.setMonth(today.getMonth() - i)
            monthLabelsArr.push(months[date.getMonth()])
          }
          
          monthLabels.value = monthLabelsArr
        }
        
        const generateContributions = () => {
          const contributionsArr = []
          const today = new Date()
          const oneYearAgo = new Date(today)
          oneYearAgo.setFullYear(today.getFullYear() - 1)
          
          // 生成过去一年的日期数据
          let currentDate = new Date(oneYearAgo)
          let weekIndex = 0
          
          while (currentDate <= today) {
            // 随机生成提交次数（0-15次）
            const count = Math.floor(Math.random() * 16)
            const level = getLevel(count)
            const dayOfWeek = currentDate.getDay() // 0 (周日) 到 6 (周六)
            
            // 如果是新的一周，增加weekIndex
            if (dayOfWeek === 0 && contributionsArr.length > 0) {
              weekIndex++
            }
            
            contributionsArr.push({
              date: formatDate(currentDate),
              count,
              level,
              dayOfWeek,
              weekIndex
            })
            
            // 增加一天
            currentDate.setDate(currentDate.getDate() + 1)
          }
          
          contributions.value = contributionsArr
        }
        
        const generateRealContributions = () => {
          const contributionsArr = []
          const today = new Date()
          const oneYearAgo = new Date(today)
          oneYearAgo.setFullYear(today.getFullYear() - 1)
          
          // 生成过去一年的日期数据
          let currentDate = new Date(oneYearAgo)
          let weekIndex = 0
          
          // 模拟真实数据模式 - 有更多的活跃日
          while (currentDate <= today) {
            const dayOfWeek = currentDate.getDay()
            
            // 如果是新的一周，增加weekIndex
            if (dayOfWeek === 0 && contributionsArr.length > 0) {
              weekIndex++
            }
            
            // 模拟真实开发模式：工作日提交更多，周末提交较少
            let count = 0
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // 周一到周五
              count = Math.floor(Math.random() * 10) + 3 // 3-12次
            } else {
              count = Math.floor(Math.random() * 5) // 0-4次
            }
            
            // 每月增加几天高活跃度
            if (Math.random() > 0.9) {
              count += Math.floor(Math.random() * 10)
            }
            
            // 确保不超过最大值
            count = Math.min(count, 20)
            
            const level = getLevel(count)
            
            contributionsArr.push({
              date: formatDate(currentDate),
              count,
              level,
              dayOfWeek,
              weekIndex
            })
            
            // 增加一天
            currentDate.setDate(currentDate.getDate() + 1)
          }
          
          contributions.value = contributionsArr
        }
        
        const getLevel = (count) => {
          if (count === 0) return 0
          if (count <= 3) return 1
          if (count <= 6) return 2
          if (count <= 9) return 3
          return 4
        }
        
        const formatDate = (date) => {
          return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
        }
        
        const showTooltip = (day, event) => {
          tooltip.value = {
            visible: true,
            date: day.date,
            count: day.count,
            x: event.clientX + 15,
            y: event.clientY + 15
          }
        }
        
        const hideTooltip = () => {
          tooltip.value.visible = false
        }
        
        const toggleData = () => {
          showRealData.value = !showRealData.value
          if (showRealData.value) {
            generateRealContributions()
          } else {
            generateContributions()
          }
        }
        
        onMounted(() => {
          generateContributions()
          generateMonthLabels()
        })  
  
</script>
<template>
<div id="body">
  <div id="app">
    <div class="container">
      <header>
        <h1><i class="fab fa-github"></i> GitHub提交记录热图组件</h1>
        <p class="subtitle">这是一个完全适配VuePress 3的GitHub风格提交记录热图组件，可直观展示代码提交活动历史</p>
      </header>
      
      <div class="card">
        <div class="card-header">
          <h2 class="card-title"><i class="fas fa-calendar-alt"></i> 我的代码提交记录</h2>
          <div class="date-range">2024年10月1日 - 2025年10月1日</div>
        </div>
        
        <div class="github-contributions">
          <div class="heatmap-container">
            <div class="months">
              <div v-for="(month, index) in monthLabels" :key="index" class="month">
                {{ month }}
              </div>
            </div>
            <div class="weeks">
              <div class="weekday">日</div>
              <div class="weekday">一</div>
              <div class="weekday">二</div>
              <div class="weekday">三</div>
              <div class="weekday">四</div>
              <div class="weekday">五</div>
              <div class="weekday">六</div>
            </div>
            <div class="heatmap">
              <div 
                v-for="(day, index) in contributions" 
                :key="index"
                class="day"
                :class="`level-${day.level}`"
                :style="{ gridRow: day.weekIndex + 1, gridColumn: day.dayOfWeek + 1 }"
                @mouseover="showTooltip(day, $event)"
                @mouseleave="hideTooltip"
              >
              </div>
            </div>
          </div>
          <div class="legend">
            <span>较少</span>
            <div class="legend-items">
              <div class="legend-item level-0"></div>
              <div class="legend-item level-1"></div>
              <div class="legend-item level-2"></div>
              <div class="legend-item level-3"></div>
              <div class="legend-item level-4"></div>
            </div>
            <span>较多</span>
          </div>
          
          <div class="controls">
            <button class="btn" @click="generateContributions">
              <i class="fas fa-sync-alt"></i> 生成随机数据
            </button>
            <button class="btn secondary" @click="toggleData">
              <i class="fas fa-database"></i> {{ showRealData ? '使用模拟数据' : '使用真实数据' }}
            </button>
          </div>
          
          <div class="stats">
            <div class="stat-box">
              <div class="stat-label">总提交次数</div>
              <div class="stat-value">{{ totalCommits }}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">最活跃日</div>
              <div class="stat-value">{{ maxCommits }}</div>
              <div class="stat-label">{{ maxCommitsDate }}</div>
            </div>
            <div class="stat-box">
              <div class="stat-label">连续提交</div>
              <div class="stat-value">{{ currentStreak }} 天</div>
              <div class="stat-label">当前连续提交</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h2 class="card-title"><i class="fas fa-code"></i> VuePress 3集成指南</h2>
        </div>
        <div class="integration-guide">
          <p>1. 将组件文件保存为 <code>.vuepress/components/GitHubContributions.vue</code></p>
          <p>2. 在Markdown文件中使用组件：</p>
          <pre>&lt;GitHubContributions :data="yourData" /&gt;</pre>
          <p>3. 自定义选项：</p>
          <ul>
            <li>通过<code>:data</code>属性传入真实提交数据</li>
            <li>修改颜色方案</li>
            <li>调整热图尺寸和间距</li>
            <li>自定义提示框样式</li>
          </ul>
        </div>
      </div>
      
      <div class="footer">
        <p>GitHub提交记录热图组件 | 专为VuePress 3设计 | MIT License</p>
        <p>访问 <a href="https://github.com">GitHub</a> 获取更多信息</p>
      </div>
    </div>
    
    <div v-if="tooltip.visible" 
         class="tooltip" 
         :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
      <strong>{{ tooltip.count }} 次提交</strong>
      <div>{{ tooltip.date }}</div>
    </div>
  </div>

  
</div>
</template>

<style scoped>

 * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
#body {
      background: linear-gradient(135deg, #1a1f2d, #0d1117);
      color: #c9d1d9;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
}
    
    .container {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
    }
    
    header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    h1 {
      font-size: 2.8rem;
      margin-bottom: 15px;
      background: linear-gradient(90deg, #58a6ff, #8cb4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 2px 10px rgba(88, 166, 255, 0.2);
    }
    
    .subtitle {
      font-size: 1.2rem;
      color: #8b949e;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    .card {
      background: rgba(22, 27, 34, 0.8);
      border: 1px solid #30363d;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      padding: 30px;
      margin-bottom: 30px;
      backdrop-filter: blur(10px);
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #30363d;
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #f0f6fc;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .card-title i {
      color: #58a6ff;
    }
    
    .github-contributions {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .heatmap-container {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr;
      gap: 10px;
    }
    
    .months {
      grid-column: 2;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 3px;
      margin-bottom: 5px;
    }
    
    .month {
      font-size: 11px;
      text-align: center;
      color: #8b949e;
      font-weight: 500;
    }
    
    .weeks {
      grid-row: 2;
      display: grid;
      grid-template-rows: repeat(7, 1fr);
      gap: 3px;
      margin-right: 5px;
    }
    
    .weekday {
      font-size: 11px;
      color: #8b949e;
      text-align: center;
      height: 15px;
      line-height: 15px;
      font-weight: 500;
    }
    
    .heatmap {
      grid-column: 2;
      grid-row: 2;
      display: grid;
      grid-template-columns: repeat(53, 1fr);
      grid-auto-rows: 15px;
      gap: 3px;
    }
    
    .day {
      width: 15px;
      height: 15px;
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .day:hover {
      transform: scale(1.1);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
      z-index: 10;
    }
    
    .day.level-0 { background-color: #161b22; }
    .day.level-1 { background-color: #0e4429; }
    .day.level-2 { background-color: #006d32; }
    .day.level-3 { background-color: #26a641; }
    .day.level-4 { background-color: #39d353; }
    
    .tooltip {
      position: fixed;
      background: rgba(22, 27, 34, 0.95);
      color: white;
      padding: 10px 15px;
      border-radius: 6px;
      font-size: 13px;
      z-index: 100;
      pointer-events: none;
      white-space: nowrap;
      border: 1px solid #30363d;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    }
    
    .tooltip strong {
      display: block;
      margin-bottom: 5px;
      color: #58a6ff;
    }
    
    .tooltip div {
      color: #8b949e;
      font-size: 12px;
    }
    
    .legend {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 25px;
      font-size: 12px;
      color: #8b949e;
      gap: 10px;
    }
    
    .legend-items {
      display: flex;
      gap: 3px;
    }
    
    .legend-item {
      width: 15px;
      height: 15px;
      border-radius: 3px;
    }
    
    .legend-text {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 300px;
      margin-top: 5px;
    }
    
    .controls {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 30px;
    }
    
    .btn {
      background: #238636;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .btn:hover {
      background: #2ea043;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(46, 160, 67, 0.3);
    }
    
    .btn.secondary {
      background: transparent;
      border: 1px solid #30363d;
      color: #c9d1d9;
    }
    
    .btn.secondary:hover {
      background: rgba(88, 166, 255, 0.1);
      border-color: #58a6ff;
    }
    
    .stats {
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
      flex-wrap: wrap;
      gap: 20px;
    }
    
    .stat-box {
      background: rgba(22, 27, 34, 0.5);
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 15px 20px;
      text-align: center;
      min-width: 150px;
    }
    
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: #58a6ff;
      margin: 10px 0;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: #8b949e;
    }
    
    .footer {
      text-align: center;
      margin-top: 50px;
      color: #8b949e;
      font-size: 0.9rem;
    }
    
    .footer a {
      color: #58a6ff;
      text-decoration: none;
    }
    
    .footer a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      .heatmap {
        grid-template-columns: repeat(26, 1fr);
      }
      
      .months {
        grid-template-columns: repeat(6, 1fr);
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .stats {
        flex-direction: column;
        align-items: center;
      }
      
      .controls {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        width: 100%;
        max-width: 300px;
      }
    }
</style>
