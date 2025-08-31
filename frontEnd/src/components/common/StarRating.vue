<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import api from '@/api/score'; // score API 임포트

const props = defineProps({
  modelValue: { // v-model 지원을 위한 prop
    type: Number,
    default: 0,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  starSize: {
    type: String,
    default: '24px', // 기본 별 크기
  },
  color: {
    type: String,
    default: '#FFD700', // 기본 별 색상 (금색)
  },
  emptyColor: {
    type: String,
    default: '#ccc', // 빈 별 색상
  },
  videoInfo: { // 비디오 정보 prop (VIDEO 타입일 경우)
    type: Object,
    default: null,
  },
  channelInfo: { // 채널 정보 prop (CHANNEL 타입일 경우)
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']); // v-model 업데이트 이벤트

const currentRating = ref(props.modelValue); // 현재 표시될 별점 (사용자 평점 또는 평균 평점)
const userRatedScore = ref(0); // 사용자가 매긴 평점 (초기화용)
const userScoreIdx = ref(null); // 사용자가 매긴 평점의 idx (업데이트용)
const hoverRating = ref(0); // 드래그/호버 중인 별점
const isDragging = ref(false); // 드래그 중인지 여부


// 평점 대상 정보 (비디오 또는 채널) 및 타입 결정
const scoreTarget = computed(() => {
  if (props.videoInfo && props.videoInfo.idx) {
    return { type: 'VIDEO', info: props.videoInfo, idx: props.videoInfo.idx };
  } else if (props.channelInfo && props.channelInfo.idx) {
    return { type: 'CHANNEL', info: props.channelInfo, idx: props.channelInfo.idx };
  }
  return null;
});

// modelValue prop이 변경될 때 currentRating 업데이트 (외부에서 v-model로 변경될 경우)
watch(() => props.modelValue, (newValue) => {
  currentRating.value = newValue;
});

// 평점 대상 정보가 변경되거나 컴포넌트 마운트 시 평점 로드
watch(scoreTarget, async (newTarget) => {
  if (!newTarget || !newTarget.idx) {
    currentRating.value = 0;
    userRatedScore.value = 0;
    userScoreIdx.value = null;
    emit('update:modelValue', currentRating.value);
    return;
  }

  const memberIdx = parseInt(localStorage.getItem('memberIdx'));
  if (!isNaN(memberIdx)) {
    try {
      // 1. 사용자가 매긴 평점 조회
      const response = await api.getUserScoreForVideo(newTarget.idx, memberIdx); // API는 videoIdx만 받으므로, channel용 API 필요
      // TODO: channelInfo용 getUserScoreForChannel API 필요
      // 현재는 videoInfo.idx만 사용 가능
      if (newTarget.type === 'VIDEO' && response && response.data && response.data.score !== undefined) {
        userRatedScore.value = response.data.score;
        userScoreIdx.value = response.data.idx;
        currentRating.value = response.data.score;
      } else {
        // 2. 사용자가 매긴 평점이 없으면 평균 평점 조회
        const avgScore = await api.getAverageScore(newTarget.type, newTarget.idx);
        currentRating.value = avgScore;
        userRatedScore.value = 0;
        userScoreIdx.value = null;
      }
    } catch (error) {
      console.error('사용자 평점 또는 평균 평점 로드 실패:', error);
      // 에러 발생 시에도 평균 평점 로드 시도 (네트워크 에러 등)
      const avgScore = await api.getAverageScore(newTarget.type, newTarget.idx);
      currentRating.value = avgScore;
      userRatedScore.value = 0;
      userScoreIdx.value = null;
    }
  }
  emit('update:modelValue', currentRating.value);
}, { immediate: true }); // 컴포넌트 마운트 시 즉시 실행

const stars = computed(() => {
  const displayRating = hoverRating.value > 0 ? hoverRating.value : currentRating.value;
  const starArray = [];
  for (let i = 1; i <= props.maxStars; i++) {
    starArray.push({
      filled: i <= displayRating,
      hovered: i <= hoverRating.value && hoverRating.value > 0,
    });
  }
  return starArray;
});

const getStarColor = (star) => {
  if (star.hovered) {
    return props.color;
  } else if (star.filled) {
    return props.color;
  } else {
    return props.emptyColor;
  }
};

const startDrag = (event) => {
  if (!props.editable) return;
  isDragging.value = true;
  onMouseMove(event);
};

const onMouseMove = (event) => {
  if (!props.editable || !isDragging.value) return;
  const starContainer = event.currentTarget;
  const rect = starContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const starWidth = rect.width / props.maxStars;
  const newRating = Math.ceil(x / starWidth);
  hoverRating.value = Math.min(Math.max(0, newRating), props.maxStars);
};

const endDrag = () => {
  if (!props.editable) return;
  isDragging.value = false;
  hoverRating.value = 0; // 드래그 종료 후 호버 상태 초기화
};

const setRating = (rating) => {
  if (!props.editable) return;
  hoverRating.value = rating; // 클릭 시 호버 평점만 업데이트
};

const resetHover = () => {
  if (!props.editable || isDragging.value) return;
  hoverRating.value = 0;
};

// 평점 제출 함수 (API 호출)
const submitRating = async (ratingToSubmit) => {
  if (!props.editable || ratingToSubmit === 0) return; // 편집 불가능하거나 선택된 평점 없으면 리턴

  if (!memberStore.isLogin) {
    alert('로그인 후 평점을 매길 수 있습니다.');
    return;
  }

  const memberIdx = parseInt(localStorage.getItem('memberIdx'));
  if (isNaN(memberIdx)) {
    alert('사용자 정보를 찾을 수 없습니다. 다시 로그인해주세요.');
    return;
  }

  const target = scoreTarget.value;
  if (!target || !target.idx) {
    alert('평점 대상 정보가 없어 평점을 매길 수 없습니다.');
    return;
  }

  const scoreData = {
    score: ratingToSubmit,
    member: { idx: memberIdx }, // 평점을 매기는 멤버 정보
    scoreType: target.type,
  };

  // 비디오 또는 채널 정보 동적 할당
  if (target.type === 'VIDEO') {
    scoreData.video = { idx: target.idx };
  } else if (target.type === 'CHANNEL') {
    scoreData.channel = { idx: target.idx };
  }

  try {
    if (userScoreIdx.value) {
      await api.updateScore({ ...scoreData, idx: userScoreIdx.value });
      alert('평점이 업데이트되었습니다!');
    } else {
      await api.registerScore(scoreData);
      alert('평점이 등록되었습니다!');
    }
    // 평점 등록/수정 후 평균 평점 및 사용자 평점 다시 불러오기
    const updatedAvgScore = await api.getAverageScore(target.type, target.idx);
    currentRating.value = updatedAvgScore;
    emit('update:modelValue', currentRating.value);

    // 사용자 평점 다시 조회하여 userRatedScore 및 userScoreIdx 업데이트
    // TODO: channelInfo용 getUserScoreForChannel API 필요
    const updatedUserScoreResponse = await api.getUserScoreForVideo(target.idx, memberIdx); // 현재는 videoInfo.idx만 사용 가능
    if (target.type === 'VIDEO' && updatedUserScoreResponse && updatedUserScoreResponse.data && updatedUserScoreResponse.data.score !== undefined) {
      userRatedScore.value = updatedUserScoreResponse.data.score;
      userScoreIdx.value = updatedUserScoreResponse.data.idx;
    } else {
      userRatedScore.value = 0;
      userScoreIdx.value = null;
    }

  } catch (error) {
    console.error('평점 처리 실패:', error);
    let errorMessage = '알 수 없는 오류가 발생했습니다.';
    if (error.message) {
        errorMessage = error.message;
    } else if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
    }
    alert(errorMessage);
  } finally {
    hoverRating.value = 0;
  }
};

</script>

<template>
  <div
    class="star-rating-container star-rating-interactive"
    @mousedown="startDrag"
    @mousemove="onMouseMove"
    @mouseup="endDrag"
    @mouseleave="resetHover"
  >
    <i
      v-for="(star, index) in stars"
      :key="index"
      class="fas fa-star"
      :style="{ color: getStarColor(star), fontSize: '1.5rem', cursor: editable ? 'pointer' : 'default' }"
      @click="setRating(index + 1)"
      @mouseover="editable && (hoverRating = index + 1)"
      @mouseleave="editable && (hoverRating = 0)"
    ></i>
    <button v-if="editable && hoverRating > 0" @click="submitRating(hoverRating)" style="margin-left: 10px; padding: 5px 10px; cursor: pointer;">
      평점 매기기
    </button>
  </div>
</template>

<style scoped>
.star-rating-container {
  display: inline-flex;
  align-items: center;
  user-select: none; /* 드래그 시 텍스트 선택 방지 */
  gap: 0.125rem; /* main.css의 .star-rating과 유사하게 별 간격 추가 */
}

.star-rating-container i {
  transition: color 0.2s ease;
  color: var(--empty-color); /* 기본 빈 별 색상 */
}

/* 채워진 별 색상은 컴포넌트 props.color로 제어 */

button { /* 평점 매기기 버튼 스타일 */
  background-color: var(--primary-color); /* main.css의 primary-color 사용 */
  color: white;
  border: none;
  padding: 0.5rem 1rem; /* 적절한 패딩 */
  border-radius: 5px; /* 둥근 모서리 */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease; /* main.css의 transition 변수 사용 */
  margin-left: 10px;
  font-size: 0.875rem; /* 폰트 크기 조정 */
}

button:hover {
  background-color: #ff3838; /* hover 색상 */
  transform: translateY(-1px); /* 살짝 위로 이동 효과 */
}
</style>
