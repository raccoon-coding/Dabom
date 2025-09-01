<script setup>
import { ref, computed, onMounted } from 'vue'
import ChatList from '../components/Message/ChatList.vue'
import ChatWindow from '../components/Message/ChatWindow.vue'
import { getChatList } from '@/api/chat' // API 임포트
import useMemberStore from "@/stores/useMemberStore"; // 로그인 스토어 임포트

import { useChatStore } from '@/stores/useChatStore'; // Import the store

const memberStore = useMemberStore();
const chatStore = useChatStore(); // Initialize the store

const currentChatId = ref('') // 초기 선택 없음
const chatData = ref({}) // API로부터 받을 데이터 (초기값 비어있음)

// 백엔드에서 받은 데이터를 컴포넌트가 쓰기 좋은 형태로 변환하는 함수
function transformChatListData(backendList, currentMemberIdx) {
  const transformed = {};
  if (!backendList) return transformed;

  backendList.forEach(item => {
    // 백엔드 데이터에서 상대방 정보만 추출
    const opponent = item.member1Idx === currentMemberIdx
      ? { name: item.member2Name, avatar: item.opponentProfileImg, idx: item.member2Idx } // Add idx here
      : { name: item.member1Name, avatar: item.opponentProfileImg, idx: item.member1Idx }; // Add idx here

    // ChatItem.vue 컴포넌트가 요구하는 최종 형태로 조립
    transformed[item.idx] = {
      name: opponent.name, // <-- This sets the opponent's name
      avatar: opponent.avatar ? `http://localhost:8080${opponent.avatar}` : 'https://via.placeholder.com/50x50',
      recipientIdx: opponent.idx, // Add recipientIdx here
      lastMessage: item.lastMessage || '대화를 시작해보세요.',
      time: item.lastMessageTime ? new Date(item.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      unreadCount: item.unreadCount,
      isOnline: false,
      messages: [] // 메시지 목록은 ChatWindow에서 별도로 로드
    };
  });
  return transformed;
}

onMounted(async () => {
  const response = await getChatList(); // 백엔드 API 호출
  const rawChatList = response.chatRooms; // Access the chatRooms list
  const currentMemberIdx = response.currentMemberIdx; // Get currentMemberIdx from response

  // Find current member's name from the chat list
  let currentMemberName = null;
  if (rawChatList && rawChatList.length > 0) {
    const firstChat = rawChatList[0];
    if (firstChat.member1Idx === currentMemberIdx) {
      currentMemberName = firstChat.member1Name;
    } else if (firstChat.member2Idx === currentMemberIdx) {
      currentMemberName = firstChat.member2Name;
    }
  }

  // Set current member info in chat store
  if (currentMemberIdx && currentMemberName) {
    chatStore.setCurrentMember(currentMemberIdx, currentMemberName);
  } else {
    console.warn('MessageContainer: currentMemberIdx or currentMemberName not found in API response.');
  }

  chatData.value = transformChatListData(rawChatList, currentMemberIdx);

  // 첫 번째 채팅방을 기본으로 선택
  if (rawChatList && rawChatList.length > 0) {
    currentChatId.value = rawChatList[0].idx.toString();
    // Also set the current chat room in the store for the first selected chat
    const firstChat = chatData.value[currentChatId.value];
    if (firstChat && firstChat.recipientIdx) {
      chatStore.setCurrentChatRoom(parseInt(currentChatId.value), firstChat.recipientIdx);
    }
  }
});

const currentChat = computed(() => {
  return chatData.value[currentChatId.value] || null
})

function handleChatSelected(chatId) {
  currentChatId.value = chatId;
  const selectedChat = chatData.value[chatId];
  if (selectedChat && selectedChat.recipientIdx) {
    chatStore.setCurrentChatRoom(parseInt(chatId), selectedChat.recipientIdx);
  }
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
        :room-idx="currentChatId"
        @send-message="handleSendMessage"
      />
    </div>
  </div>



</template>

<style scoped>
/* @import url(../assets/main/main.css); */
@import url(../assets/Message/MessageContainer.css);
</style>