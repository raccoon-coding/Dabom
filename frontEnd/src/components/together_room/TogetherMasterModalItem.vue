<script setup>

</script>

<template>
    <div class="participant-item">
        <div class="participant-info">
            <div class="participant-avatar">김</div>
            <div class="participant-details">
                <div class="participant-name">김철수</div>
                <div class="participant-status">방장</div>
            </div>
        </div>
        <div class="master-badge">마스터</div>
    </div>

    <div class="participant-item">
        <div class="participant-info">
            <div class="participant-avatar">이</div>
            <div class="participant-details">
                <div class="participant-name">이영희</div>
                <div class="participant-status">온라인</div>
            </div>
        </div>
        <button class="kick-btn">강퇴</button>
    </div>
</template>

<style scoped>
@import url(@/assets/together_room/TogetherMasterModalItem.css);
</style>