<script setup>

</script>

<template>
  <!-- Channel Header -->
  <section class="channel-header">
                <div class="channel-banner">
                    <img src="https://ojsfile.ohmynews.com/STD_IMG_FILE/2018/0611/IE002348287_STD.jpg" alt="채널 배너"
                        class="banner-image">
                    <div class="banner-overlay"></div>
                </div>

                <div class="channel-info">
                    <div class="channel-avatar-container">
                        <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fcafefiles.naver.net%2F20151026_112%2Firia__1445857574429PW33V_JPEG%2Fb016zruan8_09_pt01__sclzzzzzzz_aa400_.jpg&type=a340"
                            alt="채널 아바타" class="channel-avatar-large">
                        <div class="live-indicator-large"></div>
                    </div>

                    <div class="channel-details">
                        <h1 class="channel-name">크리에이티브 채널</h1>
                        <div class="channel-stats">
                            <span class="subscriber-count">
                                <i class="fas fa-users"></i>
                                구독자 12.5만명
                            </span>
                            <span class="video-count">
                                <i class="fas fa-video"></i>
                                245개 동영상
                            </span>
                            <span class="view-count">
                                <i class="fas fa-eye"></i>
                                총 조회수 850만회
                            </span>
                        </div>
                        <p class="channel-description">
                            창작과 영감을 나누는 채널입니다. DaBom 플랫폼에서 여러분과 함께 새로운 콘텐츠를 만들어가고 있습니다.
                            별점 평가와 Together 모드를 통해 시청자 여러분과 더 깊이 소통하고 싶습니다.
                        </p>
                    </div>

                    <div class="channel-actions">
                        <button class="btn btn-subscribe">
                            <i class="fas fa-bell"></i>
                            구독
                        </button>
                        <button class="btn btn-message">
                            <i class="fas fa-envelope"></i>
                            메시지 보내기
                        </button>

                    </div>
                </div>
            </section>
</template>

<style scoped>
/* Channel Header */
.channel-header {
  position: relative;
  margin-bottom: 2rem;
}

.channel-banner {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 0 0 20px 20px;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);
}

.channel-info {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  margin-top: -80px;
  z-index: 2;
}

.channel-avatar-container {
  position: relative;
  flex-shrink: 0;
}

.channel-avatar-large {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.channel-details {
  flex: 1;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.channel-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.channel-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.channel-stats span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
}

.channel-stats i {
  color: var(--primary-color);
}

.channel-description {
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 1.5rem;
  opacity: 0.95;
}

.channel-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.btn-message {
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.btn-message:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>