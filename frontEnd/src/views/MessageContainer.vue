<script setup>
import { ref, computed, onMounted } from 'vue'
import ChatList from '../components/Message/ChatList.vue'
import ChatWindow from '../components/Message/ChatWindow.vue'
import { getChatList, getProfile } from '@/api/chat' // API 임포트
import useMemberStore from "@/stores/useMemberStore"; // 로그인 스토어 임포트
import { useChatStore } from '@/stores/useChatStore'; // 채팅 스토어 임포트
import { useSocketStore } from '@/stores/socket'; // 소켓 스토어 임포트

const memberStore = useMemberStore();
const chatStore = useChatStore(); // Initialize the store
const socketStore = useSocketStore(); // 소켓 스토어 초기화

const currentChatId = ref('') // 초기 선택 없음
const chatData = ref({}) // API로부터 받을 데이터 (초기값 비어있음)
const newMessage = ref('') // 메시지 입력을 위한 ref 추가

// 백엔드에서 받은 데이터를 컴포넌트가 쓰기 좋은 형태로 변환하는 함수
async function transformChatListData(backendList, currentMemberIdx) {
  const transformed = {};
  if (!backendList) return transformed;

  const chatPromises = backendList.map(async (item) => {
    const opponent = item.member1Idx === currentMemberIdx
      ? { name: item.member2Name, idx: item.member2Idx } // Add idx here
      : { name: item.member1Name, idx: item.member1Idx }; // Add idx here

    let profileImgUrl = 'https://via.placeholder.com/50x50'; // Default placeholder
    try {
      const profileResponse = await getProfile(opponent.idx);
      if (profileResponse) {
        profileImgUrl = profileResponse;
      }
    } catch (error) {
      console.error(`Failed to fetch profile image for member ${opponent.idx}:`, error);
    }

    return {
      idx: item.idx,
      data: {
        name: opponent.name,
        avatar: profileImgUrl,
        recipientIdx: opponent.idx,
        recipientName: opponent.name,
        lastMessage: item.lastMessage || '대화를 시작해보세요.',
        time: item.lastMessageTime ? new Date(item.lastMessageTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        unreadCount: item.unreadCount,
        isOnline: false,
        messages: []
      }
    };
  });

  const results = await Promise.all(chatPromises);
  results.forEach(result => {
    transformed[result.idx] = result.data;
  });

  return transformed;
}

onMounted(async () => {
  // 1. 소켓 연결 시도
  socketStore.connect();

  // 2. 기존 채팅 목록 가져오기
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

  chatData.value = await transformChatListData(rawChatList, currentMemberIdx);

  // 첫 번째 채팅방을 기본으로 선택
  if (rawChatList && rawChatList.length > 0) {
    currentChatId.value = rawChatList[0].idx.toString();
    // Also set the current chat room in the store for the first selected chat
    const firstChat = chatData.value[currentChatId.value];
    if (firstChat && firstChat.recipientIdx && firstChat.recipientName) { // recipientName 조건 추가
      chatStore.setCurrentChatRoom(parseInt(currentChatId.value), firstChat.recipientIdx, firstChat.recipientName); // recipientName 전달
    }
  }
});

const currentChat = computed(() => {
  return chatData.value[currentChatId.value] || null
})

function handleChatSelected(chatId) {
  currentChatId.value = chatId;
  const selectedChat = chatData.value[chatId];
  if (selectedChat && selectedChat.recipientIdx && selectedChat.recipientName) { // recipientName 조건 추가
    chatStore.setCurrentChatRoom(parseInt(chatId), selectedChat.recipientIdx, selectedChat.recipientName); // recipientName 전달
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

  // 메시지 전송 로직 구현
  if (!messageText.trim()) return; // 빈 메시지 전송 방지

  // 현재 채팅방 정보가 스토어에 제대로 설정되어 있는지 확인
  if (!chatStore.currentRoomIdx || !chatStore.currentRecipientIdx || !chatStore.currentRecipientName) {
    console.error('채팅방 정보가 불완전하여 메시지를 보낼 수 없습니다.');
    return;
  }

  const messageDto = {
    roomIdx: chatStore.currentRoomIdx,
    senderIdx: chatStore.currentMemberIdx,
    senderName: chatStore.currentMemberName,
    recipientIdx: chatStore.currentRecipientIdx,
    recipientName: chatStore.currentRecipientName, // 스토어에서 가져온 상대방 이름
    message: messageText, // ChatWindow에서 전달받은 메시지 텍스트
    // 필요한 다른 필드 (예: createdAt, isRead 등)는 백엔드에서 처리하거나 추가
  };

  socketStore.sendMessage(messageDto);
  // 메시지 전송 후 입력 필드 초기화는 ChatWindow에서 담당할 수 있으므로 여기서는 생략
  // 또는 ChatWindow에서 @send-message 이벤트 발생 시 메시지 텍스트를 초기화하도록 구현
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