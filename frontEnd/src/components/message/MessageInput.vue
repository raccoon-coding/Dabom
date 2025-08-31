<script setup>
import { ref, nextTick } from 'vue';

const messageText = ref('');
const textarea = ref(null);

const emit = defineEmits(['send-message', 'attach', 'image', 'voice']);

function handleInput() {
  // 자동 높이 조절
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = Math.min(textarea.value.scrollHeight, 120) + 'px';
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey && messageText.value.trim()) {
    e.preventDefault();
    sendMessage();
  }
}

function sendMessage() {
  if (!messageText.value.trim()) return;

  emit('send-message', messageText.value.trim());
  messageText.value = '';

  // 높이 리셋
  nextTick(() => {
    if (textarea.value) {
      textarea.value.style.height = 'auto';
    }
  });
}

function handleAttach() {
  emit('attach');
}

function handleImage() {
  emit('image');
}

function handleVoice() {
  emit('voice');
}
</script>

<template>
<div class="message-input-container">
    <div class="message-input-wrapper">
      <div class="input-actions">
        <button class="input-btn" @click="handleAttach">
          <i class="fas fa-plus"></i>
        </button>
        <button class="input-btn" @click="handleImage">
          <i class="fas fa-image"></i>
        </button>
        <button class="input-btn" @click="handleVoice">
          <i class="fas fa-microphone"></i>
        </button>
      </div>
      <div class="message-input-area">
        <textarea 
          class="message-input" 
          placeholder="메시지 입력..." 
          rows="1"
          v-model="messageText"
          @input="handleInput"
          @keydown="handleKeydown"
          ref="textarea"
        ></textarea>
        <button 
          class="send-btn" 
          :disabled="!messageText.trim()"
          @click="sendMessage"
        >
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/Message/MessageInput.css);

</style>