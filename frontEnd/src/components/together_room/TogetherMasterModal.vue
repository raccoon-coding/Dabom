<script setup>
import Item from "@/components/together_room/TogetherMasterModalItem.vue"
import ModalCloseButton from "@/components/together_room/ModalCloseButton.vue"

const emits = defineEmits(['close_modal'])

const closeMasterModal = () => {
    emits('close_modal')
}
</script>

<template>
    <div class="modal-overlay" id="masterModal" @click="closeMasterModal()">
        <div class="modal" @click.stop>
            <div class="modal-header">
                <h3 class="modal-title">마스터 관리</h3>
                <ModalCloseButton @close_modal="closeMasterModal()" />
            </div>
            <div class="modal-content">
                <div class="participant-list" id="participantList">
                    <Item></Item>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherMasterModal.css);
</style>