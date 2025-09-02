<script setup>
const props = defineProps({
  currentSection: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['navigate'])
const handleNavigate = (section) => {
  emit('navigate', section)
}
</script>

<template>
  <aside class="dashboard-sidebar">
    <form class="channel-info-form" @submit.prevent="onSubmit">
    </form>
    
    <button 
      :class="['sidebar-btn', { active: props.currentSection === 'videos' }]" 
      @click="handleNavigate('videos')"
    >
      <i class="fas fa-video"></i> 동영상 관리
    </button>
    
    <button 
      :class="['sidebar-btn', { active: props.currentSection === 'playlists' }]" 
      @click="handleNavigate('playlists')"
    >
      <i class="fas fa-list"></i> 플레이리스트 관리
    </button>
    
    <button 
      :class="['sidebar-btn', { active: props.currentSection === 'community' }]" 
      @click="handleNavigate('community')"
    >
      <i class="fas fa-comments"></i> 커뮤니티 관리
    </button>
    
    <button 
      :class="['sidebar-btn', { active: props.currentSection === 'info' }]" 
      @click="handleNavigate('info')"
    >
      <i class="fas fa-user-cog"></i> 채널 정보 수정
    </button>
  </aside>
</template>

<style scoped>
@import url(@/assets/channel/mychannel.css);
</style>