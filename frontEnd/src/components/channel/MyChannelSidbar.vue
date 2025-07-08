<template>
    <aside class="dashboard-sidebar">
      <div class="profile-area">
        <img
          src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20151026_112%2Firia__1445857574429PW33V_JPEG%2Fb016zruan8_09_pt01__sclzzzzzzz_aa400_.jpg&type=a340"
          class="dashboard-avatar" alt="채널 아바타">
        <div class="channel-owner">내 채널</div>
      </div>
      <button :class="['sidebar-btn', { active: currentSection === 'videos' }]" @click="$emit('navigate', 'videos')"><i class="fas fa-video"></i> 동영상 관리</button>
      <button :class="['sidebar-btn', { active: currentSection === 'playlists' }]" @click="$emit('navigate', 'playlists')"><i class="fas fa-list"></i> 플레이리스트 관리</button>
      <button :class="['sidebar-btn', { active: currentSection === 'community' }]" @click="$emit('navigate', 'community')"><i class="fas fa-comments"></i> 커뮤니티 관리</button>
      <button :class="['sidebar-btn', { active: currentSection === 'info' }]" @click="$emit('navigate', 'info')"><i class="fas fa-user-cog"></i> 채널 정보 수정</button>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
    props: {
      currentSection: String
    }
  }
  </script>
   <style scoped>
   @import url(@/assets/channel/mychannel);
   </style>
  