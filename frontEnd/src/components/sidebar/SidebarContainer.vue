<template>
  <aside class="sidebar">
    <SidebarSection title="홈" :items="homeMenu"/>
<!--    <SidebarSection title="라이브러리" :items="libraryMenu"/>-->
    <SidebarSection title="구독" :items="subscriptionMenu" isChannel/>
    <!-- <SidebarSection title="더보기" :items="moreMenu" /> -->
  </aside>
</template>

<script setup>
import SidebarSection from './SidebarSection.vue'

const homeMenu = [
  {icon: 'fas fa-home', label: '홈', active: true},
  // { icon: 'fas fa-fire', label: '인기' },
  {icon: 'fas fa-list', label: '재생목록', path: '/my-playlists'},
  {icon: 'fas fa-users', label: 'Together'},
]

// const libraryMenu = [
  // { icon: 'fas fa-history', label: '시청 기록' },
  // { icon: 'fas fa-clock', label: '나중에 볼 영상' },
  // { icon: 'fas fa-thumbs-up', label: '좋아요 표시한 동영상' },
  // {icon: 'fas fa-list', label: '재생목록', path: '/my-playlists'},
// ]

const subscriptionMenu = [
  {img: 'https://via.placeholder.com/24', label: '크리에이티브 채널'},
  {img: 'https://via.placeholder.com/24', label: '테크 리뷰'},
  {img: 'https://via.placeholder.com/24', label: '게임스트리머'},
  {img: 'https://via.placeholder.com/24', label: '요리채널'},
]

const moreMenu = [
  {icon: 'fas fa-cog', label: '설정'},
  {icon: 'fas fa-question-circle', label: '고객센터'},
  {icon: 'fas fa-flag', label: '신고'},
]
</script>

<style scoped>
.sidebar {
  margin: 0;
  width: 17rem;
  background-color: var(--background-color);
  padding: var(--spacing-md);
  height: calc(100vh - 70px);
  overflow-y: auto;
  position: relative;
  top: 70px;
}
</style>