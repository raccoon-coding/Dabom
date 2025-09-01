<script setup>
import { reactive, onMounted } from 'vue'
import api from '@/api/channel'

const props = defineProps({
  currentSection: {
    type: String,
    default: ''
  }
})



// const channelInfoForm = reactive({
//   id: "12345",
//   name: '',
//   content: '',
//   image: [],
//   banner: [],
//   email: '',
//   sns01: '',
//   sns02: ''
// })

const loadChannelInfo = async () => {
    const result = await api.getChannelInfo()
    channelInfoForm.id = result.data.id
    channelInfoForm.name = result.data.name
    channelInfoForm.content = result.data.content
    channelInfoForm.email = result.data.email
}

// const onSubmit = async () => {
//     const res = await api.updateChannelInfo(channelInfoForm)
//     Object.assign(channelInfoForm, res)
//     alert('저장되었습니다!')
// }
// onMounted(() => {
//   loadChannelInfo()
// })

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