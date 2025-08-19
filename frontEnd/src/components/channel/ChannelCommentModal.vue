<script setup>
import { ref } from 'vue';
import { createBoardComment } from '@/api/channel';

const props = defineProps({
    postId: {
        type: [String, Number],
        required: true
    },
    parentCommentId: {
        type: [String, Number],
        default: null
    }
});

const emit = defineEmits(['comment-created', 'close']);

const commentText = ref('');
const isSubmitting = ref(false);

const handleSubmitComment = async () => {
    if (!commentText.value.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }

    isSubmitting.value = true;
    
    try {
        const commentData = {
            content: commentText.value.trim(),
        };

        const response = await createBoardComment(props.postId, commentData);
        
        if (response.code === 200) {
            alert('댓글이 작성되었습니다.');
            commentText.value = '';
            emit('comment-created');
        } else {
            throw new Error(response.message || '댓글 작성에 실패했습니다.');
        }
    } catch (error) {
        console.error('댓글 작성 실패:', error);
        alert('댓글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
        isSubmitting.value = false;
    }
};

const handleCancel = () => {
    commentText.value = '';
    emit('close');
};

// ESC 키로 모달 닫기
const handleKeydown = (event) => {
    if (event.key === 'Escape') {
        handleCancel();
    }
};
</script>

<template>
<div class="comment-modal-overlay" @click="handleCancel" @keydown="handleKeydown">
    <div class="comment-modal-form" @click.stop>
        <div class="comment-modal-box">
            <div class="modal-header">
                <h3>{{ parentCommentId ? '답글 작성' : '댓글 작성' }}</h3>
                <button class="close-btn" @click="handleCancel">×</button>
            </div>
            
            <div class="comment-input-section">
                <img class="profile" src="https://via.placeholder.com/30" alt="내 프로필">
                <textarea 
                    v-model="commentText"
                    class="comment-box" 
                    placeholder="댓글을 입력해주세요..."
                    rows="4"
                    :disabled="isSubmitting"
                    @keydown.ctrl.enter="handleSubmitComment"
                ></textarea>
            </div>
            
            <div class="comment-modal-button">
                <button 
                    class="btn btn-primary" 
                    @click="handleSubmitComment"
                    :disabled="isSubmitting || !commentText.trim()"
                >
                    {{ isSubmitting ? '작성 중...' : (parentCommentId ? '답글달기' : '댓글달기') }}
                </button>
                <button class="btn btn-close" @click="handleCancel" :disabled="isSubmitting">
                    취소
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.comment-modal-overlay {
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

.comment-modal-form {
    background: white;
    border-radius: 12px;
    padding: 0;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.comment-modal-box {
    padding: 1.5rem;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.25rem;
}

.close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 0.25rem;
    line-height: 1;
}

.close-btn:hover {
    color: var(--text-primary);
}

.comment-input-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 0.25rem;
}

.comment-box {
    flex: 1;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.75rem;
    resize: vertical;
    font-family: inherit;
    font-size: 0.875rem;
    line-height: 1.5;
}

.comment-box:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.comment-box:disabled {
    background-color: var(--disabled-bg);
    cursor: not-allowed;
}

.comment-modal-button {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
}

.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-primary {
    background-color: var(--primary-color, #3b82f6);
    color: white;
}

.btn-primary:hover:not(:disabled) {
    background-color: var(--primary-hover, #2563eb);
}

.btn-primary:disabled {
    background-color: var(--disabled-bg, #e5e7eb);
}

.btn-close {
    background-color: var(--secondary-bg, #f3f4f6);
    color: var(--text-secondary);
}

.btn-close:hover:not(:disabled) {
    background-color: var(--hover-bg, #e5e7eb);
}
</style>