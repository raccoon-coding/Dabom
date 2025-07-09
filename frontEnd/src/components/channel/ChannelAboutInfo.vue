<script setup>
import ChannelAboutStats from './ChannelAboutStats.vue';


</script>

<template>
 <div class="about-section">
    <h3>채널 소개</h3>
    <p>
      크리에이티브 채널은 DaBom 플랫폼에서 창작과 영감을 나누는 공간입니다.
      우리는 기존의 스트리밍 서비스와는 다른 혁신적인 기능들을 통해
      창작자와 시청자가 더 깊이 소통할 수 있는 방법을 제시합니다.
    </p>

    <h4>채널 소개</h4>
    <ul>
      <li>DaBom 플랫폼 사용법 및 가이드</li>
      <li>Together 모드 활용 팁</li>
      <li>별점 시스템 소개</li>
      <li>창작자-시청자 소통 방법</li>
      <li>플랫폼 업데이트 소식</li>
    </ul>

    <h3>연락처</h3>
    <div class="contact-info">
      <p><i class="fas fa-envelope"></i> creative@dabom.com</p>
      <p><i class="fas fa-globe"></i> www.creative-channel.dabom</p>
      <div class="social-links">
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-instagram"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
  <!-- <div class="stat-div">
    <h2 class="stat">통계</h2>
    <ChannelAboutStats />
  </div>   -->
</template>

<style scoped>
.stat-div {
  margin-left: 3%;
  margin-right: 3%;
  padding: 2rem;
  color: #e5eaee;
}

.about-section {
  margin-top: 5%;
  background: #2e2e2e;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  color: #e5eaee;
}

.about-section h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fa5500;
  margin-bottom: 1rem;
}
.about-section h4 {
  color: #fa5500;
  font-size: 1.1rem;
  margin: 1.2rem 0 0.4rem 0;
  font-weight: 600;
}
.about-section p {
  font-size: 1.03rem;
  line-height: 1.6;
  color: #e5eaee;
  margin-bottom: 1.1rem;
}
.about-section ul {
  padding-left: 1.2rem;
  margin-bottom: 1.5rem;
}
.about-section li {
  margin-bottom: 0.4rem;
  color: #fff9f3;
  line-height: 1.7;
}
.contact-info p {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 0.3rem;
}
.contact-info i {
  color: #fa5500;
  font-size: 1.1rem;
  width: 22px;
}
.social-links {
  margin-top: 0.8rem;
}
.social-links a {
  margin-right: 1rem;
  color: #fa5500;
  font-size: 1.4rem;
  transition: color 0.2s;
}
.social-links a:hover {
  color: #ff9740;
}
@media (max-width: 600px) {
  .about-section { padding: 1rem; font-size: 0.97rem; }
}
</style>