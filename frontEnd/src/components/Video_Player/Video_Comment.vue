<script setup>
import { ref, onMounted, watch } from 'vue'
import { getComments, postComment, deleteComment } from '@/api/videocomment/'

const props = defineProps({
  videoId: {
    type: [String, Number],
    required: true
  }
})

const commentText = ref('')
const comments = ref([])
const currentUser = ref(null) // 현재 사용자 정보
const sortOrder = ref('newest') // 정렬 기준: newest, popular, oldest
const page = ref(0) // 현재 페이지
const pageSize = 10 // 페이지당 댓글 수
const hasMore = ref(true) // 추가 댓글 여부

const loadComments = async (reset = false) => {
  if (!props.videoId) return; // videoId가 없으면 실행하지 않음

  console.log(props.videoId);

  if (reset) {
    page.value = 0
    comments.value = []
    hasMore.value = true
  }
  try {
    let sortParam = ''
    if (sortOrder.value === 'newest') {
      sortParam = 'createdAt,desc'
    } else if (sortOrder.value === 'oldest') {
      sortParam = 'createdAt,asc'
    } else if (sortOrder.value === 'popular') {
      sortParam = 'likes,desc'
    }

    const response = await getComments(props.videoId, {
      page: page.value,
      size: pageSize,
      sort: sortParam
    })
    
    if (response && response.data) {
        comments.value = reset ? response.data.content : [...comments.value, ...response.data.content]
        hasMore.value = !response.data.last
    } else {
        comments.value = []
        hasMore.value = false
    }
  } catch (error) {
    comments.value = []
    hasMore.value = false
    alert(error.response?.data?.message || '댓글 목록을 불러오는데 실패했습니다.')
  }
}

const submitComment = async () => {
  console.log('submitComment 호출됨, videoId:', props.videoId) // 디버깅용
  
  if (!props.videoId) {
    alert('비디오 ID가 없습니다.')
    return
  }
  
  if (!commentText.value.trim()) {
    alert('댓글을 입력해주세요.')
    return
  }
  
  try {
    console.log('postComment 호출 전, videoId:', props.videoId) // 디버깅용
    await postComment(props.videoId, { content: commentText.value })
    commentText.value = ''
    loadComments(true)
  } catch (error) {
    alert(error.response?.data?.message || '댓글 작성에 실패했습니다.')
  }
}

const handleDeleteComment = async (commentId) => {
  if (!confirm('이 댓글을 삭제하시겠습니까?')) return
  try {
    await deleteComment(commentId)
    loadComments(true)
  } catch (error) {
    alert(error.response?.data?.message || '댓글 삭제에 실패했습니다.')
  }
}

const loadMoreComments = () => {
  if (hasMore.value) {
    page.value += 1
    loadComments()
  }
}

const changeSortOrder = () => {
  loadComments(true)
}

// videoId가 변경될 때마다 댓글을 다시 불러오도록 설정
watch(() => props.videoId, (newVideoId) => {
  if (newVideoId) {
    loadComments(true);
  }
}, { immediate: true });


onMounted(() => {
  // 이제 watcher가 초기 로딩을 처리합니다.
  currentUser.value = { id: 1 } // 실제 인증 시스템에서 사용자 ID 설정
})
</script>

<template>
  <div class="comments-section">
    <div class="comments-header">
      <h3>댓글 <span class="comment-count">{{ comments.length }}개</span></h3>
      <div class="comment-sort">
        <select class="sort-select" v-model="sortOrder" @change="changeSortOrder">
          <option value="newest">최신순</option>
          <option value="popular">인기순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>
    </div>

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
            <button
                v-if="currentUser && currentUser.id === comment.memberIdx"
                class="comment-btn delete-btn"
                @click="handleDeleteComment(comment.id)"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="load-more" v-if="hasMore">
      <button class="btn btn-load-more" @click="loadMoreComments">더 보기</button>
    </div>
  </div>
</template>

<style scoped>
@import url(../../assets/Video_Player/Video_Player.css);
.delete-btn {
  color: #ff4d4f;
  margin-left: 8px;
}
.btn-load-more {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.btn-load-more:hover {
  background-color: #0056b3;
}
</style>