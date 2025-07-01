<script setup></script>

<template>
  <div class="create-room-modal" id="createRoomModal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h3><i class="fas fa-plus"></i> Together 방 만들기</h3>
        <button class="modal-close" id="closeCreateRoom">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form class="create-room-form" id="createRoomForm">
        <div class="form-group">
          <label for="roomName">방 이름 *</label>
          <input
            type="text"
            id="roomName"
            required
            maxlength="50"
            placeholder="방 이름을 입력하세요"
          />
          <div class="char-count"><span id="roomNameCount">0</span>/50</div>
        </div>

        <div class="form-group">
          <label for="videoUrl">동영상 URL</label>
          <input
            type="url"
            id="videoUrl"
            placeholder="함께 볼 동영상 URL을 입력하세요 (선택사항)"
          />
          <div class="help-text">나중에 방에서 동영상을 선택할 수도 있습니다</div>
        </div>

        <div class="form-group">
          <label for="maxParticipants">최대 참가자 수 *</label>
          <input
            type="text"
            id="maxUser"
            placeholder="Together 최대 인원 수를 입력하세요.(추후에 수정 가능합니다.)"
          />
        </div>

        <div class="form-group">
          <label>방 공개 설정</label>
          <div class="radio-group">
            <label class="radio-item">
              <input type="radio" name="roomPrivacy" value="public" checked />
              <span class="radio-mark"></span>
              <div class="radio-content">
                <strong>공개 방</strong>
                <span>모든 사용자가 참가할 수 있습니다</span>
              </div>
            </label>
            <label class="radio-item">
              <input type="radio" name="roomPrivacy" value="friends" />
              <span class="radio-mark"></span>
              <div class="radio-content">
                <strong>비공개방</strong>
                <span>초대한 친구들만 참가할 수 있습니다</span>
              </div>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-cancel">취소</button>
          <button type="submit" class="btn-create">
            <i class="fas fa-plus"></i>
            방 만들기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/together/createTogetherModal.css);
</style>
