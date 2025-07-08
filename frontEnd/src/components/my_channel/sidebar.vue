<script setup>

</script>

<template>
 <!-- Sidebar -->
 <aside class="dashboard-sidebar">
      <div class="profile-area">
        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20151026_112%2Firia__1445857574429PW33V_JPEG%2Fb016zruan8_09_pt01__sclzzzzzzz_aa400_.jpg&type=a340"
        class="dashboard-avatar" alt="채널 아바타">
        <div class="channel-owner">내 채널</div>
      </div>
      <button class="sidebar-btn active" data-section="videos"><i class="fas fa-video"></i> 동영상 관리</button>
      <button class="sidebar-btn" data-section="playlists"><i class="fas fa-list"></i> 플레이리스트 관리</button>
      <button class="sidebar-btn" data-section="community"><i class="fas fa-comments"></i> 커뮤니티 관리</button>
      <button class="sidebar-btn" data-section="info"><i class="fas fa-user-cog"></i> 채널 정보 수정</button>
    </aside>
</template>

<style scoped>
/* 사이드바 */
.dashboard-sidebar {
  width: 250px;
  background: var(--secondary-color);
  border-radius: var(--radius) 0 0 var(--radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 1rem 1rem;
  gap: 1.7rem;
  min-height: 720px;
  box-shadow: 2px 0 8px #0001;
}
.profile-area {
  text-align: center;
  margin-bottom: 1.5rem;
}
.dashboard-avatar {
  width: 80px; height: 80px; border-radius: 50%; border: 3px solid #fff3;
  margin-bottom: 0.7rem;
}
.channel-owner {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}
.sidebar-btn {
  width: 100%;
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 0.95rem 1rem;
  font-size: 1.07rem;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;
}
.sidebar-btn.active, .sidebar-btn:hover {
  background: var(--primary-color);
  color: #fff;
}

</style>