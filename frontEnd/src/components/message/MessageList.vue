<script setup>
import { ref, onMounted, onUpdated, nextTick, watch } from 'vue';
import MessageBubble from './MessageBubble.vue';
import TypingIndicator from './TypingIndicator.vue';
import api from '@/api/chat';
import { useSocketStore } from '@/stores/socket'; // 스토어 임포트
import { useChatStore } from '@/stores/useChatStore'; // 스토어 임포트

const socketStore = useSocketStore(); // 스토어 사용
const chatStore = useChatStore(); // 스토어 사용

const props = defineProps({
  roomIdx: {
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
// const chatList = ref([]); // REMOVED: Messages are now in chatStore
const page = ref(0);
const size = ref(20);
const hasNext = ref(true);
const isLoading = ref(false);

// Watch for roomIdx changes to load new chat messages
watch(() => props.roomIdx, (newRoomIdx, oldRoomIdx) => {
  if (newRoomIdx && newRoomIdx !== oldRoomIdx) {
    resetAndLoadMessages();
  }
}, { immediate: true });

// Watch for new messages in the chat store to scroll down
watch(() => chatStore.messages.length, (newLength, oldLength) => {
  console.log('Watch triggered for chatStore.messages.length');
  console.log('newLength:', newLength, 'oldLength:', oldLength);
  if (newLength > oldLength) {
    console.log('New message added, attempting to scroll.');
    scrollToBottom();
  } else {
    console.log('Length not increased, no scroll.');
  }
}); // Removed { deep: true }



async function loadMoreMessages() {
  if (isLoading.value || !hasNext.value || !props.roomIdx) {
    return;
  }
  isLoading.value = true;
  try {
    const data = await api.getChatRoom(props.roomIdx, page.value, size.value);
    if (data.content && data.content[0]) {
      const newMessages = data.content[0].chatList.map((msg) => {
                     return {
                         id: msg.createdAt,
                         content: msg.message,
                         sender: msg.senderName,
                         sent: String(msg.senderIdx) === String(chatStore.currentMemberIdx),
                         time: new Date(msg.createdAt).toLocaleTimeString(),
                         isRead: msg.isRead,
                       };
                   });
      chatStore.setMessages([...newMessages, ...chatStore.messages]);
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
  chatStore.clearMessages();
  page.value = 0;
  hasNext.value = true;
  await loadMoreMessages();
  scrollToBottom();
}

function scrollToBottom() {
  nextTick(() => {
    const container = messagesContainer.value;
    if (container) {
      // Ensure the container is actually scrollable and has content
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop = container.scrollHeight;
        console.log('Scrolled to bottom. scrollHeight:', container.scrollHeight, 'scrollTop:', container.scrollTop);
      } else {
        console.log('Container not scrollable or no overflow. scrollHeight:', container.scrollHeight, 'clientHeight:', container.clientHeight);
      }
    } else {
      console.log('messagesContainer is null.');
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
    const container = messagesContainer.value;
    if (container && container.firstChild) {
      observer.observe(container.firstChild);
    } else {
      console.warn('IntersectionObserver: messagesContainer or its firstChild is null.');
    }
  });
}

onMounted(() => {
  socketStore.connect();
  setupIntersectionObserver();
  loadMoreMessages(); // Initial load
});


</script>

<template>
  <div class="chat-messages" ref="messagesContainer">
    <MessageBubble
      v-for="message in chatStore.messages"
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