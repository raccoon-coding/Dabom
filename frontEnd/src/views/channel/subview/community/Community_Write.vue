<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import api from '@/api/community_write';

const title = ref('');
const content = ref('');
const imageUrl = ref(null);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
}

function triggerFileInput() {
  document.getElementById('imageUpload').click();
}

function submitPost() {
  // Implement post submission logic here
  console.log('Title:', title.value);
  console.log('Content:', content.value);
  console.log('Image URL:', imageUrl.value);
}

const writeForm = reactive({
    title: "",
    content: "",
    imageUrl: "",
    memberId: "",
    channelId: "",
    tags: [],
    category: ""
})

onMounted(async () => {
  const res = await api.playlist_show(writeForm)
  Object.assign(writeForm, res.writeForm)
}) 
</script>

<template>
    <div class="write-container">
        <h1>커뮤니티 글쓰기</h1>
        <form @submit.prevent="submitPost">
            <label for="title">제목</label>
            <input type="text" id="title" v-model="title" placeholder="제목을 입력하세요" />

            <label for="content">내용</label>
            <textarea id="content" v-model="content" rows="10" placeholder="내용을 입력하세요"></textarea>

            <input type="file" id="imageUpload" @change="handleImageUpload" accept="image/*" style="display: none;" />
            
            <div class="image-preview" v-if="imageUrl">
                <img :src="imageUrl" alt="Image preview" />
            </div>

            <div class="buttons">
                <button type="button" @click="triggerFileInput">이미지 추가</button>
                <button type="submit">등록</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
@import '@/assets/channel/community_write.css';
</style>
