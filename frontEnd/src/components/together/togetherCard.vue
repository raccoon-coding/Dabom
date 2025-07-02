<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
// defineProps({
//     title: String,
//     host: String,
//     togetherUrl: String
// })

// 방 참가하기 버튼 클릭 시 실행될 함수
const joinRoom = () => {
  // props로 받은 URL로 이동
  if (true) {
    router.push({ name: 'TogetherRoom', params: {id: 12}})
  } else {
    console.log('URL이 제공되지 않았습니다.')
  }
}
</script>

<template>
  <div class="room-card" @click="joinRoom">
    <div class="room-thumbnail">
      <img src="https://via.placeholder.com/320x180" alt="동영상 썸네일" />
      <div class="room-status">
        <span class="live-indicator">LIVE</span>
        <span class="participant-count">
          <i class="fas fa-users"></i>
          2/6
        </span>
      </div>
      <div class="video-duration">8:45</div>
    </div>
    <div class="room-info">
      <h4 class="room-title">Together 모드 사용법 스터디</h4>
      <p class="room-host">
        <i class="fas fa-crown"></i>
        테크리뷰
      </p>
      <div class="room-meta">
        <span class="room-type">
          <i class="fas fa-lock"></i>
          친구만
        </span>
        <span class="room-created">1시간 전 생성</span>
      </div>
      <div class="room-participants">
        <div class="participant-avatars">
          <img src="https://via.placeholder.com/30x30" alt="참가자" class="participant-avatar" />
          <img src="https://via.placeholder.com/30x30" alt="참가자" class="participant-avatar" />
        </div>
      </div>
      <button class="btn-join-room" data-room-id="2"  @click="joinRoom">
        <i class="fas fa-sign-in-alt"></i>
        방 참가하기
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/together/TogetherCard.css);
</style>
