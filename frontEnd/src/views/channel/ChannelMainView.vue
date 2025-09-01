<script setup>
import ChannelHeader from '@/components/channel/ChannelHeader.vue';  // 새로 만든 컴포넌트
import ChannelNavigation from '@/components/channel/ChannelNavigation.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const channelIdx = route.params.channelIdx;

const isMychannelRoute = computed(() => {
    return route.name === 'mychannel';
});
</script>

<template>
    <ChannelHeader :channelIdx="channelIdx" />
    
    <!-- 네비게이션 (mychannel 경로가 아닐 때만 표시) -->
    <ChannelNavigation 
        v-if="!isMychannelRoute" 
        :channelIdx="channelIdx" 
    />
    
    <div class="channel-content">
        <router-view></router-view>
    </div>
</template>

<style scoped>
.channel-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.channel-content {
    padding-top: 1rem;
}
</style>