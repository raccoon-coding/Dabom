<script setup>

</script>

<template>
     <!-- Channel Navigation -->
     <nav class="channel-nav">

<div class="nav-container">
    <button class="channel-nav-item active" data-tab="videos">
        <i class="fas fa-video"></i>
        동영상
    </button>
    <button class="channel-nav-item" data-tab="playlists">
        <i class="fas fa-list"></i>
        플레이리스트
    </button>
    <button class="channel-nav-item" data-tab="community">
        <i class="fas fa-comments"></i>
        커뮤니티
    </button>
    <button class="channel-nav-item" data-tab="about">
        <i class="fas fa-info-circle"></i>
        정보
    </button>

</div>
</nav>

</template>

<style scoped>
/* Channel Navigation */
.channel-nav {
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 80px;
  z-index: 100;
}

.channel-nav .nav-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  padding: 0 2rem;
  overflow-x: auto;
  justify-content: center;
}

.channel-nav-item {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: var(--transition);
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.channel-nav-item:hover {
  color: var(--text-primary);
  background-color: var(--hover-color);
}

.channel-nav-item.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}
</style>