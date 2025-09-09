<script setup>
import VideoCardComp from '@/components/videos/VideoCardComp.vue'
import CreateTogetherModal from "@/components/together/CreateTogetherModal.vue";
import {reactive} from "vue";

const props = defineProps(['title', 'icon', 'videos'])
const modalState = reactive({
  together: false
})

const showTogetherModal = () => {
  modalState.together = true
}

const closeTogetherModal = () => {
  modalState.together = false
}
</script>

<template>
    <section class="video-section">
        <div class="section-header">
            <h3 class="section-title">
                <i :class="icon"></i>
                {{ title }}
            </h3>
<!--            <button class="see-all-btn">모두 보기</button>-->
        </div>

        <div class="video-grid">
            <VideoCardComp v-for="video in props.videos" :key="video.id" :video="video" @openModal="showTogetherModal" />
        </div>
    </section>
  <CreateTogetherModal
      v-if="modalState.together"
      :visible="modalState.together"
      @close="closeTogetherModal"
  />
</template>

<style scoped>
.video-section {
    margin-bottom: 6.558rem;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
}

.section-title i {
    margin-right: 8px;
}

.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: var(--spacing-lg);
}

.see-all-btn {
    background: none;
    border: none;
    color: var(--primary-color);
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
}
</style>
