<script setup>
import Item from "@/components/together_room/TogetherMasterModalItem.vue"
import ModalCloseButton from "@/components/together_room/ModalCloseButton.vue"
import api from '@/api/together/'
import {onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";
import MyTogetherCard from "@/components/together/MyTogetherCard.vue";

const emits = defineEmits(['close_modal'])
const route = useRoute()
const togetherIdx = ref('');
const members = reactive({
  members: []
})

const getMembers = async () => {
  let res = await api.getMembersByMaster(togetherIdx.value);
  if(res.code === 200) {
    console.log(res.data.members)
    members.members.push(...res.data.members)
  }
}

const closeMasterModal = () => {
    emits('close_modal')
}

onMounted(() => {
  togetherIdx.value = route.params.id;
  getMembers()
})
</script>

<template>
    <div class="modal-overlay" id="masterModal" @click="closeMasterModal">
        <div class="modal" @click.stop>
            <div class="modal-header">
                <h3 class="modal-title">마스터 관리</h3>
                <ModalCloseButton @close_modal="closeMasterModal" />
            </div>
            <div class="modal-content">
                <div class="participant-list" id="participantList">
                    <Item v-for="member in members.members" :member="member"></Item>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherMasterModal.css);
</style>