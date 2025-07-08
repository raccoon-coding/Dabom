<script setup>
import togetherHeader from '@/components/together/TogetherHeader.vue'
import quickButton from '@/components/together/TogetherQuickButton.vue'
</script>

<template>
  <main class="main-content">
    <div class="together-container">
      <togetherHeader />
      <router-view></router-view>
      <quickButton />
    </div>
  </main>
</template>

<style scoped>
</style>
