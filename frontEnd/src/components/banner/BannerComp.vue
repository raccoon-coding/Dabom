<script setup>
import SearchQueryForm from '@/entity/SearchQueryForm'
import { reactive } from 'vue'
import SearchBarComp from '@/components/search/SearchBarComp.vue'


const state = reactive({
    searchQueryForm: new SearchQueryForm()
})

const onSubmit = () => {
    console.log("검색어")
}
</script>

<template>
    <section class="main-banner">
        <h1 class="main-banner_title">Welcome Dabom</h1>
        <p class="main-banner_subtitle">혼자 보는 영상에서 함께하는 경험으로</p>
        <SearchBarComp />
        <!-- <div class="search-container">
            <form class="search-form" @submit.prevent="onSubmit">
                <div class="search-input-wrapper">
                    <input type="text" v-model="state.searchQueryForm.query" placeholder="검색어를 입력하세요..."
                        class="search-input" />
                    <button type="submit" class="search-btn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </form>
        </div> -->
    </section>
</template>

<style scoped>
.main-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 15rem;
    margin-bottom: 5rem;
}

.main-banner_title {
    font-size: var(--font-xxl);
    font-weight: 700;
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
}

.main-banner_subtitle {
    font-size: var(--font-lg);
    color: var(--text-secondary);
    margin-bottom: 40px;
}

</style>
