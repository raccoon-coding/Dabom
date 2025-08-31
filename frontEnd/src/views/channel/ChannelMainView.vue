<script setup>
import ChannelNavigation from '@/components/channel/ChannelNavigation.vue';

</script>

<template>
  <ChannelNavigation/>
  <div class="channel-content">
    <RouterView/>
  </div>

</template>

<style scoped>
/* Content Tabs */
.channel-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}
</style>