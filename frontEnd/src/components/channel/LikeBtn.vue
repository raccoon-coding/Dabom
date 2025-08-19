<script setup>
import { ref } from 'vue';

const props = defineProps({
    postId: {
        type: [String, Number],
        default: null
    },
    commentId: {
        type: [String, Number], 
        default: null
    }
});

const emits = defineEmits(['like-clicked']);

const isLiked = ref(false);
const likeCount = ref(124); // 임시 값, 실제로는 API에서 받아와야 함

const clickLikeBtn = async () => {
    try {
        // 좋아요 API 호출 구현 필요
        if (props.postId) {
            console.log('게시글 좋아요 클릭 - 게시글 ID:', props.postId);
            // await likePost(props.postId);
        } else if (props.commentId) {
            console.log('댓글 좋아요 클릭 - 댓글 ID:', props.commentId);
            // await likeComment(props.commentId);
        }
        
        // 임시로 UI 업데이트
        isLiked.value = !isLiked.value;
        likeCount.value += isLiked.value ? 1 : -1;
        
        // 부모 컴포넌트에 이벤트 전달
        emits('like-clicked', { isLiked: isLiked.value, count: likeCount.value });
        
    } catch (error) {
        console.error('좋아요 처리 실패:', error);
    }
};
</script>

<template>
<button class="post-action-btn like-btn" :class="{ 'liked': isLiked }" @click="clickLikeBtn">
    <i class="fas fa-heart"></i>
    {{ likeCount }}
</button>
</template>

<style scoped>
.post-action-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    display: flexbox;
    align-items: center;
    gap: 0.5rem;
    transition: var(--transition);
}

.post-action-btn:hover {
    background-color: var(--hover-color);
    color: var(--text-primary);
}

.post-action-btn.liked {
    color: var(--primary-color);
}
</style>