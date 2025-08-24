<script setup>
import {useRoute} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import api from '@/api/together/'

const route = useRoute()
const props = defineProps(['member']);
const togetherIdx = ref('');
const memberInfo = reactive({
  isMaster: "",
  memberIdx: "",
  name: ""
})

const kickMember = async () => {
  await api.kickTogetherMember(togetherIdx, memberInfo.memberIdx)
}

const getMemberInfo = () => {
  const data = props.member
  memberInfo.name = data.name
  memberInfo.isMaster = data.isMaster
  memberInfo.memberIdx = data.memberIdx
}

onMounted(() => {
  togetherIdx.value = route.params.id;
  getMemberInfo()
  console.log(togetherIdx.value)
})
</script>

<template>
    <div class="participant-item">
        <div class="participant-info">
<!--            <div class="participant-avatar">김</div>-->
            <div class="participant-details">
                <div class="participant-name">{{memberInfo.name}}</div>
                <div class="participant-status" v-if="memberInfo.isMaster">방장</div>
                <div class="participant-status" v-if="!memberInfo.isMaster">온라인</div>
            </div>
        </div>
        <div class="master-badge" v-if="memberInfo.isMaster">마스터</div>
      <button class="kick-btn" v-if="!memberInfo.isMaster" @click="kickMember">강퇴</button>
    </div>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherMasterModalItem.css);
</style>