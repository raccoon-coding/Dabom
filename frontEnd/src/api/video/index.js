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
    formData.append('video', file)

    await api.post(url, formData)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};


export default { getVideoList, uploadVideo }
