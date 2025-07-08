<script setup>
import { reactive, onMounted } from 'vue';
import api from '@/api/video_player';

let data = reactive({
    videoId: '67890', // 12345, 67890. 11223 있음 
    title: '',
    channelName: '',
    channelSubscribers: '',
    views: '',
    rating: 0,
    isSubscribed: false,
    explainText: '',
    tags: [],
});
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
    <!-- 영상 설명 및 태그 -->
    <div class="video-description">
        <div class="description-content">
            <p> {{data.explainText}}</p>
            <div class="video-tags">
                <span class="tag" v-for="tag in data.tags" :key="tag"> {{tag}} </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(../../assets/Video_Player/Video_Player.css);

</style>