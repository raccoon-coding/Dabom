<script setup>
import { onMounted, reactive } from 'vue'
import api from '@/api/channel'
import imageApi from '@/api/image'

const props = defineProps({
  isActive: Boolean
})

const channelInfoForm = reactive({
  id: "12345",
  content: ''
})

const onSubmit = async() => {
  try {
    const res = await api.updateChannelInfo(channelInfoForm)
    console.log(res)
    alert('저장되었습니다!')
  } catch (error) {
    console.error("저장 실패:", error)
    alert('저장에 실패했습니다.')
  }
}

const onImageChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    const uploadResponse = await imageApi.imageUpload(file, "profile")
    const presignedUrl = uploadResponse.data.imageUrl // presigned URL
    
    const s3Response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type
      }
    })
    
    if (s3Response.ok) {
      console.log("프로필 이미지 S3 업로드 성공")
      alert('프로필 이미지가 업로드되었습니다!')
    } else {
      throw new Error(`S3 업로드 실패: ${s3Response.status}`)
    }
  } catch (err) {
    console.error("이미지 업로드 실패:", err)
    alert('이미지 업로드에 실패했습니다.')
  }
}

const onBannerChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    // 1단계: 백엔드에서 presigned URL 받기
    const uploadResponse = await imageApi.imageUpload(file, "banner")
    const presignedUrl = uploadResponse.data.imageUrl // presigned URL
    
    // 2단계: presigned URL을 사용해 S3에 직접 업로드
    const s3Response = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type
      }
    })
    
    if (s3Response.ok) {
      console.log("배너 이미지 S3 업로드 성공")
      alert('배너 이미지가 업로드되었습니다!')
    } else {
      throw new Error(`S3 업로드 실패: ${s3Response.status}`)
    }
  } catch (err) {
    console.error("배너 업로드 실패:", err)
    alert('배너 업로드에 실패했습니다.')
  }
}

onMounted(async () => {
  try {
    const result = await api.getChannelInfo()
    if (result && result.data) {
      channelInfoForm.id = result.data.id
      channelInfoForm.content = result.data.content
    }
  } catch (error) {
    console.error("채널 정보 로드 실패:", error)
  }
})
</script>

<template>
  <section id="section-info" class="dashboard-section" :class="{ active: props.isActive }">
    <h2>채널 정보 수정</h2>

    <form class="channel-info-form" @submit.prevent="onSubmit">
      <label>
        채널 설명
        <textarea rows="3" v-model="channelInfoForm.content" placeholder="창작과 영감을 나누는 공간입니다."></textarea>
      </label>
      <label>
        채널 프로필 이미지
        <input type="file" accept="image/*" @change="onImageChange">
      </label>
      <label>
        배너(커버) 이미지
        <input type="file" accept="image/*" @change="onBannerChange">
      </label>
      <button class="btn-save" type="submit"><i class="fas fa-save"></i> 저장</button>
    </form>
  </section>
</template>

<style scoped>
@import url(@/assets/channel/mychannel);
</style>