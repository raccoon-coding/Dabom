<script setup>
import BannerComp from '@/components/banner/BannerComp.vue';
import SidebarContainer from '@/components/sidebar/SidebarContainer.vue';
import VideoSectionComp from '@/components/videos/VideoSectionComp.vue';
import { onMounted, reactive } from 'vue';
import api from '@/api/video'


// const popularVideos = [
//     {
//         id: '1',
//         title: '병욱님의 키보드 탐구',
//         thumbnailUrl: '@/assets/images/dabom2.png',
//         duration: '12:34',
//         channel: {
//             name: '알리 매니아',
//             avatarUrl: '@/assets/images/dabom2.png',
//         },
//         rating: 4.2,
//         views: 12,
//         uploadedAt: 2,
//     },
//     {
//         id: '2',
//         title: '병욱님의 키보드 탐구',
//         thumbnailUrl: '@/assets/images/dabom2.png',
//         duration: '12:34',
//         channel: {
//             name: '알리 매니아',
//             avatarUrl: '@/assets/images/dabom2.png',
//         },
//         rating: 4.2,
//         views: 12,
//         uploadedAt: 2,
//     },
//     {
//         id: '3',
//         title: '병욱님의 키보드 탐구',
//         thumbnailUrl: '@/assets/images/dabom2.png',
//         duration: '12:34',
//         channel: {
//             name: '알리 매니아',
//             avatarUrl: '@/assets/images/dabom2.png',
//         },
//         rating: 4.2,
//         views: 12,
//         uploadedAt: 2,
//     },
//     {
//         id: '4',
//         title: '병욱님의 키보드 탐구',
//         thumbnailUrl: '@/assets/images/dabom2.png',
//         duration: '12:34',
//         channel: {
//             name: '알리 매니아',
//             avatarUrl: '@/assets/images/dabom2.png',
//         },
//         rating: 4.2,
//         views: 12,
//         uploadedAt: 2,
//     },
//     {
//         id: '5',
//         title: '병욱님의 키보드 탐구',
//         thumbnailUrl: '@/assets/images/dabom2.png',
//         duration: '12:34',
//         channel: {
//             name: '알리 매니아',
//             avatarUrl: '@/assets/images/dabom2.png',
//         },
//         rating: 4.2,
//         views: 12,
//         uploadedAt: 2,
//     },

// ]

const state = reactive({
    popularVideos: []
})

const getVideoList = async () => {
    await api.getVideoList()
        .then((data) => {
            console.log(data)
            state.popularVideos = data
        })
        .catch((error) => {
            console.error(error)
        })
}

onMounted(() => {
    getVideoList()
})
</script>

<template>
    <div class="layout-container">
        <SidebarContainer />
        <div class="main-content">
            <BannerComp />
            <div class="video-section">
                <VideoSectionComp :title="'인기영상'" :icon="'fas fa-fire'" :videos="state.popularVideos" />
            </div>
        </div>
    </div>
</template>


<style scoped>
.layout-container {
    display: flex;
}

.main-content {
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
