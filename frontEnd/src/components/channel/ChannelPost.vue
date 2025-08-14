<script setup>
import channelComment from '@/components/channel/ChannelComment.vue';
import channelCommentModal from '@/components/channel/ChannelCommentModal.vue';
import likeBtn from '@/components/channel/LikeBtn.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getChannelBoardDetail, getBoardComments, createBoardComment } from '@/api/channel';

const route = useRoute();
const post = ref({});
const comments = ref([]);
const loading = ref(false);
const showCommentModal = ref(false);

// URL에서 게시글 ID 가져오기
const postId = route.params.id;

const fetchPostDetail = async () => {
    loading.value = true;
    try {
        // 게시글 상세 정보 조회
        const postResponse = await getChannelBoardDetail(postId);
        post.value = postResponse;
        
        // 댓글 목록 조회
        await fetchComments();
        
        console.log('게시글:', post.value);
        console.log('댓글 목록:', comments.value);
    } catch (error) {
        console.error('데이터 로딩 실패:', error);
        // 에러 시 임시 데이터 설정
        post.value = {
            title: "제목입니다.",
            contents: "안녕하세요! 새로운 Together 모드 업데이트에 대한 피드백을 받고 있습니다. 어떤 기능을 추가했으면 좋겠는지 댓글로 알려주세요! 🎉",
            createAt: "3시간 전",
            authorName: "test02"
        };
    } finally {
        loading.value = false;
    }
};

const fetchComments = async () => {
    try {
        const commentsResponse = await getBoardComments(postId);
        comments.value = commentsResponse;
        console.log('받은 댓글 데이터:', commentsResponse);
    } catch (error) {
        console.error('댓글 로딩 실패:', error);
        comments.value = [];
    }
};

const handleCommentCreated = async (commentText) => {
    try {
        const response = await createBoardComment(postId, { content: commentText });
        if (response.code === 200) {
            alert('댓글이 작성되었습니다.');
            await fetchComments(); // 댓글 목록 새로고침
            showCommentModal.value = false;
        } else {
            throw new Error(response.message || '댓글 작성에 실패했습니다.');
        }
    } catch (error) {
        console.error('댓글 작성 실패:', error);
        alert('댓글 작성에 실패했습니다.');
    }
};

const handleCommentDeleted = () => {
    // 댓글 삭제 후 목록 새로고침
    fetchComments();
};

const toggleCommentModal = () => {
    showCommentModal.value = !showCommentModal.value;
};

onMounted(() => {
    fetchPostDetail();
});
</script>

<template>
<div v-if="loading" class="loading">로딩 중...</div>
<div v-else class="community-post">
    <div class="post-header">
        <div class="post-author">
            <img src="https://via.placeholder.com/40" alt="채널" class="author-avatar">
            <div class="author-info">
                <span class="author-name">{{ post.authorName || 'test02' }}</span>
            </div>
            <span class="post-time">{{ post.createAt || '시간 정보 없음' }}</span>
        </div>
        <div class="post-title">
            <span class="title">{{ post.title || '제목 없음' }}</span>
        </div>
    </div>
    <div class="post-content">
        <p>{{ post.contents || '내용 없음' }}</p>
        <div class="post-image" v-if="post.imageUrl">
            <img :src="post.imageUrl" alt="게시물 이미지">
        </div>
    </div>
    <div class="post-actions">
        <likeBtn :post-id="postId" />
        <button class="comment-write-btn" @click="toggleCommentModal">
            댓글 작성
        </button>
    </div>
    
    <!-- 댓글 목록 -->
    <div class="comments-section">
        <h3 class="comments-title">댓글 {{ comments.length }}개</h3>
        <div v-if="comments.length === 0" class="no-comments">
            댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
        </div>
        <channelComment 
            v-else
            v-for="comment in comments" 
            :key="comment.idx"
            :comment-data="comment"
            @comment-deleted="handleCommentDeleted"
        />
    </div>
    
    <!-- 댓글 작성 모달 -->
    <channelCommentModal 
        v-if="showCommentModal"
        :post-id="postId"
        @comment-created="handleCommentCreated"
        @close="showCommentModal = false"
    />
</div>
</template>

<style scoped>
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-size: 1.2rem;
    color: var(--text-secondary);
}

.community-post {
    margin-bottom: 2rem;
    background-color: var(--card-bg);
    border-radius: 15px;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
}

.post-header {
    margin-bottom: 1rem;
}

.post-author {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.title {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1.5rem;
}

.author-name {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1rem;
}

.post-time {
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.post-content p {
    color: var(--text-primary);
    line-height: 1.6;
    margin-bottom: 1rem;
}

.post-image {
    margin-top: 1rem;
    border-radius: 10px;
    overflow: hidden;
}

.post-image img {
    width: 100%;
    height: auto;
    display: block;
}

.post-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
}

.comment-write-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
}

.comment-write-btn:hover {
    background-color: var(--primary-hover);
}

.comments-section {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
}

.no-comments {
    text-align: center;
    color: var(--text-secondary);
    padding: 2rem;
    font-style: italic;
}
</style>