<script setup>
import {ref} from 'vue'
import VideoManagementSection from '@/components/channel/video-management/VideoManagementSection.vue';
import PlaylistSection from '@/components/channel/playlist-management/PlaylistSection.vue';
import CommunitySection from '@/components/channel/community-management/CommunitySection.vue';
import InfoSection from '@/components/channel/information-management/InfoSection.vue';

// 현재 활성 섹션 상태-->
const currentSection = ref('videos')

const handleNavigation = (section) => {
  currentSection.value = section
}

</script>

<template>
  <div class="channel-dashboard">
    <main class="dashboard-main">
      <PlaylistSection :isActive="currentSection === 'playlists'"/>
      <CommunitySection :isActive="currentSection === 'community'"/>
      <InfoSection :isActive="currentSection === 'info'"/>
      <VideoManagementSection :isActive="currentSection === 'manage'"/>
    </main>
  </div>
</template>

<style scoped>
@import url(@/assets/channel/mychannel.css);
</style>