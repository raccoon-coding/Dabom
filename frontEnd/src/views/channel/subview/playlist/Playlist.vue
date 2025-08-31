<script setup>
import { onMounted, reactive } from 'vue';
import api from '@/api/playlist';

const playlists = reactive([]);

onMounted(async () => {
  try {
    const response = await api.getMyPlaylists();
    // The backend returns a list of playlists. Let's put them in our reactive array.
    playlists.splice(0, playlists.length, ...response);
  } catch (error) {
    console.error('Failed to load playlists:', error);
  }
});

const getPlaylistDetails = (playlistIdx) => {
    // We can navigate to a detailed view of the playlist later
    console.log("Navigate to playlist with id:", playlistIdx)
}

</script>

<template>
    <div class="layout-wrap">
        <div class="main-wrap">
            <h1>내 플레이리스트</h1>
            <div class="playlists-grid">
                <div v-for="playlist in playlists" :key="playlist.idx" class="playlist-card" @click="getPlaylistDetails(playlist.idx)">
                    <div class="playlist-thumbnail">
                        <!-- We can add a generic playlist icon or a thumbnail of the first video later -->
                        <img src="https://via.placeholder.com/320x180?text=Playlist" alt="플레이리스트 썸네일">
                        <div class="playlist-count">
                            <i class="fas fa-list"></i>
                            {{ playlist.videoCount }}개 동영상
                        </div>
                    </div>
                    <div class="playlist-info">
                        <h3 class="playlist-title">{{ playlist.playlistTitle }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '@/CSS/playList.css';

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

h1 {
    color: white;
    margin-bottom: 2rem;
}

/* Using the existing styles from playList.css */
</style>