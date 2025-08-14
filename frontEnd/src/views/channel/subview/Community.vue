<script setup>
import ChannelPostCard from '@/components/channel/ChannelPostCard.vue';
import { ref, onMounted } from 'vue';
import { getChannelBoardList } from '@/api/channel';

const posts = ref([]);
const loading = ref(false);

const fetchPosts = async () => {
    loading.value = true;
    try {
        const response = await getChannelBoardList();
        console.log('받은 게시글 데이터:', response);
        posts.value = response; // 이미 API에서 content 배열만 반환
    } catch (error) {
        console.error('게시글 로딩 실패:', error);
        posts.value = [];
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchPosts();
});
</script>

<template>
<section class="content-tab" id="community-tab">
    <div class="tab-header">
        <h2>커뮤니티</h2>
    </div>

    <div class="community-posts">
        <div v-if="loading">로딩 중...</div>
        <div v-else-if="posts.length === 0">게시글이 없습니다.</div>
        <ChannelPostCard 
            v-else
            v-for="post in posts" 
            :key="post.idx"
            :post-data="post"
        />
    </div>
</section>
</template>

<style scoped>
    @import url('@/assets/channel/communityHeader.css');
</style>