<template>
  <div class="playlist-card">
    <div class="playlist-thumbnail">
      <img :src="playlist.thumbnailUrl" alt="플레이리스트" />
      <div class="playlist-count">
        <i class="fas fa-list"></i>
        {{ playlist.videoCount }}개 동영상
      </div>
    </div>
    <div class="playlist-info">
      <h4 class="playlist-title">{{ playlist.title }}</h4>
      <p class="playlist-description">{{ playlist.description }}</p>
      <div class="playlist-meta">
        <span class="view-count">총 조회수 {{ playlist.totalViews }}</span>
        <span class="last-updated">{{ playlist.lastUpdated }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlaylistCard",
  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
/* 여기에 .playlist-card와 관련된 CSS만 남깁니다. */
.playlist-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.playlist-thumbnail { position: relative; }
.playlist-thumbnail img { width: 100%; display: block; }
.playlist-count {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  font-size: 12px;
  border-top-left-radius: 8px;
}
.playlist-info { padding: 15px; }
.playlist-title { font-size: 16px; margin: 0 0 10px; }
.playlist-description { font-size: 14px; color: #666; margin: 0 0 10px; }
.playlist-meta { font-size: 12px; color: #888; }
.playlist-meta span { margin-right: 15px; }
</style>
