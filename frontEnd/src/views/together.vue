<script setup>
import togetherHeader from '../components/together/togetherHeader.vue'
import card from '../components/together/togetherCard.vue'
import myTogetherCard from '../components/together/myTogetherCard.vue'
import togetherModal from '../components/together/createTogetherModal.vue'
import optionCard from '../components/together/togetherOptionCard.vue'
</script>

<template>
  <main class="main-content">
    <div class="together-container">
      <togetherHeader />
      <!-- Together Room Options -->
      <div class="room-options">
        <optionCard />
      </div>

      <!-- Active Rooms -->
      <div class="active-rooms">
        <div class="section-header">
          <h2><i class="fas fa-fire"></i> 활성 Together 방</h2>
          <div class="filter-options">
            <select id="roomFilter">
              <option value="all">모든 방</option>
              <option value="friends">친구들의 방</option>
              <option value="public">공개 방</option>
              <option value="followed">팔로우한 채널</option>
            </select>
          </div>
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
    <togetherModal />
  </main>
</template>

<style scoped>
@import url('../assets/together/togetherSearch.css');
@import url('../assets/together/together.css');
@import url('../assets/main/main.css');
</style>
