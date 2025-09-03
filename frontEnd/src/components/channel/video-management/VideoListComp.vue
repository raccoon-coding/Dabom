<script setup>
const props = defineProps(['videos'])

const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR')
  } catch {
    return dateString
  }
}
</script>

<template>
  <div>
    <table class="video-table">
      <thead>
      <tr>
        <th>동영상</th>
        <th>제목</th>
        <!--        <th>재생시간</th>-->
        <th>조회수</th>
        <th>평점</th>
        <th>상태</th>
        <th>업로드일</th>
        <th>관리</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="video in videos" :key="video.videoId" class="video-row">

        <td class="video-cell">
          <div class="video-wrapper">
            <img src='' :alt="video.title"/>
            <div class="play-overlay" @click="playVideo(video)">
              <i class="icon-play"></i>
            </div>
          </div>
        </td>

        <td class="title-cell">
          <div class="title-wrapper">
            <h4>{{ video.title }}</h4>
            <p class="description">{{ video.description }}</p>
          </div>
        </td>

        <!--        <td class="duration-cell">{{ video.duration }}</td>-->

        <td class="views-cell">{{ video.views }}</td>

        <td class="rating-cell">
          <div class="rating">
            <i class="icon-star"></i>
            {{ video.averageScore }}
          </div>
        </td>

        <td class="status-cell">
          <span>
            {{ video.isVisibility ? '공개' : '비공개' }}
          </span>
        </td>

        <td class="date-cell">{{ formatDate(video.uploadedAt) }}</td>

        <td class="actions-cell">
          <div class="action-buttons">
            <button @click="editVideo(video)" class="action-btn edit" title="편집">
              <i class="icon-edit"></i>
            </button>
            <button @click="deleteVideo(video.videoId)" class="action-btn delete" title="삭제">
              <i class="icon-delete"></i>
            </button>
          </div>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.video-table {
  width: 100%;
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  border-collapse: collapse;
  margin: var(--spacing-lg) 0;
}

.video-table thead {
  background-color: var(--border-color);
}

.video-table th {
  padding: var(--spacing-md);
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-sm);
  border-bottom: 2px solid var(--border-color);
}

.video-table tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

.video-table tbody tr:hover {
  background-color: var(--hover-color);
}

.video-table td {
  padding: var(--spacing-md);
  vertical-align: middle;
  color: var(--text-secondary);
  font-size: var(--font-sm);
}

/* 썸네일 셀 */
.video-cell {
  width: 120px;
}

.video-wrapper {
  position: relative;
  width: 100px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.video-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.video-wrapper:hover .play-overlay {
  opacity: 1;
}

.play-overlay i {
  color: white;
  font-size: var(--font-lg);
}

/* 제목 셀 */
.title-cell {
  max-width: 45vh;
  min-width: 80px;
}

.title-wrapper h4 {
  color: var(--text-primary);
  font-size: var(--font-md);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
}

/* 설명 셀 */
.description-cell {
  max-width: 300px;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

/* 재생시간, 조회수 셀 */
.duration-cell,
.views-cell {
  text-align: center;
  font-weight: 500;
  color: var(--text-primary);
}

/* 평점 셀 */
.rating-cell {
  text-align: center;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  color: var(--star-color);
  font-weight: 600;
}

.rating i {
  color: var(--star-color);
}

/* 상태 셀 */
.status-cell {
  text-align: center;
}

.status-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: 4px;
  transition: var(--transition);
}

.toggle-btn:hover {
  background-color: var(--hover-color);
  color: var(--text-primary);
}

/* 날짜 셀 */
.date-cell {
  text-align: center;
  font-size: var(--font-xs);
  white-space: nowrap;
}

/* 액션 셀 */
.actions-cell {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
}

.action-btn {
  background: none;
  border: none;
  padding: var(--spacing-sm);
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-secondary);
}

.action-btn:hover {
  background-color: var(--hover-color);
  color: var(--text-primary);
}

.action-btn.edit:hover {
  background-color: var(--primary-color);
  color: white;
}

.action-btn.delete:hover {
  background-color: #e74c3c;
  color: white;
}

/* 반응형 */
@media (max-width: 768px) {
  .video-table {
    font-size: var(--font-xs);
  }

  .video-table th,
  .video-table td {
    padding: var(--spacing-sm);
  }

  .video-wrapper {
    width: 80px;
    height: 45px;
  }

  .title-wrapper h4 {
    font-size: var(--font-sm);
  }

  .description-cell {
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  .video-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .video-table thead,
  .video-table tbody,
  .video-table th,
  .video-table td,
  .video-table tr {
    display: block;
  }

  .video-table thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .video-table tr {
    background-color: var(--card-bg);
    margin-bottom: var(--spacing-md);
    border-radius: 8px;
    padding: var(--spacing-md);
    white-space: normal;
  }

  .video-table td {
    border: none;
    position: relative;
    padding: var(--spacing-sm) 0;
    padding-left: 40%;
  }

  .video-table td:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 35%;
    font-weight: 600;
    color: var(--text-primary);
  }
}
</style>

