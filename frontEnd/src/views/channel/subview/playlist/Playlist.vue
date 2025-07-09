<script setup>
import SidebarContainer from '@/components/sidebar/SidebarContainer.vue';
import VideoSectionComp from '@/components/videos/VideoSectionComp.vue';
import { onMounted, reactive } from 'vue';
import api from '@/api/video'


// const playlist_videos = [
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
// ]

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
  if (Array.isArray(res) && res.length > 0) {
    Object.assign(playlistForm, res[0]) // API 응답 배열의 첫 번째 비디오를 playlistForm에 할당
  }
}) 

 

</script>

<template>
    <div class="layout-wrap">
        <SidebarContainer />
        <div class="main-wrap">
            <div class="playlist-details">
                <h2>{{ playlistForm.title }}</h2>
                <img :src="playlistForm.thumbnailUrl" alt="Thumbnail" style="width: 300px; height: auto;">
                <p>채널: {{ playlistForm.channel.name }}</p>
                <p>조회수: {{ playlistForm.views }}</p>
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
