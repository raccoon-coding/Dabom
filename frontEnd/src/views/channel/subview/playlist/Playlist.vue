<script setup>
import SidebarContainer from '@/components/sidebar/SidebarContainer.vue';
import VideoCardComp from '@/components/videos/VideoCardComp.vue';
import { onMounted, computed, reactive } from 'vue';
import api from '@/api/playlist';

const playlist_videos = reactive({
    music: [],
    sports: [],
    education: []
});

onMounted(async () => {
  const res = await api.playlist_show();
    if (Array.isArray(res)) {
        for (let playlist_video of res) {
            if(playlist_video.style === '음악') {
                playlist_videos.music.push(playlist_video);
            } else if (playlist_video.style === '스포츠') {
                playlist_videos.sports.push(playlist_video);
            } else if (playlist_video.style === '교육') {
                playlist_videos.education.push(playlist_video);
            }
        }
    }
});

</script>

<template>
    <div class="layout-wrap">
        <SidebarContainer />
        <div class="main-wrap">
            <div class="playlist-details">
                <!-- Display playlist details here if needed -->
            </div>

            <div v-if="playlist_videos.music.length > 0">
                <h2>음악</h2>
                <div class="video-grid">
                    <VideoCardComp v-for="video in playlist_videos.music" :key="video.id" :video="video" />
                </div>
            </div>

            <div v-if="playlist_videos.sports.length > 0">
                <h2>스포츠</h2>
                <div class="video-grid">
                    <VideoCardComp v-for="video in playlist_videos.sports" :key="video.id" :video="video" />
                </div>
            </div>

            <div v-if="playlist_videos.education.length > 0">
                <h2>교육</h2>
                <div class="video-grid">
                    <VideoCardComp v-for="video in playlist_videos.education" :key="video.id" :video="video" />
                </div>
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

.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
    gap: 1rem;
    width: 100%;
}

.playlist-details {
    margin-bottom: 20px;
    /* Style your playlist details section as needed */
}

h2 {
    color: white;
}
</style>
