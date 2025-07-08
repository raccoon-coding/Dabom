<script setup>

</script>

<template>
    <div class="video-fix-container">
        <div class="video-fix-header">
            <h1>동영상 수정</h1>
        </div>

        <div class="video-fix-content">
            <form class="video-fix-form">
                <div class="form-group">
                    <label for="videoTitle">제목:</label>
                    <input type="text" id="videoTitle" v-model="videoTitle" />
                </div>
                <div class="form-group">
                    <label for="videoDescription">설명:</label>
                    <textarea id="videoDescription" v-model="videoDescription"></textarea>
                </div>
                <div class="form-group">
                    <label for="videoTags">태그 (태그 선택):</label>
                    <select id="videoTags" v-model="selectedTags" multiple>
                        <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <p>아동용 콘텐츠 여부</p>
                    <label>
                        <input type="radio" name="agreement" value="yes" v-model="selected" />
                        <span>아동용 콘텐츠 입니다</span>
                    </label>
                    <label>
                        <input type="radio" name="agreement" value="no" v-model="selected" />
                        <span>아동용 콘텐츠가 아닙니다</span>
                    </label>
                    
                    <p>공개범위</p>
                    <label>
                        <input type="radio" name="agreement" value="yes" v-model="selected" />
                        <span>공개</span>
                    </label>
                    <label>
                        <input type="radio" name="agreement" value="no" v-model="selected" />
                        <span>비공개</span>
                    </label>
                </div>
            </form>

            <div class="video-preview-section">
    <h3>썸네일</h3>
    <div class="thumbnail-upload-area">
        <div class="video-player-placeholder">
            <img v-if="thumbnailUrl" :src="thumbnailUrl" alt="썸네일 미리보기" />
            <span v-else>미리보기</span>
        </div>
        <div class="form-group upload-button-group">
            <label for="videoThumbnail" class="btn-upload">썸네일 업로드</label>
            <input type="file" id="videoThumbnail" @change="handleThumbnailUpload" style="display:none;" />
        </div>
    </div>
</div>
        </div>

        <div class="video-actions">
            <button type="button" class="btn-cancel">취소</button>
            <button type="button" class="btn-save" @click="saveVideoDetails">저장</button>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/channel/Video_Fix.css';
</style>
