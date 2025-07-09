<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import api from '@/api/channel'
Chart.register(...registerables)


const statsBoxMaxInfo = reactive({
  subscribers: 0,
  videos: 0,
  views: 0,
  rating: 0,
})

const statsDataInfo = reactive({
  subscribers: {
    label: "",
    data: [],
    color: "",
    unit: ""
  },
  videos: {
    label: "",
    data: [],
    color: "",
    unit: ""
  },
  views: {
    label: "",
    data: [],
    color: "",
    unit: ""
  },
  rating: {
    label: "",
    data: [],
    color: "",
    unit: ""
  }
})

onMounted(async () => {
  const res = await api.getChannelInfo()
  Object.assign(statsBoxMaxInfo, res.statsBoxMax)
  Object.assign(statsDataInfo, res.statsData)
  renderChart(activeType.value)
}) 





const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

const statList= computed(() =>[
  { type: 'subscribers', number: statsBoxMaxInfo.subscribers, label: '구독자' },
  { type: 'videos', number: statsBoxMaxInfo.videos, label: '동영상' },
  { type: 'views', number: statsBoxMaxInfo.views, label: '총 조회수' },
  { type: 'rating', number: statsBoxMaxInfo.rating, label: '평균 별점' }
])

const activeType = ref('subscribers')
const chartCanvas = ref(null)
let statsChart = null

//y축 계산 함수 (병욱)
//별점만 제외(병욱) 10단위, 100단위, 10,000단위 등으로 올림(가독성용)
const getYMax = (type) => {
  if (type === 'rating') {
    return 5; // 별점은 5점 만점으로 고정
  }
  let yMax = statsBoxMaxInfo[type]
  const pow = Math.pow(10, yMax.toString().length - 1)
  yMax = Math.ceil(yMax / pow) * pow
  return yMax
}


//차트 생성
const renderChart = (type) => {
  if (!chartCanvas.value) return
  const info = statsDataInfo[type]
  if (statsChart) statsChart.destroy()

  statsChart = new Chart(chartCanvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: info.label,
        data: info.data,
        backgroundColor: info.color + '22',
        borderColor: info.color,
        borderWidth: 2,
        tension: 0.38,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: info.color,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y.toLocaleString()} ${info.unit}`
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: getYMax(type),
          ticks: {
            font: { family: "'Noto Sans KR', sans-serif", size: 14 },
            callback: function(value) {
              if (type === 'views' || type === 'subscribers') {
                if (value >= 10000) return (value / 10000) + '만'
                return value.toLocaleString()
              }
              return value
            }
          },
          grid: { color: "#ccc2", lineWidth: 1 }
        },
        x: {
          ticks: { font: { family: "'Noto Sans KR', sans-serif", size: 13 } },
          grid: { color: "#ccc2", lineWidth: 1 }
        }
      }
    }
  })
}

const selectType = (type) => {
  activeType.value = type
}


watch(activeType, (newType) => { //사용자가 카드(구독자/동영상/조회수/평균별점) 중 하나를 클릭하면 activeType의 값이 바뀜
  renderChart(newType)
})
</script>

<template>
  <div class="stats-section">
    <h2 class="stat-title">통계</h2>
    <div class="stats-boxes">
      <div
        v-for="stat in statList"
        :key="stat.type"
        :class="['stat-card', { active: activeType === stat.type }]"
        @click="selectType(stat.type)"
      >
        <div class="stat-number">{{ stat.number }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
    <div class="stats-chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<style scoped>
.stat-title{
  color: #e5eaee ;
}
.stats-section { 
  margin-top: 2rem; 
  background-color: #2e2e2e;
  padding: 20px;
  border-radius: 8px;
}
.stats-boxes {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  margin-bottom: 20px;
}
.stat-card {
  min-width: 120px;
  max-width: 230px;
  background: #222;
  border-radius: 14px;
  padding: 1.5rem 0 1.1rem 0;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  border: 2px solid transparent;
  transition: all 0.22s;
  cursor: pointer;
}
.stat-card.active,
.stat-card:hover {
  border-color: #fa5500;
  background: #232326;
  transform: translateY(-4px) scale(1.04);
}
.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: #fa5500;
  margin-bottom: 0.5rem;
  letter-spacing: -2px;
}
.stat-label {
  font-size: 1.05rem;
  color: #bbb;
  letter-spacing: -0.5px;
}
.stats-chart-container {
  width: 100%;
  min-height: 300px;
  padding: 1.2rem 0.5rem 0.3rem 0.5rem;
  background: #232326;
  border-radius: 14px;
}
@media (max-width: 900px) {
  .stats-boxes {
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }
}
@media (max-width: 600px) {
  .stats-boxes {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .stat-card {
    max-width: none;
    padding: 1rem 0;
  }
  .stats-chart-container {
    min-height: 180px;
    padding: 0.5rem 0.3rem 0.2rem 0.3rem;
  }
}
</style>
