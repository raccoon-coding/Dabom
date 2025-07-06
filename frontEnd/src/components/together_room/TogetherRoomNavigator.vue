<script setup>
const emits = defineEmits(['open_chat_modal', 'close_chat_modal'])

const openChatModal = () => emits("open_chat_modal")
const closeChatModal = () => emits("close_chat_modal")
</script>

<template>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-controls">
                <button class="nav-btn" id="chatToggle" title="채팅" @click="openChatModal()">
                    <i class="fas fa-comments"></i>
                </button>
                <button class="nav-btn" id="settingsBtn" title="설정">
                    <i class="fas fa-cog"></i>
                </button>
                <button class="nav-btn" id="fullscreenBtn" title="전체화면">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
        </div>
    </nav>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherRoomNavigator.css);
</style>