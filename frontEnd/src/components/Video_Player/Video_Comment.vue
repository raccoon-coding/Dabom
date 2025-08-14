<script setup>

import { ref, onMounted } from 'vue'
import { getComments, postComment } from '@/api/videocomment/'
const commentText = ref('')
const comments = ref([])
const videoId = 123 // 예시 ID

const loadComments = async () => {
  try {
    comments.value = await getComments(videoId)
  } catch {
    comments.value = []
  }
}

const submitComment = async () => {
  if (!commentText.value.trim()) {
    alert('댓글을 입력해주세요.')
    return
  }
  try {
    await postComment({ videoId, content: commentText.value })
    commentText.value = ''
    loadComments()
  } catch {
    alert('댓글 작성에 실패했습니다.')
  }
}

onMounted(() => {
  loadComments()
})
</script>

<template>
  <div class="comments-section">
    <div class="comments-header">
      <h3>댓글 <span class="comment-count">{{ comments.length }}개</span></h3>
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
        <img src="https://via.placeholder.com/40" alt="내 프로필" />
      </div>
      <div class="comment-input-area">
        <textarea
          class="comment-textarea"
          placeholder="댓글을 입력해주세요..."
          v-model="commentText"
        ></textarea>
        <div class="comment-actions">
          <button class="btn btn-cancel" @click="commentText = ''">취소</button>
          <button class="btn btn-primary" @click="submitComment">댓글 달기</button>
        </div>
      </div>
    </div>

    <!-- 댓글 목록 -->
    <div class="comments-list">
      <div
        class="comment-item"
        v-for="comment in comments"
        :key="comment.id"
      >
        <div class="comment-avatar">
          <img
            :src="comment.avatar || 'https://via.placeholder.com/40'"
            alt="사용자"
          />
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="commenter-name">{{ comment.username }}</span>
            <span class="comment-time">{{ comment.time }}</span>
          </div>
          <p class="comment-text">{{ comment.content }}</p>
          <div class="comment-actions">
            <button class="comment-btn like-btn">
              <i class="fas fa-thumbs-up"></i>
              {{ comment.likes || 0 }}
            </button>
            <button class="comment-btn dislike-btn">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <button class="comment-btn reply-btn">답글</button>
            <button class="comment-btn report-btn">신고</button>
          </div>

          <!-- 대댓글 -->
          <div class="replies" v-if="comment.replies && comment.replies.length">
            <div
              class="reply-item"
              v-for="reply in comment.replies"
              :key="reply.id"
            >
              <div class="comment-avatar">
                <img
                  :src="reply.avatar || 'https://via.placeholder.com/30'"
                  alt="사용자"
                />
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="commenter-name">{{ reply.username }}</span>
                  <span class="comment-time">{{ reply.time }}</span>
                </div>
                <p class="comment-text">{{ reply.content }}</p>
                <div class="comment-actions">
                  <button class="comment-btn like-btn">
                    <i class="fas fa-thumbs-up"></i>
                    {{ reply.likes || 0 }}
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
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/Video_Player/Video_Player.css);
</style>