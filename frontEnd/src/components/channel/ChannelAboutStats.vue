<script setup>
const props = defineProps({
  modelValue: { type: String, default: 'subscribers' } // 현재 선택된 타입
})
const emit = defineEmits(['update:modelValue'])

const statList = [
  { type: 'subscribers', number: '12.5만', label: '구독자' },
  { type: 'videos', number: '245', label: '동영상' },
  { type: 'views', number: '850만', label: '총 조회수' },
  { type: 'rating', number: '4.6', label: '평균 별점' }
]

function selectType(type) {
  emit('update:modelValue', type)
}
</script>

<template>
  <div class="stats-boxes">
    <div
      v-for="stat in statList"
      :key="stat.type"
      :class="['stat-card', { active: modelValue === stat.type }]"
      :data-type="stat.type"
      @click="selectType(stat.type)"
    >
      <div class="stat-number">{{ stat.number }}</div>
      <div class="stat-label">{{ stat.label }}</div>
    </div>
  </div>
</template>

<style scoped>
.stats-boxes {
  margin-top: 1.5rem;
  margin-left: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
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
}
</style>
