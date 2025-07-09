<script setup>
import Video_Main_Info from '../components/Video_Player/Video_Main_Info.vue'
import Video_Tag_Explain from '../components/Video_Player/Video_Tag_Explain.vue'
import Video_Recommend from '../components/Video_Player/Video_Recommend.vue'
import Video_Comment from '../components/Video_Player/Video_Comment.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { reactive } from 'vue'
import api from '@/api/video_player'

const route = useRoute();
console.log("비디오 아이디:", route.params.id)

const videoData = reactive({
    id: route.params.id,
    title: '',
    description: '',
    tags: [],
    views: 0,
    likes: 0,
    dislikes: 0,
    comments: [],
    channel: {
        name: '',
        avatarUrl: ''
    },
    uploadDate: ''
})

onMounted(async () => {
    const data = await api.GetVideo(route.params.id);
    if (data) {
        console.log("비디오 데이터:", data);
    } else {
        console.error("비디오 데이터를 불러오는 데 실패했습니다.");
        console.log("비디오 데이터:", data);
    }
});

    
</script>
<template>
    <div class="video-container">
        <div class="video-player-section">
            <!-- Left Column -->
            <div class="main-content-column">
                <div class="video-player-wrapper">
                    <!-- 실제 비디오 플레이어 -->
                    <video id="mainVideoPlayer" class="video-player" controls>
                        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                            type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Video_Main_Info></Video_Main_Info>
                <Video_Tag_Explain></Video_Tag_Explain>
                <Video_Comment></Video_Comment>
            </div>
            <!-- Right Sidebar -->
            <div class="recommended-sidebar">
                <Video_Recommend></Video_Recommend>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url(../assets/Video_Player/Video_Player.css);
</style>