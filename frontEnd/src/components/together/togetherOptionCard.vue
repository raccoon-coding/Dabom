<script setup></script>

<template>
  <div class="option-card">
    <div class="option-icon">
      <i class="fas fa-plus-circle"></i>
    </div>
    <div class="option-content">
      <h3>새 방 만들기</h3>
      <p>새로운 Together 방을 만들어 친구들을 초대하세요</p>
      <button class="btn-option" id="createRoomBtn">
        <i class="fas fa-plus"></i>
        방 만들기
      </button>
    </div>
  </div>

  <div class="option-card">
    <div class="option-icon">
      <i class="fas fa-sign-in-alt"></i>
    </div>
    <div class="option-content">
      <h3>방 참가하기</h3>
      <p>초대 코드로 친구의 Together 방에 참가하세요</p>
      <div class="join-room-form">
        <input type="text" id="inviteCode" placeholder="초대 코드 입력" maxlength="8" />
        <button class="btn-option" id="joinRoomBtn">
          <i class="fas fa-sign-in-alt"></i>
          참가하기
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/together/togetherOptionCard.css);
</style>
