<script setup>
import TogetherCard from '@/components/together/TogetherCard.vue'
import togetherSearch from '@/components/together/TogetherSearch.vue'
import api from '@/api/together'

import {ref, reactive, onMounted} from 'vue'
import { useRoute } from 'vue-router'

const searchContext = ref('');
const route = useRoute()
const togethers = reactive({
    togethers: []
})

const getSearchTogethers = async () => {
    const res = await api.getTogetherSearch(searchContext.value)
    // const res = await api.getRandomTogetherList()
    console.log(res)
    if(res.state_code === 200) {
        togethers.togethers.push(...res.data.togethers)
    } else {
        console.log("error");
    }
}

onMounted(() => { 
  searchContext.value = route.query.q;
  getSearchTogethers()
})
</script>

<template>
    <div class="together-container">
        <togetherSearch /> 
        <!-- Active Rooms -->
        <div class="active-rooms">
            <div class="section-header">
                <h2><i class="fas fa-fire"></i> 활성 Together 방</h2>
            </div>
            <!-- 더미 데이터 시작 -->
            <div class="rooms-grid">
                <together-card v-for="together in togethers.togethers" :together="together" />
            </div>
            <!-- 더미 데이터 종료 -->
        </div>
    </div>
</template>

<style scoped>
@import url('@/assets/together/Together.css');
@import url('@/assets/main/main.css');
</style>