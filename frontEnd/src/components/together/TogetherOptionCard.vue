<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/together'
import CreateTogetherModal from '@/components/together/CreateTogetherModal.vue'

const showModal = ref(false)
const joinRoomUrl = ''
const inviteCode = ref('') // 초대 코드 바인딩
const router = useRouter() // 라우터 인스턴스

const openCreateRoomModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const joinRoom = async () => {
  if (!inviteCode.value) {
    alert('초대 코드를 입력하세요.')
    return
  }
  const response = await api.joinTogetherWithCode(inviteCode.value)
  if(response.code !== 200) {
    console.error(error)
    alert('유효하지 않은 초대 코드이거나 서버 오류입니다.')
  } else {
    const roomId = response.data.togetherIdx
    window.location.href = `/together/${roomId}`
  }
}
</script>

<template>
  <div class="option-card">
    <div class="option-icon">
      <i class="fas fa-plus-circle"></i>
    </div>
    <div class="option-content">
      <h3>새 방 만들기</h3>
      <p>새로운 Together 방을 만들어 친구들을 초대하세요</p>
      <button class="btn-option" id="createRoomBtn" @click="openCreateRoomModal">
        <i class="fas fa-plus"></i>
        방 만들기
      </button>
    </div>
  </div>

  <div class="option-card">
    <div class="option-icon">
      <i class="fas fa-sign-in-alt"></i>
    </div>
    <div class="option-content">
      <h3>방 참가하기</h3>
      <p>초대 코드로 친구의 Together 방에 참가하세요</p>
      <div class="join-room-form">
        <input type="text" v-model="inviteCode" id="inviteCode" placeholder="초대 코드 입력" />
        <button class="btn-option" id="joinRoomBtn" @click="joinRoom">
          <i class="fas fa-sign-in-alt"></i>
          참가하기
        </button>
      </div>
    </div>
  </div>
  <!-- 모달 컴포넌트 조건부 렌더링 -->
  <CreateTogetherModal v-if="showModal" :visible="showModal" @close="closeModal" />
</template>

<style scoped>
@import url(@/assets/together/TogetherOptionCard.css);
</style>
