<script setup>
import likeBtn from '@/components/channel/LikeBtn.vue';
import reCommentBtn from '@/components/channel/ReCommentBtn.vue';
import channelCommentModal from '@/components/channel/ChannelCommentModal.vue';
import { ref, computed } from 'vue';
import { deleteBoardComment } from '@/api/channel';

const props = defineProps({
    commentData: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['comment-deleted']);

const recommentModal = ref(false);
const showDeleteBtn = ref(false);

// 댓글 데이터 가져오기 (기본값 설정)
const commentInfo = computed(() => ({
    idx: props.commentData.idx || null,
    hostname: props.commentData.authorName || props.commentData.writer || '익명',
    hostProfile: props.commentData.profileImage || 'https://via.placeholder.com/40',
    comment: props.commentData.content || props.commentData.contents || '댓글 내용 없음',
    createAt: props.commentData.createAt || '시간 정보 없음'
}));

const clickRecomment = () => {
    recommentModal.value = !recommentModal.value;
};

const handleDeleteComment = async () => {
    if (!commentInfo.value.idx) {
        alert('댓글 ID가 없습니다.');
        return;
    }

    if (confirm('댓글을 삭제하시겠습니까?')) {
        try {
            await deleteBoardComment(commentInfo.value.idx);
            alert('댓글이 삭제되었습니다.');
            emit('comment-deleted');
        } catch (error) {
            console.error('댓글 삭제 실패:', error);
            alert('댓글 삭제에 실패했습니다.');
        }
    }
};

const toggleDeleteBtn = () => {
    showDeleteBtn.value = !showDeleteBtn.value;
};
</script>

<template>
<div class="comment-box">
    <div class="post-author">
        <img :src="commentInfo.hostProfile" alt="채널" class="author-avatar">
        <div class="author-info">
            <span class="author-name">{{ commentInfo.hostname }}</span>
        </div>
        <span class="post-time">{{ commentInfo.createAt }}</span>
        <div class="comment-actions">
            <button class="action-btn" @click="toggleDeleteBtn">⋮</button>
            <div v-if="showDeleteBtn" class="delete-menu">
                <button class="delete-btn" @click="handleDeleteComment">삭제</button>
            </div>
        </div>
    </div>
    <div class="content-box">
        {{ commentInfo.comment }}
    </div>
    <div class="comment-bottom-actions">
        <likeBtn :comment-id="commentInfo.idx" />
        <span @click="clickRecomment">
            <reCommentBtn />
        </span>
    </div>
    <channelCommentModal 
        v-if="recommentModal" 
        :parent-comment-id="commentInfo.idx"
        @close="recommentModal = false"
    />
</div>
</template>

<style scoped>
.comment-box {
    margin-bottom: 1rem;
    background-color: var(--card-bg);
    border-radius: 15px;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    position: relative;
}

.post-author {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
}

.author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.author-name {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1rem;
}

.post-time {
    margin-right: auto;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.comment-actions {
    position: relative;
}

.action-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.25rem;
}

.action-btn:hover {
    background-color: var(--hover-bg);
    border-radius: 4px;
}

.delete-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    z-index: 10;
}

.delete-btn {
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    color: red;
    cursor: pointer;
    font-size: 0.875rem;
    width: 100%;
    text-align: left;
}

.delete-btn:hover {
    background-color: #fee;
}

.content-box {
    color: var(--text-primary);
    line-height: 1.6;
    margin: 1rem 0;
}

.comment-bottom-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>