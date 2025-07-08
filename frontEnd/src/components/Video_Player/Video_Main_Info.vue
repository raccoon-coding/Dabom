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
    <!-- 영상 정보 및 채널 정보 영역 -->
    <div class="video-main-info">
        <!-- 제목 + 버튼 한 줄 배치 -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px;">
            <h1 class="video-title" style="margin: 0;">
                멋진 영상 제목이 여기에 표시됩니다 - DaBom 플랫폼 소개
            </h1>
            <div class="channel-actions" style="display: flex; gap: 8px;">
                <button class="btn btn-subscribe">구독</button>
                <button class="btn btn-message">
                    <i class="fas fa-envelope"></i>
                    메시지
                </button>
            </div>
        </div>

        <div class="channel-row">
            <div class="channel-info-vertical">
                <span class="channel-name">크리에이티브 채널</span>
                <span class="subscriber-count">구독자 12.5만명</span>
            </div>
            <div class="channel-buttons">
                <button class="action-btn together-btn" id="togetherBtn">
                    <i class="fas fa-users"></i>Together 모드</button>
                <button class="action-btn share-btn"><i class="fas fa-share"></i>공유</button>
                <button class="action-btn playlist-btn"><i class="fas fa-plus"></i>플레이리스트에 추가</button>
            </div>
        </div>


        <!-- Together 모드 패널: 동시 시청 및 채팅 기능 (기본은 숨김) -->
        <div class="together-panel" id="togetherPanel">
            <div class="together-header">
                <h4>Together 모드</h4>
                <button class="close-together" id="closeTogetherBtn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <!-- 참가자 목록 -->
            <div class="together-participants">
                <div class="participant">
                    <img src="https://via.placeholder.com/30" alt="참가자">
                    <span>사용자1</span>
                </div>
                <div class="participant">
                    <img src="https://via.placeholder.com/30" alt="참가자">
                    <span>사용자2</span>
                </div>
            </div>
            <!-- Together 모드 채팅 영역 -->
            <div class="together-chat">
                <div class="chat-messages">
                    <div class="chat-message">
                        <strong>사용자1:</strong> 이 장면 정말 좋네요!
                    </div>
                    <div class="chat-message">
                        <strong>사용자2:</strong> 동감합니다!
                    </div>
                </div>
                <div class="chat-input-container">
                    <input type="text" class="chat-input" placeholder="메시지 입력...">
                    <button class="send-message-btn">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 영상 제어 버튼 (재생/일시정지, Together 모드, 공유, 플레이리스트 추가) -->

    <!-- 별점 평가 시스템 -->
    <div class="rating-row">
        <span class="current-rating">평균 4.2점 (234개 평가)</span>
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