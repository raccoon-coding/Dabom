<script setup>
    import ChannelPostCard from '@/components/channel/ChannelPostCard.vue';
</script>

<template>
<section class="content-tab" id="community-tab">
    <div class="tab-header">
        <h2>커뮤니티</h2>
    </div>

    <div class="community-posts">
        <ChannelPostCard v-for="n in 10" />
    </div>
</section>
</template>

<style scoped>
    @import url('@/assets/channel/communityHeader.css');
</style>