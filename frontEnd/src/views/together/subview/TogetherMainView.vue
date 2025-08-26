<script setup>
import togetherSearch from '@/components/together/TogetherSearch.vue'
import TogetherCard from '@/components/together/TogetherCard.vue'
import MyTogetherCard from '@/components/together/MyTogetherCard.vue'
import TogetherOptionCard from '@/components/together/TogetherOptionCard.vue'
import api from '@/api/together'

import { reactive, onMounted } from 'vue'

const togethers = reactive({
  randomTogethers: [],
  masterTogethers: [],
  joinTogethers: []
})

const getMyTogethers = async () => {
  const res = await api.getTogetherListInMaster()
  if (res.code === 200) {
    togethers.masterTogethers.push(...res.data.togethers)
  } else {
    console.log('error')
  }
}

const getJoinTogethers = async () => {
  const res = await api.getTogetherListInMember()
  if (res.code === 200) {
    togethers.joinTogethers.push(...res.data.togethers)
  } else {
    console.log('error')
  }
}

const getTogethers = async () => {
  const res = await api.getRandomTogetherList()
  if (res.code === 200) {
    togethers.randomTogethers.push(...res.data.togethers)
  } else {
    console.log('error')
  }
}

onMounted(() => {
  getTogethers()
  getMyTogethers()
  getJoinTogethers()
})
</script>

<template>
  <div class="together-container">
    <togetherSearch />
    <!-- Together Room Options -->
    <div class="room-options">
      <TogetherOptionCard />
    </div>

    <!-- My Rooms -->
    <div class="my-rooms">
      <div class="section-header">
        <h2><i class="fas fa-user"></i> 내가 만든 방</h2>
      </div>
      <!-- 더미 데이터 시작 -->
      <div class="my-rooms-list">
        <MyTogetherCard v-for="together in togethers.masterTogethers" :together="together" :isMaster="true" />
      </div>
      <!-- 더미 데이터 종료 -->
    </div>
    <div class="my-rooms">
      <div class="section-header">
        <h2><i class="fas fa-user"></i> 내가 참여하고 있는 방</h2>
      </div>
      <!-- 더미 데이터 시작 -->
      <div class="my-rooms-list">
        <MyTogetherCard v-for="together in togethers.joinTogethers" :together="together" :isMaster="false" />
      </div>
      <!-- 더미 데이터 종료 -->
    </div>
    <!-- Active Rooms -->
    <div class="active-rooms">
      <div class="section-header">
        <h2><i class="fas fa-fire"></i> 활성 Together 방</h2>
      </div>
      <!-- 더미 데이터 시작 -->
      <div class="rooms-grid">
        <together-card v-for="together in togethers.randomTogethers" :together="together" />
      </div>
      <!-- 더미 데이터 종료 -->
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/together/Together.css');
@import url('@/assets/main/main.css');
</style>
