<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { getChannelBoardDetail, getBoardCommentsPagedSorted, createBoardComment } from '@/api/channel'

// props 및 라우터
const route = useRoute()
const postId = route.params.id

// 반응형 데이터
const loading = ref(false)
const newCommentText = ref('') // 댓글 작성 텍스트
const isCommentFocused = ref(false) // 댓글 입력 필드 포커스 상태

// 게시글 데이터 (reactive 사용)
const post = reactive({
    idx: 0,
    title: '',
    contents: '',
    createAt: '',
    commentCount: 0
})

// 무한 스크롤 관련 상태
const comments = ref([])
const sortBy = ref('oldest') // 댓글 정렬 기준
const showSortDropdown = ref(false) // 드롭다운 표시 여부
const sortDropdownRef = ref(null) 
const totalCommentCount = ref(0)

// 무한 스크롤 상태
const currentPage = ref(0)
const hasNext = ref(true)
const isLoadingMore = ref(false)
const pageSize = 10
const observerTarget = ref(null)
let observer = null

// 게시글 상세 조회

const fetchPostDetail = async () => {
    loading.value = true
    try {
        const response = await getChannelBoardDetail(postId)
        
        // API 응답을 reactive 객체에 할당
        Object.assign(post, {
            idx: response.idx || 0,
            title: response.title || '제목 없음',
            contents: response.contents || '내용 없음',
            createAt: response.createAt || '시간 정보 없음',
            commentCount: response.commentCount || 0
        })
        
        // 댓글 목록 조회 (첫 페이지)
        await loadComments(0, true)
        
    } catch (error) {
        console.error('게시글 로딩 실패:', error)
        // 에러 시 기본값 설정
        Object.assign(post, {
            idx: 0,
            title: '게시글을 불러올 수 없습니다',
            contents: '네트워크 오류가 발생했습니다.',
            createAt: '',
            commentCount: 0
        })
    } finally {
        loading.value = false
    }
}


// 댓글 로드 (무한 스크롤) - 추가 로딩 시에만 딜레이

const loadComments = async (page = 0, reset = false) => {
    if (isLoadingMore.value && !reset) return
    
    isLoadingMore.value = true
    try {
        console.log(`댓글 로드: page=${page}, reset=${reset}, sort=${sortBy.value}`)
        
        // 🔥 무한 스크롤 추가 로딩 시에만 딜레이 (첫 로딩은 즉시)
        if (page > 0 && !reset) { 
            await new Promise(resolve => setTimeout(resolve, 2000))  // 2초로 변경
        }
        
        const response = await getBoardCommentsPagedSorted(postId, page, pageSize, sortBy.value)
        console.log('댓글 응답:', response)
        
        // 🔥 이 부분 추가! 전체 댓글 개수 업데이트
        if (reset || page === 0) {
            totalCommentCount.value = response.totalCount || post.commentCount || 0
        }
        
        if (reset) {
            comments.value = response.content || []
        } else {
            comments.value = [...comments.value, ...(response.content || [])]
        }
        
        hasNext.value = response.hasNext
        currentPage.value = page
        
        // 🔥 Observer 재설정도 추가
        if (reset) {
            setTimeout(() => {
                if (observer) observer.disconnect()
                if (observerTarget.value && hasNext.value) {
                    observer = new IntersectionObserver(handleIntersection, {
                        threshold: 0.1,
                        rootMargin: '100px'
                    })
                    observer.observe(observerTarget.value)
                    console.log('Observer 재설정 완료')
                }
            }, 100)
        }
        
    } catch (error) {
        console.error('댓글 로딩 실패:', error)
        if (reset) {
            comments.value = []
        }
    } finally {
        isLoadingMore.value = false
    }
}
// 다음 페이지 로드
const loadMoreComments = () => {
    if (hasNext.value && !isLoadingMore.value) {
        loadComments(currentPage.value + 1)
    }
}

// Intersection Observer 콜백
const handleIntersection = (entries) => {
    const [entry] = entries
    if (entry.isIntersecting && hasNext.value && !isLoadingMore.value) {
        console.log('Intersection 감지: 다음 페이지 로드')
        loadMoreComments()
    }
}

// 댓글 정렬 변경
const changeSortOrder = (newSort) => {
    console.log(`정렬 변경: ${sortBy.value} → ${newSort}`)
    sortBy.value = newSort
    showSortDropdown.value = false
    
    // 정렬 변경 시 처음부터 다시 로드
    currentPage.value = 0
    hasNext.value = true
    loadComments(0, true)
}

// 정렬 드롭다운 토글
const toggleSortDropdown = (event) => {
    event.stopPropagation()
    showSortDropdown.value = !showSortDropdown.value
}

// 외부 클릭 감지 함수
const handleClickOutside = (event) => {
    if (showSortDropdown.value && sortDropdownRef.value && !sortDropdownRef.value.contains(event.target)) {
        showSortDropdown.value = false
    }
}

// 드롭다운 아이템 클릭 시 이벤트 처리
const handleDropdownItemClick = (event, newSort) => {
    event.stopPropagation()
    changeSortOrder(newSort)
}

// 댓글 입력 필드 포커스/블러 처리
const handleCommentFocus = () => {
    isCommentFocused.value = true
}

const handleCommentBlur = () => {
    if (!newCommentText.value.trim()) {
        isCommentFocused.value = false
    }
}

// 댓글 작성 취소
const cancelComment = () => {
    newCommentText.value = ''
    isCommentFocused.value = false
}

// 댓글 작성 제출
const submitComment = async () => {
    if (!newCommentText.value.trim()) {
        alert('댓글 내용을 입력해주세요.')
        return
    }
    
    try {
        const response = await createBoardComment(postId, { content: newCommentText.value })
        if (response.code === 200) {
            alert('댓글이 작성되었습니다.')
            newCommentText.value = ''
            isCommentFocused.value = false
            
            // 댓글 작성 후 첫 페이지부터 새로고침
            currentPage.value = 0
            hasNext.value = true
            await loadComments(0, true)
        } else {
            throw new Error('댓글 작성에 실패했습니다.')
        }
    } catch (error) {
        console.error('댓글 작성 실패:', error)
        alert('댓글 작성에 실패했습니다.')
    }
}

// 댓글 삭제 후 새로고침
const handleCommentDeleted = () => {
    currentPage.value = 0
    hasNext.value = true
    loadComments(0, true)
}

// 컴포넌트 마운트
onMounted(() => {
    fetchPostDetail()
    
    // 외부 클릭 이벤트 리스너 추가
    setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
    }, 100)
    
    // Intersection Observer 설정
    setTimeout(() => {
        if (observerTarget.value) {
            observer = new IntersectionObserver(handleIntersection, {
                threshold: 0.1,
                rootMargin: '100px'
            })
            observer.observe(observerTarget.value)
        }
    }, 500)
})

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    if (observer) {
        observer.disconnect()
    }
})
</script>

<template>
  <div class="post-detail-container">
    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">
      게시글을 불러오는 중...
    </div>
    
    <!-- 게시글 내용 -->
    <div v-else class="community-post">
      <!-- 게시글 헤더 -->
      <div class="post-header">
        <div class="post-author">
          <img src="https://via.placeholder.com/40" alt="채널" class="author-avatar">
          <div class="author-info">
            <span class="author-name">크리에이티브 채널</span>
            <span class="post-time">{{ post.createAt }}</span>
          </div>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
      </div>
      
      <!-- 게시글 본문 -->
      <div class="post-content">
        <p>{{ post.contents }}</p>
      </div>
      
      <!-- 댓글 섹션 -->
      <div class="comments-section">
        <!-- 댓글 헤더 -->
        <div class="comments-header">
          <h3 class="comments-title">댓글 {{ totalCommentCount  }}개</h3>
          
          <!-- 정렬 드롭다운 -->
          <div class="sort-dropdown" ref="sortDropdownRef">
            <button class="sort-button" @click="toggleSortDropdown">
              <i class="fas fa-sort"></i>
              {{ sortBy === 'oldest' ? '오래된순' : '최신순' }}
              <i class="fas fa-chevron-down"></i>
            </button>
            
            <div v-if="showSortDropdown" class="dropdown-menu" @click.stop>
              <div 
                class="dropdown-item"
                :class="{ active: sortBy === 'oldest' }"
                @click="handleDropdownItemClick($event, 'oldest')"
              >
                오래된순
              </div>
              <div 
                class="dropdown-item"
                :class="{ active: sortBy === 'latest' }"
                @click="handleDropdownItemClick($event, 'latest')"
              >
                최신순
              </div>
            </div>
          </div>
        </div>

        <!-- 댓글 작성 폼 -->
        <div class="comment-form">
          <div class="comment-input-container">
            <img src="https://via.placeholder.com/40" alt="내 프로필" class="comment-user-avatar">
            <div class="comment-input-wrapper">
              <textarea
                v-model="newCommentText"
                @focus="handleCommentFocus"
                @blur="handleCommentBlur"
                placeholder="댓글을 입력하세요..."
                class="comment-input"
                :class="{ focused: isCommentFocused }"
                rows="1"
              ></textarea>
              
              <!-- 댓글 작성 버튼들 (포커스 시에만 표시) -->
              <div v-if="isCommentFocused || newCommentText.trim()" class="comment-actions">
                <button class="comment-cancel-btn" @click="cancelComment">취소</button>
                <button 
                  class="comment-submit-btn" 
                  :disabled="!newCommentText.trim()"
                  @click="submitComment"
                >
                  댓글
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 댓글 목록 -->
        <div class="comments-list">
          <div v-if="comments.length === 0 && !isLoadingMore" class="no-comments">
            첫 번째 댓글을 작성해보세요!
          </div>
          
          <!-- 댓글 아이템들 -->
          <div 
            v-for="comment in comments" 
            :key="comment.idx"
            class="comment-item"
          >
            <div class="comment-avatar-container">
              <img src="https://via.placeholder.com/32" alt="작성자" class="comment-avatar">
            </div>
            <div class="comment-main">
              <div class="comment-header">
                <span class="comment-author-name">익명</span>
                <span class="comment-time">{{ comment.createdAt }}</span>
                <!-- 수정됨 표시 -->
                <span v-if="comment.isModified" class="modified-badge">
                  <i class="fas fa-edit"></i>
                  수정됨
                </span>
              </div>
              <div class="comment-content">
                {{ comment.content || '댓글 내용이 없습니다' }}
              </div>
              <!-- 수정 시간 표시 (수정된 댓글인 경우) -->
              <div v-if="comment.isModified" class="comment-modified-info">
                수정된 시간: {{ comment.updatedAt }}
              </div>
              <!-- 댓글 액션 버튼들 -->
              <div class="comment-actions-bar">
                <button class="comment-action-btn">
                  <i class="fas fa-thumbs-up"></i>
                </button>
                <button class="comment-action-btn">
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <button class="comment-action-btn">답글</button>
              </div>
            </div>
          </div>
          
          <!-- 무한 스크롤 트리거 -->
          <div 
            v-if="hasNext" 
            ref="observerTarget" 
            class="loading-trigger"
          >
            <div v-if="isLoadingMore" class="loading-more">
              <i class="fas fa-spinner fa-spin"></i>
              댓글을 더 불러오는 중...
            </div>
          </div>
          
          <!-- 모든 댓글 로드 완료 -->
          <div v-if="!hasNext && comments.length > 0" class="comments-end">
            모든 댓글을 불러왔습니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: white;
}

.community-post {
  background-color: rgb(45, 42, 42);
  border-radius: 12px;
  padding: 2rem;
  color: white;
}

.post-header {
  margin-bottom: 1.5rem;
}

.post-author {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-name {
  font-weight: 600;
  color: white;
}

.post-time {
  font-size: 0.875rem;
  color: #888;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.post-content {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #444;
}

.post-content p {
  line-height: 1.6;
  color: white;
  margin: 0;
}

.comments-section {
  margin-top: 2rem;
}

.comments-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.comments-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* 정렬 드롭다운 스타일 */
.sort-dropdown {
  position: relative;
}

.sort-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgb(35, 32, 32);
  color: white;
  border: 1px solid #444;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.sort-button:hover {
  background-color: rgb(45, 42, 42);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgb(35, 32, 32);
  border: 1px solid #444;
  border-radius: 6px;
  overflow: hidden;
  z-index: 100;
  min-width: 120px;
  margin-top: 0.25rem;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: rgb(45, 42, 42);
}

.dropdown-item.active {
  background-color: #3b82f6;
  color: white;
}

/* 댓글 작성 폼 스타일 (유튜브 스타일) */
.comment-form {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
 
}

.comment-input-container {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.comment-user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.comment-input-wrapper {
  flex: 1;
}

.comment-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.5rem 0;
  resize: none;
  transition: border-color 0.2s;
}

.comment-input:focus {
  outline: none;
  border-bottom-color: #3b82f6;
}

.comment-input.focused {
  border-bottom-color: #3b82f6;
}

.comment-input::placeholder {
  color: #888;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.comment-cancel-btn {
  background: transparent;
  color: #888;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.comment-cancel-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.comment-submit-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.comment-submit-btn:disabled {
  background-color: #444;
  color: #888;
  cursor: not-allowed;
}

.comment-submit-btn:not(:disabled):hover {
  background-color: #2563eb;
}

/* 댓글 목록 스타일 */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.no-comments {
  text-align: center;
  color: #888;
  padding: 2rem;
  font-style: italic;
}

.comment-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.comment-avatar-container {
  flex-shrink: 0;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.comment-main {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.comment-author-name {
  font-weight: 500;
  color: white;
  font-size: 0.875rem;
}

.comment-time {
  font-size: 0.75rem;
  color: #888;
}

/* 수정됨 배지 스타일 */
.modified-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: #fbbf24;
  background-color: rgba(251, 191, 36, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.modified-badge i {
  font-size: 0.6rem;
}

.comment-content {
  color: white;
  line-height: 1.5;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

/* 수정 시간 정보 스타일 */
.comment-modified-info {
  font-size: 0.7rem;
  color: #888;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.comment-actions-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.comment-action-btn {
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.comment-action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.comment-action-btn i {
  font-size: 0.75rem;
}

/* 무한 스크롤 관련 스타일 */
.loading-trigger {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #888;
  font-size: 0.875rem;
}

.loading-more i {
  color: #3b82f6;
}

.comments-end {
  text-align: center;
  color: #666;
  font-size: 0.875rem;
  padding: 1.5rem;
  border-top: 1px solid #444;
  margin-top: 1rem;
  font-style: italic;
}
</style>