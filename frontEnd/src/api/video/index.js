// video.index js

import api from "@/plugins/axiosinterceptor";


export const getVideoList = async () => {
    // TODO: paging 처리, 영상 키워드별 get
    const mockVideoListPath = `/api/video-list3.json`
    let data = {}

    await api.get(mockVideoListPath)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const uploadVideo = async (file) => {
    const url = `/api/videos/upload`
    let data = {}

    const formData = new FormData()
    formData.append('file', file)
    await api.post(url, formData)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const uploadVideoMetadata = async (videoId, metadata) => {
    const url = `/api/videos/metadata/${videoId}`
    let data = {}

    await api.patch(url, metadata)
        .then((response) => {
            console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.response?.data || { error: '메타데이터 저장 실패' }
        })

    return data
}


export default { getVideoList, uploadVideo, uploadVideoMetadata }