<template>
  <section id="section-info" class="dashboard-section" :class="{ active: isActive }">
    <h2>채널 정보 수정</h2>
    <form class="channel-info-form">
      <label>
        채널 이름
        <input type="text" value="크리에이티브 채널">
      </label>
      <label>
        채널 설명
        <textarea rows="3">창작과 영감을 나누는 공간입니다.</textarea>
      </label>
      <label>
        채널 프로필 이미지
        <input type="file" accept="image/*">
      </label>
      <label>
        배너(커버) 이미지
        <input type="file" accept="image/*">
      </label>
      <label>
        연락처 이메일
        <input type="email" value="creative@dabom.com">
      </label>
      <label>
        소셜 링크
        <input type="text" value="https://twitter.com/dabom">
        <input type="text" value="https://instagram.com/dabom">
      </label>
      <button class="btn-save" type="submit"><i class="fas fa-save"></i> 저장</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'InfoSection',
  props: {
    isActive: Boolean
  }
}
</script>
<style scoped>
@import url(@/assets/channel/mychannel);
</style>