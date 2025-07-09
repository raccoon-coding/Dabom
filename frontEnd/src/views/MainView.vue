<script setup>
import BannerComp from '@/components/banner/BannerComp.vue';
import SidebarContainer from '@/components/sidebar/SidebarContainer.vue';
import VideoSectionComp from '@/components/videos/VideoSectionComp.vue';
import { onMounted, reactive } from 'vue';
import api from '@/api/video'

const state = reactive({
    popularVideos: []
})

const getVideoList = async () => {
    const result = await api.getVideoList()
    state.popularVideos = result
    console.log(state.popularVideos)
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
                <!-- <VideoSectionComp :title="'인기영상'" :icon="'fas fa-fire'" :videos="popularVideos" /> -->
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
