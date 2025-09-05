<script setup>
import { ref } from 'vue'
import StarRating from '@/components/common/StarRating.vue' // StarRating 컴포넌트 임포트
import PlaylistAddModal from './PlaylistAddModal.vue'
import api from '@/api/chat'
import useMemberStore from '@/stores/useMemberStore'
import Modal from '@/components/main/Modal.vue'
import { useRouter } from 'vue-router'

const props = defineProps(['videoInfo'])
const router = useRouter()
const memberStore = useMemberStore()

// videoRating은 StarRating 컴포넌트의 v-model과 연결됩니다.
const videoRating = ref(0) // 초기값은 0 또는 videoInfo에서 가져올 수 있음

const showPlaylistModal = ref(false) // 모달 표시 상태를 관리할 변수

const showChatModal = ref(false)
const showLoginModal = ref(false)

const createChatRoom = async () => {
  if (!memberStore.checkLogin()) {
    showLoginModal.value=true
    return
  }

  const videoIdx = props.videoInfo.idx
  console.log('채널장 idx', props.videoInfo.idx)

  try {
    const chatRoomId = await api.createChatRoom(videoIdx)
    console.log(chatRoomId)
    showChatModal.value = true
  } catch (error) {
    console.error('채팅방 생성 실패:', error)
    alert('채팅방 생성에 실패했습니다.')
  }
}

const navigateToChatRoom = () => {
  showChatModal.value = false // 모달을 닫습니다.
  router.push({ name: 'message' });
}
</script>

<template>
  <!-- 영상 정보 및 채널 정보 영역 -->
  <div class="video-main-info">
    <!-- 제목 + 버튼 한 줄 배치 -->
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px">
      <h1 class="video-title" style="margin: 0">
        {{ props.videoInfo.description }}
      </h1>
      <div class="channel-actions" style="display: flex; gap: 8px">
        <!-- <button class="btn btn-subscribe">{{ props.videoInfo.isSubscribed ? '구독중' : '구독' }}</button> -->
        <button class="btn btn-subscribe">구독중</button>

        <button class="action-btn" @click="createChatRoom()">
          <i class="fa-solid fa-envelope"></i>
          메시지
        </button>
      </div>
    </div>

    <div class="channel-row">
      <div class="channel-info-vertical">
        <span class="channel-name">{{ props.videoInfo.channel?.name }}</span>
        <span class="subscriber-count">구독자 {{ props.videoInfo.Subscribers }}명</span>
      </div>
      <div class="channel-buttons">
        <button class="action-btn together-btn" id="togetherBtn">
          <i class="fas fa-users"></i>Together 모드
        </button>
        <button class="action-btn share-btn"><i class="fas fa-share"></i>공유</button>
        <button class="action-btn playlist-btn" @click="showPlaylistModal = true">
          <i class="fas fa-plus"></i>플레이리스트에 추가
        </button>
      </div>
    </div>

    <!-- Together 모드 패널 (기능 구현 시 사용) -->
    <div class="together-panel" id="togetherPanel" style="display: none">
      <!-- ... Together 모드 관련 UI ... -->
    </div>
  </div>

  <!-- 별점 평가 시스템 -->
  <div class="rating-row">
    <span class="current-rating"
      >조회수 {{ props.videoInfo.views }}회 • 평균 {{ videoRating.toFixed(1) }}점</span
    >
    <div class="rating-right">
      <span class="rating-label">이 영상을 평가해주세요:</span>
      <div class="star-rating-interactive">
        <StarRating v-model="videoRating" :video-info="props.videoInfo" />
      </div>
    </div>
  </div>

  <!-- 플레이리스트 추가 모달 -->
  <PlaylistAddModal
    v-if="showPlaylistModal"
    :video-info="props.videoInfo"
    @close="showPlaylistModal = false"
  />
  <Modal
    v-if="showChatModal"
    title="채팅방 생성"
    message="채팅방이 생성되었습니다. 채팅 페이지로 이동합니다"
    @confirm="navigateToChatRoom"
  />
  <Modal
    v-if="showLoginModal"
    title="로그인이 필요합니다."
    message="채팅을 시작하려면 로그인해주세요."
    @confirm="showLoginModal = false"
  />
</template>

<style scoped>
@import url('@/assets/Video_Player/Video_Player.css');
.channel-buttons {
  padding: 0.5rem 0.5rem;
}
</style>
