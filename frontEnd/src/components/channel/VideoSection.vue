<script setup> 
import { reactive } from 'vue';
import api from "@/api/channel"

const data = reactive({
  title: '',
  content: '',
  open: '',
  thumbnail_url: '',
  video_url: ''
})
const props = defineProps({
  isActive: Boolean
})

const uploadVideo = async(event) => {
  // 파일 업로드일 경우
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('video', file)
  const res = await api.uploadVideo(formData)
  data.video_url = res.video_url
  if (res.success) alert(res.message)
}

const uploadThumbnail = async(event) => {
   // 파일 업로드일 경우
   const file = event.target.files[0]
  const formData = new FormData()
  formData.append('video', file)
  const res = await api.uploadThumbnail(formData)
  data.video_url = res.video_url
  if (res.success) alert(res.message)
}

</script>
<template>
  <section id="section-videos" class="dashboard-section" :class="{ active: isActive }">
    <h2 >동영상 관리</h2>
    <h3>동영상 업로드</h3>
    <label for="upload-video" style="display: inline-block"> 
      <div class="div-upload"><i class="fas fa-upload"></i>동영상 업로드</div>
    </label>
    <input type="file" @change="uploadVideo" accept="video/*" name="upload-video" id="upload-video" style="display: none;">

    <h3>썸네일 업로드</h3>
    <label for="upload-image" style="display: inline-block"> 
      <div class="div-upload"><i class="fas fa-upload"></i>썸네일 업로드</div>
    </label>
    <input type="file" @change="uploadThumbnail" accept="image/*" name="upload-image" id="upload-image" style="display: none;">
      
    <div class="video-manage-list">
      <!-- 첫번째 동영상 카드 -->
      <div class="video-card-manage">
        <div class="video-card-thumb">
          <img src="https://via.placeholder.com/140x90" alt="썸네일">
        </div>
        <div class="video-card-main">
          <!-- 입력 필드 묶음 -->
          <div class="video-meta-fields">
            <div class="field-group">
              <label>제목</label>
              <input type="text" v-model="data.title" placeholder="플랫폼 완전 가이드">
            </div>
            <div class="field-group">
              <label>설명</label>
              <input type="text" v-model="data.content" placeholder="DaBom 플랫폼 사용법">
            </div>
            <div class="field-group">
              <label>태그</label>
              <input type="text" placeholder="#DaBom #가이드">
            </div>
          </div>


          <!-- 상태 등 옵션 -->
          <div class="video-meta-options">
            <span class="badge status-public">공개</span>
            <span class="upload-date">2025-06-22</span>
            <select>
              <option selected>공개</option>
              <option>비공개</option>
            </select>
            <button class="btn-stat">상세</button>
          </div>
          <!-- 액션 버튼 -->
          <div class="video-card-actions">
            <button class="btn-edit"><i class="fas fa-edit"></i> 수정</button>
            <button class="btn-delete"><i class="fas fa-trash"></i> 삭제</button>
          </div>
        </div>
      </div>
      <!-- 필요시 더 추가 -->
    </div>
  </section>
</template>


<style scoped>
@import url(@/assets/channel/mychannel);
</style>
