<script setup>

</script>

<template>
    <div class="recommended-sidebar">
        <h3 class="sidebar-title">추천 영상</h3>
        <div class="recommended-videos">
            <div class="recommended-video">
                <div class="recommended-thumbnail">
                    <img src="https://via.placeholder.com/150x100" alt="추천 영상">
                    <div class="video-duration">8:45</div>
                </div>
                <div class="recommended-info">
                    <h4 class="recommended-title">관련 영상 제목</h4>
                    <p class="recommended-channel">채널명</p>
                    <div class="recommended-meta">
                        <span class="view-count">5.2만 조회</span>
                        <div class="star-rating small">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="far fa-star"></i>
                            <span class="rating-score">4.1</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 추가 추천 영상 아이템들 ... -->
        </div>
    </div>

</template>

<style scoped>
@import url(../../assets/Video_Player/Video_Player.css);

</style>