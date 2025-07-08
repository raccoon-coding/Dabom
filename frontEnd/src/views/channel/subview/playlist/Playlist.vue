<script setup>
import playlistcard from '@/views/channel/subview/playlist/Playlist_card.vue'
</script>

<template>
    <h2>내 재생목록</h2>
    <div class="playlist-container">
        <div class="playlist-header">
            <h3>내 재생목록</h3>
            <button class="add-playlist-button">만들기</button>
            <button class="add-playlist-button">음악</button>
            <button class="add-playlist-button">믹스</button>
        </div>
        <div class="playlist-cards">
            <!-- Playlist_card.vue 를 불러옴 -->
            <playlistcard v-for="n in 10" :key="n" />
        </div>
    </div>
</template>

<style scoped>

</style>