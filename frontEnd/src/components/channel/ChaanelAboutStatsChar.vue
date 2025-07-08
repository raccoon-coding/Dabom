<script setup>
import { ref, watch, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  type: { type: String, default: 'subscribers' } 
})


const statsData = {
  subscribers: {
    label: "월별 구독자 증가",
    data: [12000, 1400, 1700, 21000, 100000, 3200, 3600, 4000, 4200, 4700, 4900, 125000],
    color: "#ff6b6b",
    unit: "명",
    max: 125000
  },
  videos: {
    label: "월별 영상 업로드 수",
    data: [10, 12, 15, 13, 160, 20, 17, 19, 21, 23, 20, 245],
    color: "#ffa94d",
    unit: "개",
    max: 245
  },
  views: {
    label: "월별 조회수",
    data: [500000, 7000000, 800000, 900000, 1000000, 1200000, 1300000, 1500000, 1700000, 1800000, 1900000, 8500000],
    color: "#4dabf7",
    unit: "회",
    max: 8500000
  },
  rating: {
    label: "월별 평균 별점",
    data: [0, 3, 3.9, 4.5, 4.6, 4.7, 4.6, 4.7, 2.1, 4.7, 4.7, 4.6],
    color: "#fcc419",
    unit: "점",
    max: 5
  }
}
const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

const chartRef = ref(null)
let chartInstance = null

function getYMax(type) {
  let yMax = statsData[type].max
  if (type !== 'rating') {
    const pow = Math.pow(10, yMax.toString().length - 1)
    yMax = Math.ceil(yMax / pow) * pow
  }
  return yMax
}

function renderChart(type) {
  if (!chartRef.value) return
  if (chartInstance) chartInstance.destroy()
  const info = statsData[type]
  chartInstance = new Chart(chartRef.value.getContext('2d'), {
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
        fill: false
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
                if (value >= 10000) return (value/10000) + '만'
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

onMounted(() => renderChart(props.type))
watch(() => props.type, (val) => renderChart(val))
</script>

<template>
  <div class="stats-chart-container">
    <canvas ref="chartRef" width="600" height="240"></canvas>
  </div>
</template>

<style scoped>
.stats-chart-container {
  width: 100%;
  min-height: 300px;
  padding: 1.2rem 0.5rem 0.3rem 0.5rem;
  background: #232326;
  border-radius: 14px;
}
@media (max-width: 600px) {
  .stats-chart-container {
    min-height: 180px;
    padding: 0.5rem 0.3rem 0.2rem 0.3rem;
  }
}
</style>
