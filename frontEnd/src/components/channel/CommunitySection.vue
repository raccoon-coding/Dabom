<script setup>
import { ref, onMounted, watch } from 'vue';
import { getChannelBoardList, deleteChannelBoard, updateChannelBoard, createChannelBoard } from '@/api/channel';

const props = defineProps({
  isActive: Boolean
});

const posts = ref([]);
const loading = ref(false);
const showCreateModal = ref(false);
const editingPost = ref(null);
const newPostTitle = ref('');
const newPostContent = ref('');

// 게시글 목록 조회
const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await getChannelBoardList();
    

    // API 구조 확인: member API처럼 response.data를 반환하는 구조
    let content = [];
    
    if (response && response.data && response.data.content) {
      content = response.data.content;
    } else if (response && response.content) {
      content = response.content;
    } else if (Array.isArray(response)) {
      content = response;
    } else {
      console.warn('예상치 못한 응답 구조:', response);
      content = [];
    }
    
    
    posts.value = content.map(post => ({
      ...post,
      isEditing: false,
      editTitle: post.title,
      editContent: post.contents
    }));
    
    console.log('최종 posts.value:', posts.value);
    console.log('posts 개수:', posts.value.length);
  } catch (error) {
    console.error('게시글 로딩 실패:', error);
    posts.value = [];
  } finally {
    loading.value = false;
  }
};

// 게시글 삭제
const handleDeletePost = async (postIdx) => {
  if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
    return;
  }

  try {
    const response = await deleteChannelBoard(postIdx);
    if (response.code === 200 || response.success) {
      alert('게시글이 삭제되었습니다.');
      await fetchPosts(); // 목록 새로고침
    } else {
      throw new Error(response.message || '삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    alert('게시글 삭제에 실패했습니다.');
  }
};

// 편집 모드 토글
const toggleEdit = (post) => {
  post.isEditing = !post.isEditing;
  if (post.isEditing) {
    post.editTitle = post.title;
    post.editContent = post.contents;
  }
};

// 게시글 수정 저장
const saveEdit = async (post) => {
  if (!post.editTitle.trim()) {
    alert('제목을 입력해주세요.');
    return;
  }
  
  if (!post.editContent.trim()) {
    alert('내용을 입력해주세요.');
    return;
  }

  try {
    const response = await updateChannelBoard(post.idx, {
      title: post.editTitle.trim(),
      contents: post.editContent.trim()
    });
    
    if (response.code === 200 || response.success) {
      alert('게시글이 수정되었습니다.');
      post.title = post.editTitle;
      post.contents = post.editContent;
      post.isEditing = false;
      await fetchPosts(); // 목록 새로고침
    } else {
      throw new Error(response.message || '수정에 실패했습니다.');
    }
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    alert('게시글 수정에 실패했습니다.');
  }
};

// 편집 취소
const cancelEdit = (post) => {
  post.isEditing = false;
  post.editTitle = post.title;
  post.editContent = post.contents;
};

// 새 게시글 작성
const createNewPost = async () => {
  if (!newPostTitle.value.trim()) {
    alert('게시글 제목을 입력해주세요.');
    return;
  }
  
  if (!newPostContent.value.trim()) {
    alert('게시글 내용을 입력해주세요.');
    return;
  }

  try {
    const response = await createChannelBoard({
      title: newPostTitle.value.trim(),
      contents: newPostContent.value.trim()
    });
    
    if (response.code === 200 || response.success) {
      alert('게시글이 작성되었습니다.');
      newPostTitle.value = '';
      newPostContent.value = '';
      showCreateModal.value = false;
      await fetchPosts(); // 목록 새로고침
    } else {
      throw new Error(response.message || '작성에 실패했습니다.');
    }
  } catch (error) {
    console.error('게시글 작성 실패:', error);
    alert('게시글 작성에 실패했습니다.');
  }
};

// 모달 닫기
const closeModal = () => {
  showCreateModal.value = false;
  newPostTitle.value = '';
  newPostContent.value = '';
};

// 댓글 관리 페이지로 이동
const manageComments = (postIdx) => {
  console.log('댓글 관리:', postIdx);
  alert(`게시글 ${postIdx}의 댓글 관리 기능은 추후 구현 예정입니다.`);
};

// 날짜 포맷팅 (createAt이 null인 경우 처리)
const formatDate = (dateString) => {
  if (!dateString) return '날짜 정보 없음';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return '날짜 정보 없음';
  }
};

onMounted(() => {
  console.log('컴포넌트 마운트됨, isActive:', props.isActive);
  if (props.isActive) {
    fetchPosts();
  }
});

// props가 변경될 때 데이터 로드
watch(() => props.isActive, (newVal) => {
  console.log('isActive 변경됨:', newVal);
  if (newVal) {
    fetchPosts();
  }
});
</script>

<template>
  <section id="section-community" class="dashboard-section" :class="{ active: isActive }">
    <h2>커뮤니티 게시글 관리</h2>
    
    <button class="btn-create" @click="showCreateModal = true">
      <i class="fas fa-pen"></i> 새 게시글 작성
    </button>
    
  
    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> 게시글을 불러오는 중...
    </div>
    
    <!-- 게시글 목록 -->
    <div v-else class="community-posts-manage">
      <div v-if="posts.length === 0" class="no-posts">
        <i class="fas fa-inbox"></i>
        <p>작성된 게시글이 없습니다.</p>
        <small>새 게시글을 작성해보세요!</small>
      </div>
      
      <div v-else>
        <div class="posts-count">
          총 {{ posts.length }}개의 게시글
        </div>
        
        <div v-for="post in posts" :key="post.idx" class="community-post-manage">
          <div class="post-header">
            <!-- 편집 모드가 아닐 때: 제목 표시 -->
            <h3 v-if="!post.isEditing" class="post-title">{{ post.title }}</h3>
            <!-- 편집 모드일 때: 제목 입력 -->
            <input 
              v-else 
              v-model="post.editTitle" 
              class="edit-title-input"
              placeholder="제목을 입력하세요"
            />
            <div class="post-meta">
              <span class="post-date">{{ formatDate(post.createAt) }}</span>
              <span class="comment-count">
                <i class="fas fa-comment"></i> {{ post.commentCount }}
              </span>
            </div>
          </div>
          
          <!-- 편집 모드가 아닐 때: 내용 표시 -->
          <div v-if="!post.isEditing" class="post-content">
            <p>{{ post.contents }}</p>
          </div>
          
          <!-- 편집 모드일 때: 내용 입력 -->
          <div v-else class="post-edit">
            <textarea 
              v-model="post.editContent" 
              class="edit-textarea"
              rows="4"
              placeholder="내용을 입력하세요"
            ></textarea>
          </div>
          
          <div class="community-actions">
            <!-- 편집 모드가 아닐 때 -->
            <template v-if="!post.isEditing">
              <button class="btn-edit" @click="toggleEdit(post)">
                <i class="fas fa-edit"></i> 편집
              </button>
              <button class="btn-delete" @click="handleDeletePost(post.idx)">
                <i class="fas fa-trash"></i> 삭제
              </button>
              <button class="btn-comment-manage" @click="manageComments(post.idx)">
                <i class="fas fa-comments"></i> 댓글 관리 ({{ post.commentCount }})
              </button>
            </template>
            
            <!-- 편집 모드일 때 -->
            <template v-else>
              <button class="btn-save" @click="saveEdit(post)">
                <i class="fas fa-check"></i> 저장
              </button>
              <button class="btn-cancel" @click="cancelEdit(post)">
                <i class="fas fa-times"></i> 취소
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 새 게시글 작성 모달 -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>새 게시글 작성</h3>
        
        <!-- 제목 입력 -->
        <input 
          v-model="newPostTitle" 
          placeholder="게시글 제목을 입력하세요..."
          class="create-title-input"
        />
        
        <!-- 내용 입력 -->
        <textarea 
          v-model="newPostContent" 
          placeholder="게시글 내용을 입력하세요..."
          class="create-textarea"
          rows="6"
        ></textarea>
        
        <div class="modal-actions">
          <button class="btn-submit" @click="createNewPost">
            <i class="fas fa-pen"></i> 작성
          </button>
          <button class="btn-cancel" @click="closeModal">
            취소
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url(@/assets/channel/mychannel);

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

.no-posts {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.no-posts i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.posts-count {
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.community-post-manage {
  margin-bottom: 1.5rem;
  background: rgb(45, 42, 42);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  gap: 1rem;
}

.post-title {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 600;
  flex: 1;
  word-break: break-word;
}

.post-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  flex-shrink: 0;
}

.post-date {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.comment-count {
  color: var(--text-secondary);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.edit-title-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.post-content p {
  margin: 0;
  line-height: 1.6;
  color: var(--text-primary);
  white-space: pre-wrap;
}

.post-edit {
  margin: 1rem 0;
}

.edit-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.community-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.community-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-edit {
  background-color: #3b82f6;
  color: white;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
}

.btn-comment-manage {
  background-color: #8b5cf6;
  color: white;
}

.btn-save {
  background-color: #10b981;
  color: white;
}

.btn-cancel {
  background-color: #6b7280;
  color: white;
}

.community-actions button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: rgb(42, 40, 40);
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: auto;
}

.modal-content h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.create-title-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.create-textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-submit {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-submit:hover {
  background-color: #2563eb;
}

.btn-create {
  background-color: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-create:hover {
  background-color: #059669;
  transform: translateY(-1px);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .post-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .post-meta {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .community-actions {
    flex-direction: column;
  }
  
  .community-actions button {
    justify-content: center;
  }
}
</style>