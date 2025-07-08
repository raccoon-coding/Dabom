<script setup>
import { reactive } from 'vue';

let data = reactive({
    videoId: '12345',
    title: '멋진 영상 제목이 여기에 표시됩니다 - DaBom 플랫폼 소개',
    channelName: '크리에이티브 채널',
    channelSubscribers: '12.5만명',
    thumbnailUrl: 'https://via.placeholder.com/640x360',
    views: '12만회',
    rating: 4.2,
    isSubscribed: false,
    explainText: '',
    tags: [''],
});


</script>

<template>
    <!-- 영상 설명 및 태그 -->
    <div class="video-description">
        <div class="description-content">
            <p>이 영상은 DaBom 플랫폼의 새로운 기능들을 소개하는 영상입니다. 별점 평가 시스템과 Together 모드의 혁신적인 기능들을 확인해보세요!</p>
            <p>DaBom은 창작자와 시청자가 함께하는 새로운 패러다임의 스트리밍 플랫폼입니다.</p>
            <div class="video-tags">
                <span class="tag">#DaBom</span>
                <span class="tag">#스트리밍</span>
                <span class="tag">#Together모드</span>
                <span class="tag">#별점평가</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(../../assets/Video_Player/Video_Player.css);

</style>