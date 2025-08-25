<script setup>
const props = defineProps(['sender', 'message', 'isJoin', 'date'])
</script>

<template>
  <div class="message" v-if="!props.isJoin">
    <div class="message-header">
      <div class="message-author">{{ props.sender }}</div>
      <div class="message-time">{{ props.date }}</div>
    </div>
    <div class="message-content">{{ props.message }}</div>
  </div>

  <div class="system-message" v-if="props.isJoin">{{props.sender}}님이 방에 입장했습니다.</div>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherRoomChatMessage.css);
</style>