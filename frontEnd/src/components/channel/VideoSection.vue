<template>
  <section id="section-videos" class="dashboard-section" :class="{ active: isActive }">
    <h2 >동영상 관리</h2>
    <button class="btn-upload"><i class="fas fa-upload"></i> 동영상 업로드</button>
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
              <input type="text" placeholder="플랫폼 완전 가이드">
            </div>
            <div class="field-group">
              <label>설명</label>
              <input type="text" placeholder="DaBom 플랫폼 사용법">
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
      <!-- 두번째 동영상 카드 -->
      <div class="video-card-manage">
        <div class="video-card-thumb">
          <img src="https://via.placeholder.com/140x90" alt="썸네일">
        </div>
        <div class="video-card-main">
          <div class="video-meta-fields">
            <label>제목
              <input type="text" placeholder="별점 시스템의 장점">
            </label>
            <label>설명
              <input type="text" placeholder="평가 시스템 소개">
            </label>
            <label>태그
              <input type="text" placeholder="#평가 #별점">
            </label>
          </div>
          <div class="video-meta-options">
            <span class="badge status-private">비공개</span>
            <span>2025-05-13</span>
            <select>
              <option>공개</option>
              <option selected>비공개</option>
            </select>
            <button class="btn-stat">상세</button>
          </div>
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

<script>
export default {
  name: 'VideoSection',
  props: {
    isActive: Boolean
  }
}
</script>
<style scoped>
@import url(@/assets/channel/mychannel);
</style>
