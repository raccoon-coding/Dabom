<script setup>
import TogetherMasterModal from '@/components/together_room/TogetherMasterModal.vue';
import TogetherRoomChat from '@/components/together_room/TogetherRoomChat.vue';
import TogetherRoomNavigator from '@/components/together_room/TogetherRoomNavigator.vue';
import Video_Player_Component from '@/components/Video_Player/Video_Player_Component.vue';

import {reactive} from 'vue'

const stateModal = reactive({
    chatModal: false,
    masterModal: false,
});
const testUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

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
    <TogetherRoomNavigator @open_chat_modal="openChatModal()" @open_master_modal="openMasterModal()" />
    <!-- Main Content -->
        <div class="video-section" id="videoSection">
            <!-- Video Container -->
            <div class="video-container" :class="{ 'modal-open': stateModal.chatModal }" >
                <div class="video-player">
                    <Video_Player_Component :video_url="testUrl" :is_open_modal="stateModal.chatModal" />
                </div>
            </div>
        </div>
        <TogetherMasterModal v-if="stateModal.masterModal" @close_modal="closeMasterModal()"></TogetherMasterModal>
        <TogetherRoomChat v-if="stateModal.chatModal" @close_modal="closeChatModal()" @open_master_modal="openMasterModal"></TogetherRoomChat>
</template>

<style scoped>
/* 비디오 컨테이너 애니메이션 */
.video-container {
  width: 70%;
  height: 70%;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: 50% 50%;
  margin-left: 5.5rem;
}

/* 모달이 열릴 때 비디오 축소 효과 */
/* .video-container.modal-open {
    transform: translateX(-150px) scale(0.8) translateY(-83px);
    transform-origin: 50% 50%; /* Y축 중심점 유지 */
/* } */
</style>