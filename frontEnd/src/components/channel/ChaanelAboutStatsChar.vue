<script setup>
import { onMounted, ref, watch } from 'vue'
import { Chart, registerables } from 'chart.js' // 차트 라이브러리 다운로드
Chart.register(...registerables) // 차트 라이브러리 관리

// 데이터 및 옵션 (원본과 동일)
const statsBoxMax = {
  subscribers: 325000, // 구독자
  videos: 245,         // 245개
  views: 8500000,      // 850만회
  rating: 5            // 별점 최대 5점
}

const statsData = {
  subscribers: {
    label: "월별 구독자 증가",
    data: [12000, 1400, 1700, 21000, 100000, 3200, 3600, 4000, 4200, 4700, 4900, 125000],
    color: "#ff6b6b",
    unit: "명"
  },
  videos: {
    label: "월별 영상 업로드 수",
    data: [10, 12, 15, 13, 160, 20, 17, 19, 21, 23, 20, 245],
    color: "#ffa94d",
    unit: "개"
  },
  views: {
    label: "월별 조회수",
    data: [500000, 7000000, 800000, 900000, 1000000, 1200000, 1300000, 1500000, 1700000, 1800000, 1900000, 8100000],
    color: "#4dabf7",
    unit: "회"
  },
  rating: {
    label: "월별 평균 별점",
    data: [0, 3, 3.9, 4.5, 4.6, 4.7, 4.6, 4.7, 2.1, 4.7, 4.7, 4.6],
    color: "#fcc419",
    unit: "점"
  }
}
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

const statList = [
  { type: 'subscribers', number: '12.5만', label: '구독자' },
  { type: 'videos', number: '245', label: '동영상' },
  { type: 'views', number: '850만', label: '총 조회수' },
  { type: 'rating', number: '4.6', label: '평균 별점' }
]

const activeType = ref('subscribers')
const chartCanvas = ref(null)
let statsChart = null

function getYMax(type) {
  let yMax = statsBoxMax[type]
  if (type !== 'rating') {
    const pow = Math.pow(10, yMax.toString().length - 1)
    yMax = Math.ceil(yMax / pow) * pow
  }
  return yMax
}

function renderChart(type) {
  if (!chartCanvas.value) return
  const info = statsData[type]
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

function selectType(type) {
  activeType.value = type
}

onMounted(() => {
  renderChart(activeType.value)
})
watch(activeType, (newType) => {
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
