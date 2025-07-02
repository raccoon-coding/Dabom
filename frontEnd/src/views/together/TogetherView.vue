<script setup>
import axios from 'axios'
import togetherHeader from '../../components/together/TogetherHeader.vue'
import card from '../../components/together/TogetherCard.vue'
import myTogetherCard from '../../components/together/MyTogetherCard.vue'
import optionCard from '../../components/together/TogetherOptionCard.vue'
import quickButton from '../../components/together/TogetherQuickButton.vue'
</script>

<template>
  <main class="main-content">
    <div class="together-container">
      <togetherHeader />
      <router-view></router-view>
      </div>
  </main>
</template>

<style scoped>
</style>
