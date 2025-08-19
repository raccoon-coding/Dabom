<script setup>
import channelCommentModal from '@/components/channel/ChannelCommentModal.vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    postData: {
        type: Object,
        required: true
    }
});

const router = useRouter();

const clickLikeBtn = () => {
    // 좋아요 기능 구현
};

const clickPost = () => {
    router.push(`/channel/community/${props.postData.idx}`);
};
</script>

<template>
<div class="community-post">
    <div class="posts"> 
        <div class="post-header">
            <div class="post-author">
                <img src="https://via.placeholder.com/40" alt="채널" class="author-avatar">
                <div class="author-info">
                    <span class="author-name">크리에이티브 채널</span>
                    <span class="post-time">{{ postData.createAt }}</span>
                </div>
            </div>
            <div class="post-title">
                <span class="title">{{ postData.title }}</span>
            </div>
        </div>
        <div class="post-content">
            <p>{{ postData.contents }}</p>
            <!-- 이미지가 있다면 표시 -->
            <div class="post-image" v-if="postData.imageUrl">
                <img :src="postData.imageUrl" alt="게시물 이미지">
            </div>
        </div>
    </div>
    <div class="post-actions">
        <button class="post-action-btn like-btn" @click="clickLikeBtn">
            <i class="fas fa-heart"></i>
            124 
        </button>
        <button class="post-action-btn comment-btn" @click="clickPost">
            <i class="fas fa-comment"></i>
            {{ postData.commentCount }} 
        </button>
    </div>
    <div v-if="commentModal" @click.stop>
        <channelCommentModal />
    </div>
</div>
</template>

<style scoped>
    @import url('@/assets/channel/ChannelPostCard.css');
</style>