<script setup>
import Video_Main_Info from '../components/Video_Player/Video_Main_Info.vue'
import Video_Tag_Explain from '../components/Video_Player/Video_Tag_Explain.vue'
import Video_Recommend from '../components/Video_Player/Video_Recommend.vue'
import Video_Comment from '../components/Video_Player/Video_Comment.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { reactive, ref } from 'vue'
import api from '@/api/video_player'
import VideoInfo from '@/entity/video/VideoInfo.js'

const route = useRoute();
const videoId = route.params.id
const data = ref()

const state = reactive({
    videoInfo: new VideoInfo()
})

const getData = async () => {
    data.value = await api.getVideoById(videoId);
    state.videoInfo = data.value.data
}

onMounted(() => {
    getData();
    console.log(state.videoInfo)
    console.log(state.videoInfo.videoUrl)
});


console.log(state.videoInfo)


</script>

<template>
    <div class="video-container">
        <div class="video-player-section">
            <!-- Left Column -->
            <div class="main-content-column">
                <div class="video-player-wrapper">
                    <!-- 실제 비디오 플레이어 -->
                    <video id="mainVideoPlayer" class="video-player" :src="state.videoInfo.videoUrl" controls>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Video_Main_Info :videoInfo="state.videoInfo"></Video_Main_Info>
                <Video_Tag_Explain :videoInfo="state.videoInfo"></Video_Tag_Explain>
                <Video_Comment :video-id="videoId"></Video_Comment>
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