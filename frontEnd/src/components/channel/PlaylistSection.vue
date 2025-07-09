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
            <td>
              <input type="text" placeholder="DaBom 완전 정복">
              <div class="edit-meta">설명: <input type="text" placeholder="DaBom 시리즈"></div>
            </td>
            <td>
              <span class="video-count">12</span>
              <button class="btn-list-edit"><i class="fas fa-edit"></i></button>
              <button class="btn-list-delete"><i class="fas fa-trash"></i></button>
            </td>
            <td>
              <button class="btn-video-manage">영상 편집/순서 변경</button>
            </td>
          </tr>
          <!-- 추가 샘플 -->
          <tr>
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
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>


<script setup>
const props = defineProps({
  isActive: Boolean
})
</script>


<style scoped>
@import url(@/assets/channel/mychannel);
</style>