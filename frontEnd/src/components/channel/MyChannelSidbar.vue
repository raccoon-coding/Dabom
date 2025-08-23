<script>
import { onMounted, reactive } from 'vue'  
import api from '@/api/channel'

export default {
  name: 'Sidebar',
  props: {
    currentSection: String
  },
  setup() {  
    
    const channelInfoForm = reactive({
      id: "12345",
      name: '',
      content: '',
      image: [],
      banner: [],
      email: '',
      sns01: '',
      sns02: ''
    })

    // 저장 이벤트 함수
    const onSubmit = async() => {
      const res = await api.updateChannelInfo(channelInfoForm)
      console.log(res)
      Object.assign(channelInfoForm, res)
      alert('저장되었습니다!')
    }

    onMounted(async () => {
      const result = await api.getChannelInfo()
      console.log(result)
      channelInfoForm.id = result.data.id
      channelInfoForm.name = result.data.name
      channelInfoForm.content = result.data.content
      channelInfoForm.email = result.data.email
    })

    // 템플릿에서 사용할 것들 반환
    return {
      channelInfoForm,
      onSubmit
    }
  }
}
</script>

<template>
  <aside class="dashboard-sidebar">
    <form class="channel-info-form" @submit.prevent="onSubmit">
      <div class="profile-area">
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20151026_112%2Firia__1445857574429PW33V_JPEG%2Fb016zruan8_09_pt01__sclzzzzzzz_aa400_.jpg&type=a340"
          class="dashboard-avatar" alt="채널 아바타">
        <div class="channel-owner">{{ channelInfoForm.name || '내 채널' }}</div>
      </div>
    </form>
    <button :class="['sidebar-btn', { active: currentSection === 'videos' }]" @click="$emit('navigate', 'videos')"><i class="fas fa-video"></i> 동영상 관리</button>
    <button :class="['sidebar-btn', { active: currentSection === 'playlists' }]" @click="$emit('navigate', 'playlists')"><i class="fas fa-list"></i> 플레이리스트 관리</button>
    <button :class="['sidebar-btn', { active: currentSection === 'community' }]" @click="$emit('navigate', 'community')"><i class="fas fa-comments"></i> 커뮤니티 관리</button>
    <button :class="['sidebar-btn', { active: currentSection === 'info' }]" @click="$emit('navigate', 'info')"><i class="fas fa-user-cog"></i> 채널 정보 수정</button>
  </aside>
</template>

<style scoped>
@import url(@/assets/channel/mychannel);
</style>