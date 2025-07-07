<script setup>
const props = defineProps(['video_url', 'is_open_modal'])

const videoUrl = props.video_url;
const isModalOpen = props.is_open_modal;
</script>

<template>
    <video id="mainVideoPlayer" :class="['video-player', { 'modal-active': isModalOpen }]" controls>
        <source v-bind:src=videoUrl type="video/mp4">
    </video>
</template>

<style scoped>
.video-player {
    width: 100%;
    height: 100%;
    background-color: #000;
    border-radius: 15px 15px 0 0;
}

/* 모달이 활성화되었을 때 비디오 스타일 변경 */
.video-player.modal-active {
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
</style>