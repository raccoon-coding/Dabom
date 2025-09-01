<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import useMemberStore from '@/stores/useMemberStore';
import api from '@/api/auth';

const props = defineProps({
  channelIdx: {
    type: [String, Number],
    required: true
  }
});

const route = useRoute();
const memberStore = useMemberStore();
const currentUserIdx = ref(null);
const channelInfo = ref(null);

// 현재 로그인한 사용자가 이 채널의 소유자인지 확인
const isOwner = computed(() => {
  return currentUserIdx.value && 
         currentUserIdx.value.toString() === props.channelIdx.toString();
});

// 현재 페이지가 채널 관리 페이지인지 확인
const isManagementPage = computed(() => {
  return route.name === 'mychannel';
});

// 현재 사용자 정보 조회
const getCurrentUserIdx = async () => {
  if (memberStore.checkLogin() && !currentUserIdx.value) {
    try {
      const result = await api.getCurrentMemberInfo();
      if (result.code === 200) {
        currentUserIdx.value = result.data.id;
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
    }
  }
}

// 채널 정보 조회
const getChannelInfo = async () => {
  try {
    if (isManagementPage.value) {
      // 관리 페이지: 내 정보 조회
      const result = await api.getCurrentMemberInfo();
      if (result.code === 200) {
        channelInfo.value = {
          name: result.data.name,
          profileImage: "@/assets/images/dabom2.png",
          subscriberCount: "0", 
          content: result.data.content
        };
      }
    } else {
      // 일반 채널: 해당 채널 정보 조회
      const result = await api.getChannelInfoByIdx(props.channelIdx);
      if (result.code === 200) {
        channelInfo.value = {
          name: result.data.name,
          profileImage: "@/assets/images/dabom2.png",
          subscriberCount: "0", // TODO: 구독자 수 계산
          content: result.data.content
        };
      }
    }
  } catch (error) {
    console.error('채널 정보 조회 실패:', error);
    // 기본값 설정
    channelInfo.value = {
      name: "채널 정보를 불러올 수 없습니다",
      profileImage: "@/assets/images/dabom2.png",
      subscriberCount: "0",
      content: ""
    };
  }
}

onMounted(async () => {
  await getCurrentUserIdx();
  await getChannelInfo();
});

// watch를 추가하여 라우트 변경 시 채널 정보 다시 로드
watch(
  () => route.name,
  async () => {
    await getChannelInfo();
  }
);
</script>

<template>
  <div class="channel-header">
    <div class="channel-info">
      <div class="profile-section">
        <img 
          :src="channelInfo?.profileImage || '@/assets/images/dabom2.png'" 
          alt="채널 프로필" 
          class="channel-profile-img"
        />
        <div class="channel-details">
          <h1 class="channel-name">{{ channelInfo?.name || '채널 이름' }}</h1>
          <div class="channel-meta">
            <span class="subscriber-count">구독자 {{ channelInfo?.subscriberCount || '0' }}명</span>
            <span class="video-count">동영상 0개</span>
          </div>
        </div>
      </div>
      
      <div class="channel-actions">
        <!-- 관리 페이지에서는 돌아가기 버튼 -->
        <RouterLink 
          v-if="isOwner && isManagementPage" 
          :to="{ name: 'channel', params: { channelIdx: currentUserIdx } }" 
          class="back-to-channel-btn"
        >
          <i class="fas fa-arrow-left"></i>
          채널로 돌아가기
        </RouterLink>
        
        <!-- 일반 채널 페이지에서는 관리 버튼 -->
        <RouterLink 
          v-else-if="isOwner && !isManagementPage" 
          :to="{ name: 'mychannel' }" 
          class="manage-channel-btn"
        >
          <i class="fas fa-cog"></i>
          채널 관리
        </RouterLink>
        
        <!-- 다른 사람 채널일 때는 구독 버튼 -->
        <button v-else-if="!isOwner" class="subscribe-btn">
          <i class="fas fa-bell"></i>
          구독
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.channel-header {
  background-color: var(--background-color);
  padding: 2rem 0;
  border-bottom: 1px solid var(--border-color);
}

.channel-info {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.channel-profile-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
}

.channel-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.channel-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.channel-meta {
  display: flex;
  gap: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.channel-actions {
  display: flex;
  gap: 1rem;
}

.back-to-channel-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--hover-color);
  color: var(--text-primary);
  text-decoration: none;
  border: 2px solid var(--border-color);
  border-radius: 20px;
  font-weight: 500;
  transition: var(--transition);
}

.back-to-channel-btn:hover {
  background-color: var(--border-color);
  border-color: var(--primary-color);
}

.manage-channel-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 500;
  transition: var(--transition);
}

.manage-channel-btn:hover {
  background-color: #ff3838;
  transform: translateY(-1px);
}

.subscribe-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.subscribe-btn:hover {
  background-color: var(--hover-color);
  border-color: var(--primary-color);
}

/* 반응형 */
@media (max-width: 768px) {
  .channel-info {
    flex-direction: column;
    gap: 1.5rem;
    align-items: flex-start;
  }
  
  .channel-name {
    font-size: 1.5rem;
  }
  
  .channel-profile-img {
    width: 60px;
    height: 60px;
  }
}
</style>