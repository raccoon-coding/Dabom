<script setup>

const emits = defineEmits([''])

const clickRecommentBtn = () => {

}
</script>

<template>
<button class="post-action-btn recomment-btn" @click="clickRecommentBtn">
    답글
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

.post-action-btn.recomment {
    color: var(--primary-color);
}
</style>