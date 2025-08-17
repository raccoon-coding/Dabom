<script setup>
import { ref, onMounted,watch } from 'vue';
import { getChannelBoardList, deleteChannelBoard, updateChannelBoard, createChannelBoard } from '@/api/channel';
const props = defineProps({
  isActive: Boolean
});

const posts = ref([]);
const loading = ref(false);
const showCreateModal = ref(false);
const editingPost = ref(null);
const newPostContent = ref('');

// 게시글 목록 조회
const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await getChannelBoardList();
    // response.data.content에서 실제 게시글 배열 추출
    posts.value = response.data.content.map(post => ({
      ...post,
      isEditing: false,
      editContent: post.contents
    }));
    console.log('게시글 목록:', posts.value);
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
    post.editContent = post.contents;
  }
};

// 게시글 수정 저장
const saveEdit = async (post) => {
  try {
    const response = await updateChannelBoard(post.idx, {
      title: post.title,
      contents: post.editContent
    });
    
    if (response.code === 200 || response.success) {
      alert('게시글이 수정되었습니다.');
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
  post.editContent = post.contents;
};

// 새 게시글 작성
const createNewPost = async () => {
  if (!newPostContent.value.trim()) {
    alert('게시글 내용을 입력해주세요.');
    return;
  }

  try {
    const response = await createChannelBoard({
      title: '새 게시글',
      contents: newPostContent.value.trim()
    });
    
    if (response.code === 200 || response.success) {
      alert('게시글이 작성되었습니다.');
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

// 댓글 관리 페이지로 이동
const manageComments = (postIdx) => {
  // 라우터를 사용해 댓글 관리 페이지로 이동
  console.log('댓글 관리:', postIdx);
  alert(`게시글 ${postIdx}의 댓글 관리 기능은 추후 구현 예정입니다.`);
};

onMounted(() => {
  if (props.isActive) {
    fetchPosts();
  }
});

// props가 변경될 때 데이터 로드
watch(() => props.isActive, (newVal) => {
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
      게시글을 불러오는 중...
    </div>
    
    <!-- 게시글 목록 -->
    <div v-else class="community-posts-manage">
      <div v-if="posts.length === 0" class="no-posts">
        작성된 게시글이 없습니다.
      </div>
      
      <div v-else v-for="post in posts" :key="post.idx" class="community-post-manage">
        <div class="post-header">
          <h3>{{ post.content }}</h3>
          <span class="post-date">{{ post.createAt }}</span>
        </div>
        
        <!-- 편집 모드가 아닐 때 -->
        <div v-if="!post.isEditing" class="post-content">
          <p>{{ post.contents }}</p>
        </div>
        
        <!-- 편집 모드일 때 -->
        <div v-else class="post-edit">
          <textarea 
            v-model="post.editContent" 
            class="edit-textarea"
            rows="4"
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
              <i class="fas fa-comments"></i> 댓글 관리
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
    
    <!-- 새 게시글 작성 모달 -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content" @click.stop>
        <h3>새 게시글 작성</h3>
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
          <button class="btn-cancel" @click="showCreateModal = false">
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
  font-style: italic;
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
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.post-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.post-date {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.post-content p {
  margin: 0;
  line-height: 1.6;
  color: var(--text-primary);
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
}

.community-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.community-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
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

.create-textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 1rem;
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
}

.btn-submit:hover {
  background-color: #2563eb;
}
</style>