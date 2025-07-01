<script setup></script>

<template>
  <!-- =========================== 네비게이션 헤더 =========================== -->
  <header class="navbar">
    <div class="nav-container">
      <!-- 좌측 네비게이션: 로고 및 메인 메뉴 -->
      <div class="nav-left">
        <!-- 로고 영역 -->
        <div class="logo" onclick="location.href='URL.129';">
          <h1>DaBom</h1>
          <span class="logo-subtitle">함께하는 스트리밍</span>
        </div>

        <!-- 메인 네비게이션 메뉴 -->
        <nav class="nav-menu">
          <a href="URL.129" class="nav-item active">홈</a>
          <a href="URL.130" class="nav-item">채널</a>
          <a href="URL.131" class="nav-item">Together</a>
          <a href="URL.132" class="nav-item">blank</a>
          <a href="URL.133" class="nav-item">내 플레이리스트</a>
        </nav>
      </div>

      <!-- 우측 네비게이션: 사용자 액션 버튼들 -->
      <div class="nav-right">
        <!-- 업로드 버튼 -->
        <!-- <button class="nav-btn upload-btn" onclick="location.href='URL.135';">
                    <i class="fas fa-plus"></i>
                    업로드
                </button> -->

        <!-- 알림 버튼 (배지 포함) -->
        <button class="nav-btn notification-btn" onclick="location.href='URL.136';">
          <i class="fas fa-bell"></i>
          <span class="notification-badge">3</span>
        </button>

        <!-- 메시지 버튼 (배지 포함) -->
        <button class="nav-btn messages-btn" onclick="location.href='URL.137';">
          <i class="fas fa-envelope"></i>
          <span class="message-badge">2</span>
        </button>

        <!-- 사용자 프로필 및 드롭다운 -->
        <div class="user-profile">
          <img src="https://via.placeholder.com/40" alt="프로필" class="profile-img" />
          <div class="profile-dropdown">
            <a href="URL.138" class="dropdown-item">내 채널</a>
            <a href="URL.138" class="dropdown-item">설정</a>
            <a href="URL.138" class="dropdown-item">로그아웃</a>
          </div>
        </div>

        <!-- 모바일 메뉴 버튼 (추후 논의 예정) -->
        <button class="mobile-menu-btn">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import url("../../assets/main/header.css");
</style>
