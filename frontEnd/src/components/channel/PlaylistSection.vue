<script setup>
import { reactive } from 'vue'
import api from '@/api/channel' // 실제 api 경로 맞게

const props = defineProps({
  isActive: Boolean
})

const playlist = reactive([
  {
    id: 1,
    thumbnail: 'https://via.placeholder.com/80x50',
    title: 'DaBom 완전 정복',
    content: 'DaBom 시리즈',
    videoCount: 12,
  },
  
])

// 수정(저장) 버튼 - 각 행의 수정된 값 서버로 전송
const handleEdit = async (item) => {
  try {
    await api.updatePlaylistItem(item)
    alert('수정되었습니다!')
  } catch (e) {
    alert('수정 실패')
  }
}

// 삭제 버튼
const handleDelete = async (item) => {
  if (!confirm('정말 삭제하시겠습니까?')) return
  try {
    await api.deletePlaylistItem(item.id)
    // 삭제 성공 시 배열에서 제거
    const idx = playlist.findIndex(v => v.id === item.id)
    if (idx > -1) playlist.splice(idx, 1)
  } catch (e) {
    alert('삭제 실패')
  }
}

// (선택) 추가 버튼 - 실제 구현에 맞게 확장
const handleCreate = async () => {
  // 임시 새 항목 추가
  playlist.push({
    id: Date.now(),
    thumbnail: 'https://via.placeholder.com/80x50',
    title: '',
    content: '',
    videoCount: 0,
  })
}
</script>

<template>
  <section id="section-playlists" class="dashboard-section" :class="{ active: isActive }">
    <h2>플레이리스트 관리</h2>
    <button class="btn-create" @click="handleCreate">
      <i class="fas fa-plus"></i> 플레이리스트 추가
    </button>
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
          <tr v-for="item in playlist" :key="item.id">
            <td>
              <img :src="item.thumbnail" alt="썸네일">
            </td>
            <td>
              <input type="text" v-model="item.title" placeholder="DaBom 완전 정복">
              <div class="edit-meta">
                설명: <input type="text" v-model="item.content" placeholder="DaBom 시리즈">
              </div>
            </td>
            <td>
              <span class="video-count">{{ item.videoCount }}</span>
            </td>
            <td>
              <button class="btn-list-edit" @click="handleEdit(item)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-list-delete" @click="handleDelete(item)">
                <i class="fas fa-trash"></i>
              </button>
              <!-- 관리 등 다른 버튼 추가 가능 -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
@import url(@/assets/channel/mychannel);

</style>
