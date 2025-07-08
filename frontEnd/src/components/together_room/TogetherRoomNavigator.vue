<script setup>
import settingBtn from '@/components/together_room/SettingBtn.vue'

const emits = defineEmits(['open_chat_modal', 'open_master_modal'])

const openChatModal = () => emits("open_chat_modal")
const openMasterModal = () => emits("open_master_modal")
</script>

<template>
    <div class="nav-container">
        <button class="nav-btn" id="chatToggle" title="채팅" @click="openChatModal()">
            <i class="fas fa-comments"></i>
        </button>
        <span @click="openMasterModal"><settingBtn /></span>
    </div>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherRoomNavigator.css);
</style>