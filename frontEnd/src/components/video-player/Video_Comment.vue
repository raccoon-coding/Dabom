<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getComments, postComment, deleteComment } from '@/api/videocomment/'

const route = useRoute()
const videoId = ref(route.params.id)

// props로 현재 사용자 프로필 정보 받기
const props = defineProps({
  currentUserProfile: {
    type: Object,
    required: true,
    default: () => ({
      profileImg: 'https://via.placeholder.com/40',
      name: '사용자'
    })
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
  if (!videoId.value) return; // videoId가 없으면 실행하지 않음
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

    const response = await getComments(videoId.value, {
      page: page.value,
      size: pageSize,
      sort: sortParam
    })
    
    // API 함수에서 이미 res.data를 반환하므로 response가 실제 데이터
    console.log('전체 응답:', response);
    console.log('response.data:', response.data); // 실제 Slice 객체
    
    if (response && response.data && response.data.content) {
        // API 함수에서 res.data를 반환하므로 response.data가 실제 Slice
        comments.value = reset ? response.data.content : [...comments.value, ...response.data.content]
        hasMore.value = !response.data.last
        console.log('댓글 데이터 로드 성공:', response.data.content);
        console.log('첫 번째 댓글 프로필:', response.data.content[0]?.profileImg);
    } else {
        console.log('예상과 다른 응답 구조입니다.');
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
  console.log('submitComment 호출됨, videoId:', videoId.value) // 디버깅용
  
  if (!videoId.value) {
    alert('비디오 ID가 없습니다.')
    return
  }
  
  if (!commentText.value.trim()) {
    alert('댓글을 입력해주세요.')
    return
  }
  
  try {
    console.log('postComment 호출 전, videoId:', videoId.value) // 디버깅용
    await postComment(videoId.value, { content: commentText.value })
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

// URL의 videoId가 변경될 때마다 댓글을 다시 불러오도록 설정
watch(() => route.params.id, (newVideoId) => {
  if (newVideoId) {
    videoId.value = newVideoId;
    loadComments(true);
  }
}, { immediate: true });

onMounted(() => {
  // 실제 인증 시스템에서 사용자 ID 설정
  currentUser.value = { id: 1 }
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
        <!-- props에서 현재 사용자 프로필 이미지 사용 -->
        <img :src="props.currentUserProfile.profileImg" :alt="props.currentUserProfile.name + ' 프로필'" />
      </div>
      <div class="comment-input-area">
        <textarea
            class="comment-textarea"
            placeholder="댓글을 입력해주세요..."
            v-model="commentText"
        ></textarea>
        <div class="comment-actions">
          <button class="action-btn btn-cancel" @click="commentText = ''">취소</button>
          <button class="action-btn btn-message" @click="submitComment">댓글 달기</button>
        </div>
      </div>
    </div>

    <div class="comments-list">
      <div
          class="comment-item"
          v-for="comment in comments"
          :key="comment.idx"
      >
        <div class="comment-avatar">
          <!-- 백엔드에서 추가한 profileImg 필드 사용 -->
          <img
              :src="comment.profileImg || 'https://via.placeholder.com/40'"
              alt="사용자"
          />
        </div>
        <div class="comment-content">
          <div class="comment-header">
            <span class="commenter-name">{{ comment.username }}</span>
            <!-- 백엔드 응답의 createdAt 사용 -->
            <span class="comment-time">{{ comment.createdAt }}</span>
          </div>
          <p class="comment-text">{{ comment.content }}</p>
          <div class="comment-actions">
            <button
                v-if="currentUser && currentUser.id === comment.memberIdx"
                class="comment-btn delete-btn"
                @click="handleDeleteComment(comment.idx)"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="load-more" v-if="hasMore">
      <button class="action-btn btn-load-more" @click="loadMoreComments">더 보기</button>
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
  cursor: pointer;
}

.btn-load-more:hover {
  background-color: #0056b3;
}
</style>