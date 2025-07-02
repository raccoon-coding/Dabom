<script setup>
import axios from 'axios'
import togetherSearch from '@/components/together/TogetherSearch.vue'
import card from '@/components/together/TogetherCard.vue'
import myTogetherCard from '@/components/together/MyTogetherCard.vue'
import optionCard from '@/components/together/TogetherOptionCard.vue'
import quickButton from '@/components/together/TogetherQuickButton.vue'
</script>

<template>
    <div class="together-container">
        <togetherSearch />  
        <!-- Together Room Options -->
        <div class="room-options">
            <optionCard />
        </div>
        <quickButton />
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
@import url('../../../assets/together/Together.css');
@import url('../../../assets/main/main.css');
</style>