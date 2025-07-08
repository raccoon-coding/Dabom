<script setup>
import channelComment from '@/components/channel/ChannelComment.vue';
import channelCommentModal from '@/components/channel/ChannelCommentModal.vue';
import likeBtn from '@/components/channel/LikeBtn.vue';

</script>

<template>
<div class="community-post">
    <div class="post-header">
        <div class="post-author">
            <img src="https://via.placeholder.com/40" alt="채널" class="author-avatar">
            <div class="author-info">
                <span class="author-name">크리에이티브 채널</span>
            </div>
            <span class="post-time">3시간 전</span>
        </div>
        <div class="post-title">
            <span class="title">제목입니다.</span>
        </div>
    </div>
    <div class="post-content">
        <p>안녕하세요! 새로운 Together 모드 업데이트에 대한 피드백을 받고 있습니다. 어떤 기능을 추가했으면 좋겠는지 댓글로 알려주세요! 🎉</p>
        <div class="post-image">
            <img src="https://via.placeholder.com/500x300" alt="게시물 이미지">
        </div>
    </div>
    <div class="post-actions">
        <likeBtn />                          
    </div>
    <div v-for="n in 10">
            <channelComment />
        </div>
    <!-- <template>
        <div v-for="n in 10">
            <channelComment />
        </div>
    </template> -->
    <channelCommentModal />
</div>
</template>

<style scoped>
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
</style>