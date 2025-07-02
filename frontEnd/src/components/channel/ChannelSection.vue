<script setup>

</script>

<template>
  <!-- Content Sections -->
  <div class="channel-content">
                <!-- Videos Tab -->
                <section class="content-tab active" id="videos-tab">
                    <div class="tab-header">
                        <h2>업로드된 동영상</h2>
                        <div class="sort-controls">
                            <select class="sort-select">
                                <option value="recent">최신순</option>
                                <option value="popular">인기순</option>
                                <option value="rating">평점순</option>
                                <option value="oldest">오래된순</option>
                            </select>
                            <button class="view-toggle" id="gridViewBtn">
                                <i class="fas fa-th"></i>
                            </button>
                            <button class="view-toggle" id="listViewBtn">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>

                    <div class="videos-grid" id="videosContainer">
                        <div class="video-card">
                            <div class="video-thumbnail">
                                <img src="https://via.placeholder.com/300x200" alt="썸네일">
                                <div class="video-duration">12:34</div>
                                <div class="video-overlay">
                                    <button class="play-btn">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    <button class="together-btn">
                                        <i class="fas fa-users"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="video-info">
                                <h4 class="video-title">DaBom 플랫폼 완전 가이드</h4>
                                <div class="video-meta">
                                    <div class="star-rating">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <span class="rating-score">4.2</span>
                                    </div>
                                    <span class="view-count">12만 조회</span>
                                    <span class="upload-time">2일 전</span>
                                </div>
                            </div>
                        </div>

                        <div class="video-card">
                            <div class="video-thumbnail">
                                <img src="https://via.placeholder.com/300x200" alt="썸네일">
                                <div class="video-duration">8:45</div>
                                <div class="video-overlay">
                                    <button class="play-btn">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    <button class="together-btn">
                                        <i class="fas fa-users"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="video-info">
                                <h4 class="video-title">Together 모드 사용법</h4>
                                <div class="video-meta">
                                    <div class="star-rating">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <span class="rating-score">4.8</span>
                                    </div>
                                    <span class="view-count">5.2만 조회</span>
                                    <span class="upload-time">1주 전</span>
                                </div>
                            </div>
                        </div>

                        <div class="video-card">
                            <div class="video-thumbnail">
                                <img src="https://via.placeholder.com/300x200" alt="썸네일">
                                <div class="video-duration">15:22</div>
                                <div class="video-overlay">
                                    <button class="play-btn">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    <button class="together-btn">
                                        <i class="fas fa-users"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="video-info">
                                <h4 class="video-title">별점 시스템의 장점</h4>
                                <div class="video-meta">
                                    <div class="star-rating">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="far fa-star"></i>
                                        <span class="rating-score">4.5</span>
                                    </div>
                                    <span class="view-count">8.7만 조회</span>
                                    <span class="upload-time">2주 전</span>
                                </div>
                            </div>
                        </div>

                        <div class="video-card">
                            <div class="video-thumbnail">
                                <img src="https://via.placeholder.com/300x200" alt="썸네일">
                                <div class="video-duration">6:18</div>
                                <div class="video-overlay">
                                    <button class="play-btn">
                                        <i class="fas fa-play"></i>
                                    </button>
                                    <button class="together-btn">
                                        <i class="fas fa-users"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="video-info">
                                <h4 class="video-title">창작자와 시청자의 소통</h4>
                                <div class="video-meta">
                                    <div class="star-rating">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <span class="rating-score">4.9</span>
                                    </div>
                                    <span class="view-count">25만 조회</span>
                                    <span class="upload-time">1개월 전</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Playlists Tab -->
                <section class="content-tab" id="playlists-tab">
                    <div class="tab-header">
                        <h2>플레이리스트</h2>
                    </div>

                    <div class="playlists-grid">
                        <div class="playlist-card">
                            <div class="playlist-thumbnail">
                                <img src="https://via.placeholder.com/300x200" alt="플레이리스트">
                                <div class="playlist-count">
                                    <i class="fas fa-list"></i>
                                    12개 동영상
                                </div>
                            </div>
                            <div class="playlist-info">
                                <h4 class="playlist-title">DaBom 완전 정복</h4>
                                <p class="playlist-description">DaBom 플랫폼의 모든 기능을 설명하는 시리즈</p>
                                <div class="playlist-meta">
                                    <span class="view-count">총 조회수 45만회</span>
                                    <span class="last-updated">2일 전 업데이트</span>
                                </div>
                            </div>
                        </div>

                        <div class="playlist-card">
                            <div class="playlist-thumbnail">
                                <img src="https://via.placeholder.com/300x200" alt="플레이리스트">
                                <div class="playlist-count">
                                    <i class="fas fa-list"></i>
                                    8개 동영상
                                </div>
                            </div>
                            <div class="playlist-info">
                                <h4 class="playlist-title">Together 모드 활용법</h4>
                                <p class="playlist-description">친구들과 함께 영상을 보는 새로운 방법</p>
                                <div class="playlist-meta">
                                    <span class="view-count">총 조회수 28만회</span>
                                    <span class="last-updated">1주 전 업데이트</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Community Tab -->
                <section class="content-tab" id="community-tab">
                    <div class="tab-header">
                        <h2>커뮤니티</h2>
                    </div>

                    <div class="community-posts">
                        <div class="community-post">
                            <div class="post-header">
                                <div class="post-author">
                                    <img src="https://via.placeholder.com/40" alt="채널" class="author-avatar">
                                    <div class="author-info">
                                        <span class="author-name">크리에이티브 채널</span>
                                        <span class="post-time">3시간 전</span>
                                    </div>
                                </div>
                            </div>
                            <div class="post-content">
                                <p>안녕하세요! 새로운 Together 모드 업데이트에 대한 피드백을 받고 있습니다. 어떤 기능을 추가했으면 좋겠는지 댓글로 알려주세요! 🎉</p>
                                <div class="post-image">
                                    <img src="https://via.placeholder.com/500x300" alt="게시물 이미지">
                                </div>
                            </div>
                            <div class="post-actions">
                                <button class="post-action-btn like-btn">
                                    <i class="fas fa-heart"></i>
                                    124
                                </button>
                                <button class="post-action-btn comment-btn">
                                    <i class="fas fa-comment"></i>
                                    32
                                </button>

                            </div>
                        </div>

                        <div class="community-post">
                            <div class="post-header">
                                <div class="post-author">
                                    <img src="https://via.placeholder.com/40" alt="채널" class="author-avatar">
                                    <div class="author-info">
                                        <span class="author-name">크리에이티브 채널</span>
                                        <span class="post-time">1일 전</span>
                                    </div>
                                </div>
                            </div>
                            <div class="post-content">
                                <p>별점 시스템에 대한 여러분의 의견이 궁금합니다! 기존의 좋아요/싫어요와 비교해서 어떤 점이 더 유용하다고 생각하시나요?</p>
                            </div>
                            <div class="post-actions">
                                <button class="post-action-btn like-btn">
                                    <i class="fas fa-heart"></i>
                                    89
                                </button>
                                <button class="post-action-btn comment-btn">
                                    <i class="fas fa-comment"></i>
                                    45
                                </button>

                            </div>
                        </div>
                    </div>
                </section>

                <!-- About Tab -->
                <section class="content-tab" id="about-tab">
                    <div class="tab-header">
                        <h2>채널 정보</h2>
                    </div>

                    <div class="about-content">
                        <div class="about-section">
                            <h3>채널 소개</h3>
                            <p>크리에이티브 채널은 DaBom 플랫폼에서 창작과 영감을 나누는 공간입니다.
                                우리는 기존의 스트리밍 서비스와는 다른 혁신적인 기능들을 통해 창작자와 시청자가
                                더 깊이 소통할 수 있는 방법을 제시합니다.</p>

                            <h4>주요 콘텐츠</h4>
                            <ul>
                                <li>DaBom 플랫폼 사용법 및 가이드</li>
                                <li>Together 모드 활용 팁</li>
                                <li>별점 시스템 소개</li>
                                <li>창작자-시청자 소통 방법</li>
                                <li>플랫폼 업데이트 소식</li>
                            </ul>
                        </div>

                        <div class="about-section">
                            <h3>통계</h3>
                            <div class="stats-boxes">
                                <div class="stat-card active" data-type="subscribers">
                                    <div class="stat-number">12.5만</div>
                                    <div class="stat-label">구독자</div>
                                </div>
                                <div class="stat-card" data-type="videos">
                                    <div class="stat-number">245</div>
                                    <div class="stat-label">동영상</div>
                                </div>
                                <div class="stat-card" data-type="views">
                                    <div class="stat-number">850만</div>
                                    <div class="stat-label">총 조회수</div>
                                </div>
                                <div class="stat-card" data-type="rating">
                                    <div class="stat-number">4.6</div>
                                    <div class="stat-label">평균 별점</div>
                                </div>
                            </div>
                            <!-- 그래프 표시 영역 -->
                            <div class="stats-chart-container">
                                <canvas id="statsChart"></canvas>
                            </div>
                        </div>

                        <div class="about-section">
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
                    </div>
                </section>


            </div>
</template>

<style scoped>
* Content Tabs */
.channel-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.content-tab {
  display: none;
}

.content-tab.active {
  display: block;
}

.tab-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.tab-header h2 {
  color: var(--text-primary);
  font-size: 1.8rem;
  font-weight: 600;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort-select {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
}

.view-toggle {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.view-toggle:hover,
.view-toggle.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

/* 채널 소개 Content */
.about-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-section {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 15px;
}

.about-section h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.about-section h4 {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 1.5rem 0 0.5rem;
}

.about-section p {
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.about-section ul {
  color: var(--text-primary);
  margin-left: 1.5rem;
  line-height: 1.8;
}

.about-section li {
  margin-bottom: 0.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background-color: var(--hover-color);
  border-radius: 10px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  font-weight: 500;
}

.contact-info p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.contact-info i {
  color: var(--primary-color);
  width: 20px;
}

.contact-info .social-links {
  margin-top: 1rem;
}



/* Loading states and animations */
.loading {
  opacity: 0.6;
  pointer-events: none;
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>