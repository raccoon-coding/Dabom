<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  },
  chatAvatar: {
    type: String,
    required: true
  }
});

const avatarUrl = computed(() => props.chatAvatar.replace('50x50', '32x32'));
</script>

<template>
<div class="message" :class="{ sent: message.sent }">
    <div v-if="!message.sent" class="message-avatar">
      <img :src="avatarUrl" :alt="message.sender">
    </div>
    <div class="message-content-wrapper">
      <div class="message-content">{{ message.content }}</div>
      <div class="message-time">{{ message.time }}</div>
    </div>
    <div v-if="message.sent" class="message-avatar">
      <img src="https://via.placeholder.com/32x32/ff4757/ffffff?text=U" :alt="message.sender">
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/Message/MessageBubble.css);

</style>