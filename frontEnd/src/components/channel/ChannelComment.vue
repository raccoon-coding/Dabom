<script setup>
import likeBtn from '@/components/channel/LikeBtn.vue';
import reCommentBtn from '@/components/channel/ReCommentBtn.vue';
import channelCommentModal from '@/components/channel/ChannelCommentModal.vue';

import { ref, reactive } from 'vue';

const body = reactive({
    hostname: '테스트 계정입니다.',
    hostProfile: 'https://via.placeholder.com/40',
    comment: '테스트 댓글입니다.',
    createAt: '3시간 전'
})
const recommentModal = ref(false)

const clickRecomment = () => {
    recommentModal.value = !recommentModal.value;
}

// const body = reactive({
//     hostname: '',
//     hostProfile: '',
//     comment: '',
// })
</script>

<template>
<div class="comment-box">
    <div class="post-author">
        <img :src="body.hostProfile" alt="채널" class="author-avatar">
        <div class="author-info">
            <span class="author-name">{{ body.hostname }}</span>
        </div>
        <span class="post-time">{{ body.createAt }}</span>
    </div>
    <div class="content-box">
        {{ body.comment }}
    </div>
    <div>
        <likeBtn />
        <span @click="clickRecomment">
            <reCommentBtn />
        </span>
    </div>
    <channelCommentModal v-if="recommentModal" />
</div>
</template>

<style scoped>
.comment-box {
    margin-bottom: 1rem;
    background-color: var(--card-bg);
    border-radius: 15px;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
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

.author-name {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1rem;
}

.post-time {
    margin-right: 5%;
    color: var(--text-secondary);
    font-size: 0.875rem;
}

.content-box {
    color: var(--text-primary);
    line-height: 1.6;
    margin-bottom: 1rem;
}
</style>