<script setup>
import togetherSearch from '@/components/together/TogetherSearch.vue'
import card from '@/components/together/TogetherCard.vue'
import myTogetherCard from '@/components/together/MyTogetherCard.vue'
import optionCard from '@/components/together/TogetherOptionCard.vue'
import api from '@/api/together'

import { reactive, onMounted } from 'vue'

const togethers = reactive({
    togethers: []
})

const getTogethers = async () => {
    const res = await api.getRandomTogetherList()
    if(res.state_code === 200) {
        togethers.togethers.push(...res.data.togethers)
    } else {
        console.log("error");
    }
}

onMounted(() => { 
    getTogethers();
})
</script>

<template>
    <div class="together-container">
        <togetherSearch />  
        <!-- Together Room Options -->
        <div class="room-options">
            <optionCard />
        </div>
        <!-- Active Rooms -->
        <div class="active-rooms">
            <div class="section-header">
                <h2><i class="fas fa-fire"></i> 활성 Together 방</h2>
            </div>
            <!-- 더미 데이터 시작 -->
            <div class="rooms-grid">
                <card v-for="together in togethers.togethers" :together="together" />
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
                <myTogetherCard v-for="n in 5" :key="n" />
            </div>
            <!-- 더미 데이터 종료 -->
        </div>
    </div>
</template>

<style scoped>
@import url('@/assets/together/Together.css');
@import url('@/assets/main/main.css');
</style>