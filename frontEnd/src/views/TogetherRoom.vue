<script setup>
import TogetherMasterModal from '@/components/together_room/TogetherMasterModal.vue'
import TogetherRoomChat from '@/components/together_room/TogetherRoomChat.vue'
import TogetherRoomNavigator from '@/components/together_room/TogetherRoomNavigator.vue'
import Video_Player_Component from '@/components/Video_Player/Video_Player_Component.vue'

import Stomp from 'stompjs'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api/together/'

const socket = ref(null)
const message = reactive({
  messages: [],
})
const route = useRoute()
const togetherInfo = reactive({
  togetherIdx: '',
  title: '',
  maxMemberNum: '',
  joinMemberNumber: '',
  master: '',
  isOpen: '',
})
const stateModal = reactive({
  chatModal: false,
  masterModal: false,
})
const subscribed = ref(false)
const togetherIdx = ref('')
const isMaster = ref(false)
const joinMember = ref("")
const testUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

// api로 Master 확인 후, 데이터 내려주기
const getTogetherInfo = async () => {
  let res = await api.getTogetherInfo(togetherIdx.value)
  if (res.code === 200) {
    loadTogetherInfo(res.data)
  }
}

const getIsMaster = async () => {
  let res = await api.isMaster(togetherIdx.value)
  if (res.code === 200 && res.data.isMaster === true) {
    isMaster.value = true
  }
}

const loadTogetherInfo = (data) => {
  togetherInfo.togetherIdx = data.togetherIdx
  togetherInfo.isOpen = data.isOpen
  togetherInfo.title = data.title
  togetherInfo.master = data.master
  togetherInfo.maxMemberNum = data.maxMemberNum
  togetherInfo.joinMemberNumber = data.joinMemberNumber
}

const connectWebSocket = () => {
  const ws = new WebSocket('ws://localhost:8080/chat')
  const client = Stomp.over(ws)
  socket.value = client
  client.connect(
    {},
    (frame) => {
      console.log('연결 됐을 때 ')
      socket.value.subscribe(`/topic/together/${togetherIdx.value}`, (msg) => {
        try {
          const data = JSON.parse(msg.body)
          console.log(data)
          message.messages.push(data)
          if(data.users !== joinMember.value) {
            joinMember.value = data.users
          }
        } catch(e) {
          console.error("메시지 파싱 실패", e)
        }
      })
      subscribed.value = true
    },
    (err) => {
      console.error('연결 실패', err)
    },
  )
}

const openChatModal = () => {
  stateModal.chatModal = true
}

const closeChatModal = () => {
  stateModal.chatModal = false
}

const openMasterModal = () => {
  stateModal.masterModal = true
}

const closeMasterModal = () => {
  stateModal.masterModal = false
}
onMounted(() => {
  togetherIdx.value = route.params.id
  getTogetherInfo()
  getIsMaster()
  connectWebSocket()
})
</script>

<template>
  <TogetherRoomNavigator
    :isMaster="isMaster"
    @open_chat_modal="openChatModal()"
    @open_master_modal="openMasterModal()"
  />
  <!-- Main Content -->
  <div class="video-section" id="videoSection">
    <!-- Video Container -->
    <div class="video-container" :class="{ 'modal-open': stateModal.chatModal }">
      <div class="video-player">
        <Video_Player_Component :video_url="testUrl" :is_open_modal="stateModal.chatModal" />
      </div>
    </div>
  </div>
  <TogetherMasterModal
    v-if="stateModal.masterModal"
    @close_modal="closeMasterModal()"
  ></TogetherMasterModal>
  <TogetherRoomChat
    v-if="stateModal.chatModal && subscribed"
    :isMaster="isMaster"
    :socket="socket"
    :messages="message.messages"
    :joinMember="joinMember"
    @close_modal="closeChatModal()"
    @open_master_modal="openMasterModal"
  />
</template>

<style scoped>
/* 비디오 컨테이너 애니메이션 */
.video-container {
  width: 70%;
  height: 70%;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: 50% 50%;
  margin-left: 5.5rem;
}

/* 모달이 열릴 때 비디오 축소 효과 */
/* .video-container.modal-open {
    transform: translateX(-150px) scale(0.8) translateY(-83px);
    transform-origin: 50% 50%; /* Y축 중심점 유지 */
/* } */
</style>