<script setup>
import MessageBubble from './MessageBubble.vue'
import TypingIndicator from './TypingIndicator.vue'

import { ref, onMounted, onUpdated, nextTick } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  },
  chatAvatar: {
    type: String,
    required: true
  },
  isTyping: {
    type: Boolean,
    default: false
  }
})

const messagesContainer = ref(null)

function scrollToBottom() {
  nextTick(() => {
    const container = messagesContainer.value
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

onMounted(scrollToBottom)
onUpdated(scrollToBottom)
</script>

<template>
  <div class="chat-messages" ref="messagesContainer">
    <MessageBubble
      v-for="message in props.messages"
      :key="message.id"
      :message="message"
      :chat-avatar="props.chatAvatar"
    />
    <TypingIndicator 
      v-if="props.isTyping"
      :chat-avatar="props.chatAvatar"
    />
  </div>
</template>
<style scoped>
@import url(../../assets/Message/MessageList.css);

</style>