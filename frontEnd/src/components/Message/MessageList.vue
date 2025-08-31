<script setup>
import { ref, onMounted, onUpdated, nextTick, watch } from 'vue';
import MessageBubble from './MessageBubble.vue';
import TypingIndicator from './TypingIndicator.vue';
import api from '@/api/chat';
import { useSocketStore } from '@/stores/socket'; // 스토어 임포트

const props = defineProps({
  roomIdx: { // Add roomIdx as a prop
    type: [String, Number],
    required: true,
  },
  chatAvatar: {
    type: String,
    required: true,
  },
  isTyping: {
    type: Boolean,
    default: false,
  },
});

const messagesContainer = ref(null);
const chatList = ref([]); // Initialize as empty, will be populated by loadMessages
const page = ref(0);
const size = ref(20);
const hasNext = ref(true);
const isLoading = ref(false);

const socketStore = useSocketStore(); // 스토어 사용

// Watch for roomIdx changes to load new chat messages
watch(() => props.roomIdx, (newRoomIdx, oldRoomIdx) => {
  if (newRoomIdx && newRoomIdx !== oldRoomIdx) {
    resetAndLoadMessages();
  }
}, { immediate: true }); // immediate: true to load messages on initial mount if roomIdx is present

// Watch for new messages from socket store
watch(() => socketStore.receivedMessages,
  (newMessages) => {
    if (newMessages.length > 0) {
      const latestMessage = newMessages[newMessages.length - 1];
      // Only add messages for the current room
      if (latestMessage.roomIdx == props.roomIdx) {
        chatList.value.push({
          id: latestMessage.createdAt,
          content: latestMessage.message,
          sender: latestMessage.senderName,
          sent: latestMessage.senderIdx === parseInt(localStorage.getItem('memberIdx')),
          time: new Date(latestMessage.createdAt).toLocaleTimeString(),
          isRead: latestMessage.isRead,
        });
        scrollToBottom(); // Scroll to bottom for new messages
      }
    }
  }, { deep: true });

async function loadMoreMessages() {
  if (isLoading.value || !hasNext.value || !props.roomIdx) return;
  isLoading.value = true;
  try {
    const data = await api.getChatRoom(props.roomIdx, page.value, size.value);
    if (data.content && data.content[0]) {
      const newMessages = data.content[0].chatList.map((msg) => ({
        id: msg.createdAt,
        content: msg.message,
        sender: msg.senderName,
        sent: msg.senderIdx === parseInt(localStorage.getItem('memberIdx')),
        time: new Date(msg.createdAt).toLocaleTimeString(),
        isRead: msg.isRead,
      }));
      chatList.value = [...newMessages, ...chatList.value]; // Add older messages to the top
      hasNext.value = data.hasNext;
      page.value += 1;
    }
  } catch (error) {
    console.error('Failed to load more messages:', error);
  } finally {
    isLoading.value = false;
  }
}

async function resetAndLoadMessages() {
  chatList.value = [];
  page.value = 0;
  hasNext.value = true;
  await loadMoreMessages();
  scrollToBottom();
}

function scrollToBottom() {
  nextTick(() => {
    const container = messagesContainer.value;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
}

function setupIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasNext.value) {
        loadMoreMessages();
      }
    },
    { threshold: 0.1 }
  );
  nextTick(() => {
    if (messagesContainer.value && messagesContainer.value.firstChild) {
      observer.observe(messagesContainer.value.firstChild);
    }
  });
}

onMounted(() => {
  socketStore.connect(); // Connect socket on mount
  setupIntersectionObserver();
});

// No need for onUpdated(scrollToBottom) as it's handled by watch for new messages and resetAndLoadMessages

</script>

<template>
  <div class="chat-messages" ref="messagesContainer">
    <MessageBubble
      v-for="message in chatList"
      :key="message.id"
      :message="message"
      :chat-avatar="props.chatAvatar"
    />
    <TypingIndicator v-if="props.isTyping" :chat-avatar="props.chatAvatar" />
  </div>
</template>

<style scoped>
@import url(../../assets/Message/MessageList.css);
</style>