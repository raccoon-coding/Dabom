<script setup>

const emits = defineEmits([''])

const clickLikeBtn = () => {

}
</script>

<template>
<button class="post-action-btn like-btn" @click="clickLikeBtn">
    <i class="fas fa-heart"></i>
        124
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