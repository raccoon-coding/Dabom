<script setup>
const props = defineProps({
  isActive: Boolean
})

import { reactive } from 'vue'
import api from '@/api/channel' // 실제 api 경로에 맞게!


const playlist = reactive([
  {
    id: 1,
    thumbnail: 'https://via.placeholder.com/80x50',
    title: 'DaBom 완전 정복',
    content: 'DaBom 시리즈',
    videoCount: 12,
  },
  // ... 더 많은 항목
])


</script>
<template>
  <section id="section-playlists" class="dashboard-section" :class="{ active: isActive }">
    <h2>플레이리스트 관리</h2>
    <button class="btn-create"><i class="fas fa-plus"></i> 플레이리스트 추가</button>
    <div class="playlist-table-area">
      <table class="playlist-table">
        <thead>
          <tr>
            <th>썸네일</th>
            <th>제목</th>
            <th>영상 수</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="https://via.placeholder.com/80x50" alt="썸네일"></td>
            <form @submit.prevent="onSubmit"></form> 
            <td>
              <input type="text" v-model="playlist.title" placeholder="DaBom 완전 정복">
              <div class="edit-meta">설명: <input type="text" v-model="playlist.content" placeholder="DaBom 시리즈"></div>
            </td>
            <td>
              <span class="video-count">{{ playlist.videoCount }}</span>
              <button class="btn-list-edit"><i class="fas fa-edit"></i></button>

              <button class="btn-list-delete"><i class="fas fa-trash"></i></button>
            </td>
            <td>
              <button class="btn-video-manage">영상 편집/순서 변경</button>
            </td>
          </tr>


          <!-- 추가 샘플 -->
          <!-- <tr>
            <td><img src="https://via.placeholder.com/80x50" alt="썸네일"></td>
            <td>
              <input type="text" placeholder="Together 모드 활용">
              <div class="edit-meta">설명: <input type="text" placeholder="함께 보기 가이드"></div>
            </td>
            <td>
              <span class="video-count">8</span>
              <button class="btn-list-edit"><i class="fas fa-edit"></i></button>
              <button class="btn-list-delete"><i class="fas fa-trash"></i></button>
            </td>
            <td>
              <button class="btn-video-manage">영상 편집/순서 변경</button>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </section>
</template>





<style scoped>
@import url(@/assets/channel/mychannel);
</style>