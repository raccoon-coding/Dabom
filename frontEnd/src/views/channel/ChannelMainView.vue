<script setup>
import channelnavigation from '@/components/channel/ChannelNavigation.vue';

</script>

<template>
<channelnavigation />
<div class="channel-content">
    <router-view></router-view>
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