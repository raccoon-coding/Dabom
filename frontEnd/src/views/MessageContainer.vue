<script setup>
import { ref, computed, onMounted } from 'vue'
import ChatList from '../components/Message/ChatList.vue'
import ChatWindow from '../components/Message/ChatWindow.vue'
import { getChatList } from '@/api/chat' // API 임포트
import useMemberStore from "@/stores/useMemberStore"; // 로그인 스토어 임포트

const memberStore = useMemberStore();

const currentChatId = ref('') // 초기 선택 없음
const chatData = ref({}) // API로부터 받을 데이터 (초기값 비어있음)

// 백엔드에서 받은 데이터를 컴포넌트가 쓰기 좋은 형태로 변환하는 함수
function transformChatListData(backendList, currentMemberIdx) {
  const transformed = {};
  if (!backendList) return transformed;

  backendList.forEach(item => {
    // 백엔드 데이터에서 상대방 정보만 추출
    const opponent = item.member1Idx === currentMemberIdx
      ? { name: item.member2Name, avatar: item.opponentProfileImg }
      : { name: item.member1Name, avatar: item.opponentProfileImg };

    // ChatItem.vue 컴포넌트가 요구하는 최종 형태로 조립
    transformed[item.idx] = {
      name: opponent.name,
      avatar: opponent.avatar ? `http://localhost:8080${opponent.avatar}` : 'https://via.placeholder.com/50x50', // 기본 이미지
      lastMessage: item.lastMessage || '대화를 시작해보세요.',
      time: item.lastMessageTime ? new Date(item.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      unreadCount: item.unreadCount,
      isOnline: false, // isOnline 정보는 현재 백엔드에서 제공하지 않음
      messages: [] // 메시지 목록은 ChatWindow에서 별도로 로드
    };
  });
  return transformed;
}

onMounted(async () => {
  const currentMemberIdx = parseInt(localStorage.getItem('memberIdx'));
  const rawChatList = await getChatList(); // 백엔드 API 호출
  chatData.value = transformChatListData(rawChatList, currentMemberIdx);

  // 첫 번째 채팅방을 기본으로 선택
  if (rawChatList && rawChatList.length > 0) {
    currentChatId.value = rawChatList[0].idx.toString();
  }
});

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