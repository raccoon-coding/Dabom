<script setup>
import togetherSearch from '@/components/together/TogetherSearch.vue'
import TogetherCard from '@/components/together/TogetherCard.vue'
import MyTogetherCard from '@/components/together/MyTogetherCard.vue'
import TogetherOptionCard from '@/components/together/TogetherOptionCard.vue'
import api from '@/api/together'

import { reactive, onMounted } from 'vue'

const togethers = reactive({
    togethers: []
})

const myTogethers = reactive({
  togethers: []
})

const getMyTogethers = async () => {
  const res = await api.getRandomTogetherList()
  if(res.code === 200) {
    myTogethers.togethers.push(...res.data.togethers)
  } else {
    console.log("error");
  }
}

const getTogethers = async () => {
    const res = await api.getRandomTogetherList()
    if(res.code === 200) {
        togethers.togethers.push(...res.data.togethers)
    } else {
        console.log("error");
    }
}

onMounted(() => { 
    getTogethers();
    getMyTogethers();
})
</script>

<template>
    <div class="together-container">
        <togetherSearch />  
        <!-- Together Room Options -->
        <div class="room-options">
            <TogetherOptionCard />
        </div>
        <!-- Active Rooms -->
        <div class="active-rooms">
            <div class="section-header">
                <h2><i class="fas fa-fire"></i> 활성 Together 방</h2>
            </div>
            <!-- 더미 데이터 시작 -->
            <div class="rooms-grid">
                <together-card v-for="together in togethers.togethers" :together="together" />
            </div>
            <!-- 더미 데이터 종료 -->
        </div>
        <!-- My Rooms -->
        <div class="my-rooms">
            <div class="section-header">
                <h2><i class="fas fa-user"></i> 내가 만든 방</h2>
            </div>
            <!-- 더미 데이터 시작 -->
            <div class="my-rooms-list">
                <MyTogetherCard v-for="together in myTogethers.togethers" :together="together" />
            </div>
            <!-- 더미 데이터 종료 -->
        </div>
    </div>
</template>

<style scoped>
@import url('@/assets/together/Together.css');
@import url('@/assets/main/main.css');
</style>