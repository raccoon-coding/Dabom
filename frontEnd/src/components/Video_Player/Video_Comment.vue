<script setup>

</script>

<template>
    <div class="comments-section">
        <div class="comments-header">
            <h3>댓글 <span class="comment-count">127개</span></h3>
            <div class="comment-sort">
                <select class="sort-select">
                    <option value="newest">최신순</option>
                    <option value="popular">인기순</option>
                    <option value="oldest">오래된순</option>
                </select>
            </div>
        </div>
        <!-- 댓글 작성 영역 -->
        <div class="comment-write">
            <div class="comment-avatar">
                <img src="https://via.placeholder.com/40" alt="내 프로필">
            </div>
            <div class="comment-input-area">
                <textarea class="comment-textarea" placeholder="댓글을 입력해주세요..."></textarea>
                <div class="comment-actions">
                    <button class="btn btn-cancel">취소</button>
                    <button class="btn btn-primary">댓글 달기</button>
                </div>
            </div>
        </div>
        <!-- 댓글 목록 및 답글, 좋아요/싫어요, 신고 버튼 -->
        <div class="comments-list">
            <!-- 각 댓글 아이템 -->
            <div class="comment-item">
                <div class="comment-avatar">
                    <img src="https://via.placeholder.com/40" alt="사용자">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <span class="commenter-name">사용자123</span>
                        <span class="comment-time">2시간 전</span>
                    </div>
                    <p class="comment-text">정말 유용한 영상이네요! DaBom 플랫폼의 기능들이 혁신적인 것 같습니다.</p>
                    <div class="comment-actions">
                        <button class="comment-btn like-btn">
                            <i class="fas fa-thumbs-up"></i>
                            15
                        </button>
                        <button class="comment-btn dislike-btn">
                            <i class="fas fa-thumbs-down"></i>
                        </button>
                        <button class="comment-btn reply-btn">답글</button>
                        <button class="comment-btn report-btn">신고</button>
                    </div>
                    <!-- 답글 영역 -->
                    <div class="replies">
                        <div class="reply-item">
                            <div class="comment-avatar">
                                <img src="https://via.placeholder.com/30" alt="사용자">
                            </div>
                            <div class="comment-content">
                                <div class="comment-header">
                                    <span class="commenter-name">답글작성자</span>
                                    <span class="comment-time">1시간 전</span>
                                </div>
                                <p class="comment-text">@사용자123 동감합니다! Together 모드가 특히 인상적이에요.</p>
                                <div class="comment-actions">
                                    <button class="comment-btn like-btn">
                                        <i class="fas fa-thumbs-up"></i>
                                        3
                                    </button>
                                    <button class="comment-btn dislike-btn">
                                        <i class="fas fa-thumbs-down"></i>
                                    </button>
                                    <button class="comment-btn reply-btn">답글</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 추가 댓글 아이템들 ... -->
        </div>
    </div>
</template>

<style scoped>
@import url(../../assets/Video_Player/Video_Player.css);
</style>