<script setup>
import TogetherMasterModal from '@/components/together_room/TogetherMasterModal.vue';
import TogetherRoomChat from '@/components/together_room/TogetherRoomChat.vue';
import TogetherRoomNavigator from '@/components/together_room/TogetherRoomNavigator.vue';

import {reactive} from 'vue'

const stateModal = reactive({
    chatModal: false,
    masterModal: false,
});

const openChatModal = () => {
    stateModal.chatModal = true;
}

const closeChatModal = () => {
    stateModal.chatModal = false;
}

const openMasterModal = () => {
    stateModal.masterModal = true;
}

const closeMasterModal = () => {
    stateModal.masterModal = false;
}
</script>

<template>
    <TogetherRoomNavigator />
<!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-controls">
                <button class="nav-btn" id="chatToggle" title="채팅" @click="openChatModal()">
                    <i class="fas fa-comments"></i>
                </button>
                <button class="nav-btn" id="settingsBtn" title="설정">
                    <i class="fas fa-cog"></i>
                </button>
                <button class="nav-btn" id="fullscreenBtn" title="전체화면">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        </div>
    </nav>
    <!-- Main Content -->
    <main class="main-content">
        <div class="video-section" id="videoSection">
            <!-- Video Container -->
            <div class="video-container">
                <div class="video-player">
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 1rem; display: block;"></i>
                        비디오를 선택하여 함께 시청하세요
                    </div>
                    
                    <!-- Video Controls -->
                    <div class="video-controls">
                        <button class="play-pause-btn" id="playPauseBtn">
                            <i class="fas fa-play"></i>
                        </button>
                        <div class="progress-bar" id="progressBar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="time-display">00:30 / 02:45</div>
                    </div>

                    <!-- Master Button -->
                    <button class="master-btn" id="masterBtn" @click="openMasterModal()">
                        <i class="fas fa-crown"></i>
                        마스터 화면
                    </button>
                </div>

                <!-- Video Info -->
                <div class="video-info">
                    <h2 class="video-title">함께보기 - 샘플 비디오</h2>
                    <div class="video-meta">
                        <div class="viewers-count">
                            <i class="fas fa-users"></i>
                            <span id="viewersCount">5명 시청 중</span>
                        </div>
                        <div>
                            <i class="fas fa-clock"></i>
                            시작된 시간: 2분 전
                        </div>
                    </div>
                </div>
            </div>

            <!-- Users Section -->
            <div class="users-section">
                <h3 class="users-title">
                    <i class="fas fa-users"></i>
                    참여자 목록 (5명)
                </h3>
                <div class="users-grid" id="usersGrid">
                    <div class="user-card">
                        <div class="user-avatar">김</div>
                        <div class="user-name">김철수</div>
                    </div>
                    <div class="user-card">
                        <div class="user-avatar">이</div>
                        <div class="user-name">이영희</div>
                    </div>
                    <div class="user-card">
                        <div class="user-avatar">박</div>
                        <div class="user-name">박민수</div>
                    </div>
                    <div class="user-card">
                        <div class="user-avatar">최</div>
                        <div class="user-name">최지영</div>
                    </div>
                    <div class="user-card">
                        <div class="user-avatar">정</div>
                        <div class="user-name">정대현</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <TogetherMasterModal v-if="stateModal.masterModal" @close_modal="closeMasterModal()"></TogetherMasterModal>
    <TogetherRoomChat v-if="stateModal.chatModal" @close_modal="closeChatModal()"></TogetherRoomChat>
</template>

<style scoped>

</style>