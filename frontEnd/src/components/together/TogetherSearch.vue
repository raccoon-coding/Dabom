<script setup>
import {ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const searchUrl = '';
const searchContext = ref('');
const route = useRoute()
const router = useRouter()

const requset = {data: null};

const search = async () => {
  router.push({ name: 'TogetherSearch', query: { q: searchContext.value } })
  if(!searchContext) {
    alert('검색어를 입력해주세요.')
    return
  }

  try {
    const response = await axios.get(searchUrl, {
      data: searchContext.value
    })

    request.data = response.data

    router.push({name: 'TogetherSearch', params: {context: request.data}})

  }
  catch(error) {
    console.error(error)
    alert('잘못된 검색어를 입력하셨거나, 서버 오류입니다. 잠시 뒤에 시도해주세요.')
  }
}

onMounted(() => { 
  console.log(route.query); 
  searchContext.value = route.query.q;
})
</script>

<template>
    <!--  Together Search -->
    <div class="together-search">
        <input type="text" v-model="searchContext" class="search-input" placeholder="Together 검색..." />
        <button class="search-btn" @click="search">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>

<style scoped>
@import url(../../assets/together/TogetherSearch.css);
</style>