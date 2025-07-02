<script setup>
import card from '@/components/together/TogetherCard.vue'
import togetherSearch from '@/components/together/TogetherSearch.vue'
</script>

<template>
    <div class="together-container">
        <togetherSearch /> 
        <!-- Active Rooms -->
        <div class="active-rooms">
            <div class="section-header">
                <h2><i class="fas fa-fire"></i> 활성 Together 방</h2>
            </div>
            <!-- 더미 데이터 시작 -->
            <div class="rooms-grid">
                <card v-for="n in 10" :key="n" />
            </div>
            <!-- 더미 데이터 종료 -->
        </div>
    </div>
</template>

<style scoped>
@import url('@/assets/together/Together.css');
@import url('@/assets/main/main.css');
</style>