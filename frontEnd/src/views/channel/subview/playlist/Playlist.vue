<script setup>
import SidebarContainer from '@/components/sidebar/SidebarContainer.vue';
import VideoSectionComp from '@/components/videos/VideoSectionComp.vue';
import { onMounted, reactive } from 'vue';
import api from '@/api/video'


const playlist_videos = [
    {
        id: '1',
        title: '병욱님의 키보드 탐구',
        thumbnailUrl: '@/assets/images/dabom2.png',
        duration: '12:34',
        channel: {
            name: '알리 매니아',
            avatarUrl: '@/assets/images/dabom2.png',
        },
        rating: 4.2,
        views: 12,
        uploadedAt: 2,
    },
]

const playlistForm = reactive({
    id: '',
    title: '',
    thumbnailUrl: '',
    duration: '',
    channel: {
        name: '',
        avatarUrl: '',
    },
    rating: '',
    views: '',
    uploadedAt: '',
})

onMounted(async () => {
  const res = await api.playlist_show(playlistForm)
  Object.assign(playlistForm, res.playlistForm)
  // renderChart(activeType.value)
}) 

 

</script>

<template>
    <div class="layout-wrap">
        <SidebarContainer />
        <div class="main-wrap">
            <div class="video-section">
                <!-- <VideoSectionComp :title="'인기영상'" :icon="'fas fa-fire'" :videos="state.popularVideos" /> -->
                <VideoSectionComp :title="'음악'" :icon="'fas fa-fire'" :videos="playlist_videos" />
                <VideoSectionComp :title="'스포츠'" :icon="'fas fa-fire'" :videos="playlist_videos" />
                <VideoSectionComp :title="'교육'" :icon="'fas fa-fire'" :videos="playlist_videos" />
            </div>
        </div>
    </div>
</template>


<style scoped>
.layout-wrap {
    display: flex;
}

.main-wrap {
    flex: 1;
    margin-top: 3rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 78%;
}

.video-section {
    display: grid;
    margin-left: 1.8rem
}
</style>
