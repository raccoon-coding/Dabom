<script setup>
import ChatHeader from './ChatHeader.vue'
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'

const props = defineProps({
  currentChat: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['send-message'])

function handleSendMessage(messageText) {
  emit('send-message', messageText)
}
</script>

<template>
<div class="chat-window" v-if="currentChat">
    <ChatHeader :chat="currentChat" />
    <MessageList
      :room-idx="currentChat.idx"
      :chat-avatar="currentChat.avatar"
    />
    <MessageInput @send-message="handleSendMessage" />
  </div>
</template>

<style scoped>
@import url(../../assets/Message/ChatWindow.css);

</style>