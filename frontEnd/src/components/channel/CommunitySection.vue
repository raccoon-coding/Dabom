<template>
  <section id="section-community" class="dashboard-section" :class="{ active: isActive }">
    <h2>커뮤니티 게시글 관리</h2>
    <button class="btn-create"><i class="fas fa-pen"></i> 새 게시글 작성</button>
    <div class="community-posts-manage">
      <div class="community-post-manage">
        <textarea>안녕하세요! 새로운 기능 피드백 부탁드려요 :)</textarea>
        <div class="community-actions">
          <button class="btn-edit"><i class="fas fa-edit"></i> 편집</button>
          <button class="btn-delete"><i class="fas fa-trash"></i> 삭제</button>
          <button class="btn-comment-manage"><i class="fas fa-comments"></i> 댓글 관리</button>
        </div>
      </div>
      <div class="community-post-manage">
        <textarea>별점 시스템에 대해 어떻게 생각하시나요?</textarea>
        <div class="community-actions">
          <button class="btn-edit"><i class="fas fa-edit"></i> 편집</button>
          <button class="btn-delete"><i class="fas fa-trash"></i> 삭제</button>
          <button class="btn-comment-manage"><i class="fas fa-comments"></i> 댓글 관리</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CommunitySection',
  props: {
    isActive: Boolean
  }
}
</script>
<style scoped>
@import url(@/assets/channel/mychannel);
</style>