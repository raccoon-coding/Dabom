<script setup>
import {ref} from 'vue'
import VideoListComp from "@/components/channel/video-management/VideoListComp.vue";
import VideoUploadModal from "@/components/channel/video-management/VideoUploadModal.vue";

const videos = ref([
  {
    videoId: 1,
    title: '프로젝트 소개 영상',
    duration: '2:00',
    description: '아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어',
    rating: 4.2,
    views: '1.2K',
    isVisibility: true,
    uploadedAt: 5,
    channel: {
      name: '개발팀 채널'
    },
    // 추가 관리용 데이터
    fileName: '프로젝트 소개 영상.mp4',
    thumbnail: '/thumbnails/video1.jpg',
    size: 15728640,
    uploadDate: new Date('2024-01-15')
  },
  {
    videoId: 2,
    title: '튜토리얼 영상',
    description: '아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어아에이오우어',
    duration: '5:00',
    rating: 4.8,
    views: '2.5K',
    isVisibility: false,
    uploadedAt: 10,
    channel: {
      name: '교육팀 채널'
    },
    // 추가 관리용 데이터
    fileName: '튜토리얼 영상.mp4',
    thumbnail: '/thumbnails/video2.jpg',
    size: 52428800,
    uploadDate: new Date('2024-01-10')
  },
  {
    videoId: 3,
    title: '그냥 개쩌는 영상',
    description: '미쳤음',
    duration: '12:34',
    rating: 5,
    views: '65.5M',
    isVisibility: false,
    uploadedAt: 10,
    channel: {
      name: '교육팀 채널'
    },
    // 추가 관리용 데이터
    fileName: '튜토리얼 영상.mp4',
    thumbnail: '/thumbnails/video2.jpg',
    size: 52428800,
    uploadDate: new Date('2024-01-10')
  }
])

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
const showUploadModal = ref(false)
const uploadFiles = ref([])
const isUploading = ref(false)
const uploadProgress = ref(0)

// 업로드 처리
const uploadVideos = async () => {
  if (!uploadFiles.value.length) return

  isUploading.value = true

  try {
    for (let i = 0; i < uploadFiles.value.length; i++) {
      const file = uploadFiles.value[i]

      // 실제 업로드 API 호출
      await uploadSingleVideo(file)

      // 진행률 업데이트
      uploadProgress.value = Math.round(((i + 1) / uploadFiles.value.length) * 100)
    }

    // 업로드 완료 후 리스트 새로고침
    await refreshVideoList()
    closeUploadModal()

  } catch (error) {
    console.error('업로드 실패:', error)
    alert('업로드 중 오류가 발생했습니다.')
  } finally {
    isUploading.value = false
  }
}

// 비디오 액션들
const playVideo = (video) => {
  console.log('비디오 재생:', video)
  // 비디오 플레이어 모달 또는 새 탭에서 재생
}

const editVideo = (video) => {
  console.log('비디오 편집:', video)
  // 편집 모달 열기
}

const deleteVideo = (videoId) => {
  if (confirm('정말로 이 비디오를 삭제하시겠습니까?')) {
    videos.value = videos.value.filter(v => v.id !== videoId)
    // 실제로는 API 호출: await axios.delete(`/api/videos/${videoId}`)
  }
}
// 모달 제어
const openUploadModal = () => {
  showUploadModal.value = true
}

const closeUploadModal = () => {
  showUploadModal.value = false
  uploadFiles.value = []
  uploadProgress.value = 0
  isUploading.value = false
}

const uploadSingleVideo = async (file) => {
  // 실제 API 호출 로직
  const formData = new FormData()
  formData.append('video', file)

  // 예시: axios 사용
  // return await axios.post('/api/videos/upload', formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // })

  // 임시 지연 (실제로는 제거)
  return new Promise(resolve => setTimeout(resolve, 100000))
}

const refreshVideoList = async () => {
  // 비디오 리스트 새로고침 API 호출
  // const response = await axios.get('/api/videos')
  // videos.value = response.data
}


</script>

<template>
  <section id="section-videos" class="dashboard-section" :class="{ active: isActive }">
    <!-- 헤더 영역 -->
    <div class="section-header">
      <h2>비디오 관리</h2>
      <button v-if="videos.length > 0" @click="openUploadModal" class="upload-btn">
        <i class="icon-plus"></i>
        비디오 업로드
      </button>
    </div>

    <VideoListComp :videos="videos"/>
    <VideoUploadModal :visible="showUploadModal" @close="closeUploadModal"/>
  </section>
</template>



<style scoped>
.dashboard-section {
  padding: 2rem 1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: var(--transition);
  background-color: var(--background-color);
  color: var(--text-primary);
}

.dashboard-section.active {
  opacity: 1;
  transform: translateY(0);
}

/* 헤더 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: var(--transition);
}

.upload-btn:hover {
  background: #ff3838;
  transform: translateY(-2px);
}

/* 비디오 리스트 */
.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.video-item {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
}

.video-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 180px;
  background: var(--hover-color);
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.2s;
}

.video-item:hover .play-overlay {
  opacity: 1;
}

.duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
}

.video-info {
  padding: 12px;
}

.video-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-meta {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.video-actions {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s;
}

.video-item:hover .video-actions {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  background: rgba(46, 46, 46, 0.9);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  transition: var(--transition);
}

.action-btn:hover {
  background: var(--hover-color);
}

.action-btn.delete:hover {
  background: var(--primary-color);
  color: white;
}


/* 모달 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-primary);
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: var(--transition);
}

.close-btn:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.upload-area {
  border: 2px dashed var(--border-color);
  border-radius: 15px;
  padding: 2.5rem;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  background: var(--background-color);
}

.upload-area:hover,
.upload-area.drag-over {
  border-color: var(--primary-color);
  background: var(--hover-color);
}

.upload-placeholder i {
  font-size: 48px;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.upload-placeholder h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.upload-placeholder p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.selected-files {
  text-align: left;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: var(--card-bg);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-info i {
  font-size: 24px;
  color: var(--primary-color);
}

.file-name {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.file-size {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.remove-file {
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  color: var(--text-secondary);
  transition: var(--transition);
}

.remove-file:hover {
  color: var(--primary-color);
}

.upload-progress {
  margin-top: 1.5rem;
}

.progress-bar {
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s;
}

.upload-progress p {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-align: center;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-upload {
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: var(--transition);
}

.btn-cancel {
  background: var(--card-bg);
  color: var(--text-primary);
}

.btn-cancel:hover {
  background: var(--hover-color);
}

.btn-upload {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.btn-upload:hover {
  background: #ff3838;
}

.btn-upload:disabled {
  background: var(--border-color);
  border-color: var(--border-color);
  cursor: not-allowed;
  color: var(--text-secondary);
}

/* 아이콘 폰트 대체 (실제로는 Font Awesome 등 사용) */
.icon-plus:before {
  content: '+';
}

.icon-play:before {
  content: '▶';
}

.icon-edit:before {
  content: '✏';
}

.icon-delete:before {
  content: '🗑';
}

.icon-close:before {
  content: '×';
}

.icon-upload:before {
  content: '↑';
}

.icon-video:before {
  content: '🎬';
}

.icon-video-empty:before {
  content: '📹';
}
</style>