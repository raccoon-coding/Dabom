<script setup>
import Message from '@/components/together_room/TogetherRoomChatMessage.vue'
import ModalCloseButton from '@/components/together_room/ModalCloseButton.vue'
import settingBtn from "@/components/together_room/SettingBtn.vue"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const togetherIdx = ref("")
const writeMessage = ref("")
const props = defineProps(['isMaster', 'socket', 'messages', 'joinMember'])
const emits = defineEmits(['close_modal', 'open_master_modal'])

const sendMessage = () => {
  console.log(writeMessage.value)
  props.socket.send(`/app/together/${togetherIdx.value}`, {}, writeMessage.value);
  writeMessage.value = ""
}

const closeChatModal = () => {
    emits('close_modal')
}

const openMasterModal = () => {
    emits('open_master_modal')
}
onMounted(() => {
  togetherIdx.value = route.params.id;
})
</script>

<template>
    <div class="chat-sidebar" id="chatSidebar">
        <div class="chat-header">
            <div class="chat-title">채팅</div>
            <div class="online-count">
                <i class="fas fa-circle"></i>
                {{props.joinMember}}명 온라인
            </div>
            <div>
                <span v-if="props.isMaster" @click="openMasterModal"><settingBtn /></span>
            <ModalCloseButton @close_modal="closeChatModal()"/>
            </div>
        </div>

        <div class="chat-messages" id="chatMessages">
          <Message
            v-for="msg in props.messages"
            :sender="msg.name"
            :message="msg.message"
            :isJoin="msg.isJoin"
            :date="msg.now"
          />
<!--            <Message v-for="i in 10" />-->
        </div>

        <div class="chat-input-container">
            <div class="chat-input-wrapper">
                <input type="text" class="chat-input" id="chatInput" v-model="writeMessage" placeholder="메시지를 입력하세요..." maxlength="200"  @keyup.enter="sendMessage">
                <button class="send-btn" id="sendBtn" @click="sendMessage">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherRoomChat.css);
</style>