<script setup>
import Message from '@/components/together_room/TogetherRoomChatMessage.vue'
import ModalCloseButton from '@/components/together_room/ModalCloseButton.vue'
import settingBtn from "@/components/together_room/SettingBtn.vue"

const emits = defineEmits(['close_modal', 'open_master_modal'])

const closeChatModal = () => {
    emits('close_modal')
}

const openMasterModal = () => {
    emits('open_master_modal')
}

</script>

<template>
    <div class="chat-sidebar" id="chatSidebar">
        <div class="chat-header">
            <div class="chat-title">채팅</div>
            <div class="online-count">
                <i class="fas fa-circle"></i>
                5명 온라인
            </div>
            <div>
                <span @click="openMasterModal"><settingBtn /></span>
            <ModalCloseButton @close_modal="closeChatModal()"/>
            </div>
        </div>

        <div class="chat-messages" id="chatMessages">
            <Message v-for="i in 10" />
        </div>

        <div class="chat-input-container">
            <div class="chat-input-wrapper">
                <input type="text" class="chat-input" id="chatInput" placeholder="메시지를 입력하세요..." maxlength="200">
                <button class="send-btn" id="sendBtn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherRoomChat.css);
</style>