<script setup>
import {useRouter} from 'vue-router';
import {reactive, onMounted} from 'vue';
import api from '@/api/channel'

const router = useRouter()

// 네비게이션 상태 관리
const headerActive = reactive({
  video: true,
  playlist: false,
  community: false,
  about: false,
  manage: false
})

// 채널 정보 상태 관리
const channelInfo = reactive({
  id: '',
  name: '',
  content: '',
  email: '',
  avatar: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20151026_112%2Firia__1445857574429PW33V_JPEG%2Fb016zruan8_09_pt01__sclzzzzzzz_aa400_.jpg&type=a340'
})

// 활성 상태 초기화 함수
const resetActiveStates = () => {
  Object.keys(headerActive).forEach(key => {
    headerActive[key] = false
  })
}

// 네비게이션 클릭 핸들러들
const clickVideo = () => {
  resetActiveStates()
  headerActive.video = true
  router.push('/channel/videos')
}

const clickPlaylist = () => {
  resetActiveStates()
  headerActive.playlist = true
  router.push('/channel/playlists')
}

const clickCommunity = () => {
  resetActiveStates()
  headerActive.community = true
  router.push('/channel/community')
}

const clickAbout = () => {
  resetActiveStates()
  headerActive.about = true
  router.push('/channel/about')
}

const clickManage = () => {
  resetActiveStates()
  headerActive.manage = true
  router.push('/channel/manage')
}

// 채널 정보 로드
const loadChannelInfo = async () => {
  try {
    const result = await api.getChannelInfo()
    Object.assign(channelInfo, result.data)
  } catch (error) {
    console.error('채널 정보 로드 실패:', error)
  }
}

onMounted(() => {
  loadChannelInfo()
})
</script>

<template>
  <!-- 채널 헤더 -->
  <header class="channel-header">
    <div class="channel-profile">
      <img :src="channelInfo.avatar" alt="채널 아바타" class="channel-avatar">
      <div class="channel-info">
        <h1 class="channel-name">{{ channelInfo.name || '내 채널' }}</h1>
        <p class="channel-description" v-if="channelInfo.content">{{ channelInfo.content }}</p>
      </div>
    </div>
  </header>

  <!-- 채널 네비게이션 바 -->
  <nav class="channel-nav">
    <div class="nav-container">
      <button class="channel-nav-item" :class="{active: headerActive.video}" @click="clickVideo">
        <i class="fas fa-video"></i>
        동영상
      </button>
      <button class="channel-nav-item" :class="{active: headerActive.playlist}" @click="clickPlaylist">
        <i class="fas fa-list"></i>
        플레이리스트
      </button>
      <button class="channel-nav-item" :class="{active: headerActive.community}" @click="clickCommunity">
        <i class="fas fa-comments"></i>
        커뮤니티
      </button>
      <button class="channel-nav-item" :class="{active: headerActive.about}" @click="clickAbout">
        <i class="fas fa-info-circle"></i>
        정보
      </button>
      <button class="channel-nav-item" :class="{active: headerActive.manage}" @click="clickManage">
        <i class="fas fa-cog"></i>
        동영상 관리
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* 헤더임 */
.channel-header {
  background: linear-gradient(135deg, #0d1117 0%, #161b22 25%, #21262d 50%, #161b22 75%, #0d1117 100%);
  padding: 2rem 0;
  color: white;
}

.channel-profile {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.channel-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.channel-info h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.channel-description {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

/* 채널 네비게이션임 */
.channel-nav {
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  top: 80px;
  z-index: 100;
}

.nav-container {
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

.channel-nav-item i {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .channel-profile {
    padding: 0 1rem;
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .channel-avatar {
    width: 60px;
    height: 60px;
  }

  .channel-info h1 {
    font-size: 1.5rem;
  }

  .nav-container {
    padding: 0 1rem;
    overflow-x: auto;
  }

  .channel-nav-item {
    white-space: nowrap;
    padding: 1rem;
  }
}
</style>