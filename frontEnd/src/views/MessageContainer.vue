<script setup>
import { ref, computed, onMounted } from 'vue'
import ChatList from '../components/Message/ChatList.vue'
import ChatWindow from '../components/Message/ChatWindow.vue'
import Login from "@/stores/useMemberStore";
import { useRouter } from 'vue-router'

const loginStore = Login();
onMounted(() => {
  // 로그인 상태 확인
  if (!loginStore.checkLogin) {
    const router = useRouter();
    router.push('/login');
  }
  else {
    console.log("로그인 상태입니다.");
  }
});


const currentChatId = ref('1')
const chatData = ref({
  1: {
    name: "Alice Johnson",
    avatar: "https://via.placeholder.com/50x50/2ed573/ffffff?text=A",
    status: "온라인",
    lastMessage: "안녕하세요! 어떻게 지내세요?",
    time: "2분 전",
    unreadCount: 3,
    isOnline: true,
    messages: [
      { id: 1, sender: "Alice", content: "안녕하세요! 어떻게 지내세요?", time: "오후 2:30", sent: false },
      { id: 2, sender: "You", content: "안녕하세요! 저는 잘 지내고 있어요. 감사합니다!", time: "오후 2:32", sent: true },
      { id: 3, sender: "Alice", content: "그래서 좋네요! 오늘 날씨가 정말 좋아요 ☀️", time: "오후 2:33", sent: false },
      { id: 4, sender: "You", content: "맞아요! 산책하기 좋은 날씨네요", time: "오후 2:35", sent: true }
    ]
  },
  2: {
    name: "Bob Smith",
    avatar: "https://via.placeholder.com/50x50/007bff/ffffff?text=B",
    status: "30분 전 접속",
    lastMessage: "프로젝트 관련해서 얘기해요",
    time: "1시간 전",
    unreadCount: 0,
    isOnline: false,
    messages: [
      { id: 1, sender: "Bob", content: "프로젝트 관련해서 얘기해요", time: "오후 1:00", sent: false },
      { id: 2, sender: "You", content: "네, 어떤 부분인가요?", time: "오후 1:02", sent: true }
    ]
  },
  3: {
    name: "Carol Wilson",
    avatar: "https://via.placeholder.com/50x50/9c27b0/ffffff?text=C",
    status: "온라인",
    lastMessage: "사진 정말 멋져요! 👍",
    time: "3시간 전",
    unreadCount: 1,
    isOnline: true,
    messages: [
      { id: 1, sender: "You", content: "어제 찍은 사진이에요", time: "오전 11:00", sent: true },
      { id: 2, sender: "Carol", content: "사진 정말 멋져요! 👍", time: "오전 11:30", sent: false }
    ]
  },
  4: {
    name: "David Brown",
    avatar: "https://via.placeholder.com/50x50/ffa502/ffffff?text=D",
    status: "오프라인",
    lastMessage: "네, 내일 봬요",
    time: "어제",
    unreadCount: 0,
    isOnline: false,
    messages: []
  },
  5: {
    name: "Emma Davis",
    avatar: "https://via.placeholder.com/50x50/ff6b6b/ffffff?text=E",
    status: "오프라인",
    lastMessage: "감사합니다!",
    time: "2일 전",
    unreadCount: 0,
    isOnline: false,
    messages: []
  }
})

const currentChat = computed(() => {
  return chatData.value[currentChatId.value] || null
})

function handleChatSelected(chatId) {
  currentChatId.value = chatId
}

function handleSendMessage(messageText) {
  const chat = chatData.value[currentChatId.value]
  if (!chat) return

  const now = new Date()
  const time = now.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  chat.messages.push({
    id: chat.messages.length + 1,
    sender: "You",
    content: messageText,
    time: time,
    sent: true
  })
}
</script>

<template>
    <div class="main-content">
    <div class="messages-container">
      <ChatList 
        :chat-data="chatData" 
        :current-chat-id="currentChatId"
        @chat-selected="handleChatSelected"
      />
      <ChatWindow 
        :current-chat="currentChat"
        @send-message="handleSendMessage"
      />
    </div>
  </div>



</template>

<style scoped>
/* @import url(../assets/main/main.css); */
@import url(../assets/Message/MessageContainer.css);
</style>