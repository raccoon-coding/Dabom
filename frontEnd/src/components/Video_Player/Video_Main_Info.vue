<script setup>
import { reactive, onMounted } from 'vue';
import api from '@/api/video_player';

// let data = reactive({
//     videoId: '67890', // 12345, 67890. 11223 있음 
//     title: '',
//     channelName: '',
//     channelSubscribers: '',
//     views: '',
//     rating: 0,
//     isSubscribed: false,
//     explainText: '',
//     tags: [],
// });

const getDataInfo = async () => {
    try {
        const videoList = await api.getVideoInfo();

        if (Array.isArray(videoList)) {
            const targetVideo = videoList.find(video => parseInt(video.videoId) === parseInt(data.videoId));
            if (targetVideo) {
                Object.assign(data, targetVideo);
            } else {
                alert("영상 ID가 잘못됨")
                return;
            }
        }
    } catch (error) {
        console.error("영상 정보를 불러오는 중 오류가 발생했습니다:", error);
        data.title = "정보를 불러오는 데 실패했습니다.";
    }
};

onMounted(() => {
    getDataInfo();
});
</script>

<template>
    <!-- 영상 정보 및 채널 정보 영역 -->
    <div class="video-main-info">
        <!-- 제목 + 버튼 한 줄 배치 -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
            <h1 class="video-title" style="margin: 0;">
                {{ data.title }}
            </h1>
            <div class="channel-actions" style="display: flex; gap: 8px;">
                <button class="btn btn-subscribe">{{ data.isSubscribed ? '구독중' : '구독' }}</button>
                <button class="action-btn">
                    <i class="fa-solid fa-envelope"></i>
                    메시지
                </button>
            </div>
        </div>

        <div class="channel-row">
            <div class="channel-info-vertical">
                <span class="channel-name">{{ data.channelName }}</span>
                <span class="subscriber-count">구독자 {{ data.channelSubscribers }}명</span>
            </div>
            <div class="channel-buttons">
                <button class="action-btn together-btn" id="togetherBtn">
                    <i class="fas fa-users"></i>Together 모드</button>
                <button class="action-btn share-btn"><i class="fas fa-share"></i>공유</button>
                <button class="action-btn playlist-btn"><i class="fas fa-plus"></i>플레이리스트에 추가</button>
            </div>
        </div>

        <!-- Together 모드 패널 (기능 구현 시 사용) -->
        <div class="together-panel" id="togetherPanel" style="display: none;">
            <!-- ... Together 모드 관련 UI ... -->
        </div>
    </div>

    <!-- 별점 평가 시스템 -->
    <div class="rating-row">
        <span class="current-rating">조회수 {{ data.views }}회 • 평균 {{ data.rating.toFixed(1) }}점</span>
        <div class="rating-right">
            <span class="rating-label">이 영상을 평가해주세요:</span>
            <div class="star-rating-interactive">
                <i class="fas fa-star" data-rating="1"></i>
                <i class="fas fa-star" data-rating="2"></i>
                <i class="fas fa-star" data-rating="3"></i>
                <i class="fas fa-star" data-rating="4"></i>
                <i class="fas fa-star" data-rating="5"></i>

            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(../../assets/Video_Player/Video_Player.css);
</style>
