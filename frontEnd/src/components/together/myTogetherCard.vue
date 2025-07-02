<script setup></script>

<template>
  <div class="my-room-item">
    <div class="room-info">
      <h4>DaBom 신기능 체험방</h4>
      <p>비공개 방 • 3/8명 참가중</p>
      <span class="room-code">
        초대 코드: <strong>ABC123</strong>
        <button class="btn-copy-code" data-code="ABC123">
          <i class="fas fa-copy"></i>
        </button>
      </span>
    </div>
    <div class="room-actions">
      <button class="btn-manage">
        <i class="fas fa-cog"></i>
        관리
      </button>
      <button class="btn-enter">
        <i class="fas fa-sign-in-alt"></i>
        입장
      </button>
      <button class="btn-delete">
        <i class="fas fa-trash"></i>
        삭제
      </button>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/together/MyTogetherCard.css);
</style>
