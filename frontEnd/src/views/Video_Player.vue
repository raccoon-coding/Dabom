<script setup>
import Video_Main_Info from '../components/Video_Player/Video_Main_Info.vue'
import Video_Tag_Explain from '../components/Video_Player/Video_Tag_Explain.vue'
import Video_Recommend from '../components/Video_Player/Video_Recommend.vue'
import Video_Comment from '../components/Video_Player/Video_Comment.vue'
import { useRoute } from 'vue-router'
import { onMounted, reactive, ref, onUnmounted } from 'vue'
import Hls from 'hls.js'
import api from '@/api/video_player'
import video from "@/api/video/index.js"

const route = useRoute()
const videoId = route.params.id
const videoPlayer = ref(null)
let hls = null

const videoInfo = reactive({
  idx: '',
  title: '',
  description: '',
  savedPath: '',
  channel: {
    name: ''
  }
})

const getData = async () => {
  const result = await api.getVideoById(videoId)
  console.log(result)

  // videoInfo에 데이터 할당
  Object.assign(videoInfo, result.data) // 또는 result 구조에 맞게 수정

  // 데이터 로드 후 HLS 플레이어 초기화
  if (videoInfo.savedPath) {
    initHlsPlayer()
  }
}

const initHlsPlayer = () => {
  if (!videoPlayer.value || !videoInfo.savedPath) return

  const video = videoPlayer.value
  const videoUrl = `http://localhost:8080${videoInfo.savedPath}`

  // 기존 HLS 인스턴스 정리
  if (hls) {
    hls.destroy()
  }

  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(videoUrl)
    hls.attachMedia(video)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log('HLS 비디오 로드 완료')
    })

    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error('HLS 에러:', data)
    })
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // Safari 네이티브 HLS 지원
    video.src = videoUrl
  }
}

onMounted(() => {
  getData()
})

onUnmounted(() => {
  if (hls) {
    hls.destroy()
    hls = null
  }
})
</script>

<template>
  <div class="video-container">
    <div class="video-player-section">
      <!-- Left Column -->
      <div class="main-content-column">
        <div class="video-player-wrapper">
          <!-- 실제 비디오 플레이어 -->
<!--          <video id="mainVideoPlayer" class="video-player" :src="videoInfo.savedPath" controls>-->
<!--            Your browser does not support the video tag.-->
<!--          </video>-->

          <video
              ref="videoPlayer"
              class="video-player"
              controls muted autoplay>
            Your browser does not support the video tag.
          </video>
        </div>
        <h2>{{ videoInfo.title }}</h2>
        <Video_Main_Info :videoInfo="videoInfo"></Video_Main_Info>
        <Video_Tag_Explain :videoInfo="videoInfo"></Video_Tag_Explain>
        <Video_Comment></Video_Comment>
      </div>
      <!-- Right Sidebar -->
      <div class="recommended-sidebar">
        <Video_Recommend></Video_Recommend>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url(../assets/Video_Player/Video_Player.css);
</style>