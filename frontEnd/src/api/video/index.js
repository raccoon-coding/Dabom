import api from "@/plugins/axiosinterceptor";

export const getVideoList = async (page = 0, size = 10, keyword = '') => {
    const url = `/api/search/videos?page=${page}&size=${size}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''}`;
    try {
        const response = await api.get(url);
        return response.data.data;
    } catch (error) {
        console.error('API 호출 실패:', error);
        throw error;
    }
};

export const uploadVideo = async (file) => {
    const url = `/api/videos/upload`;
    let data = {};

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await api.post(url, formData);
        data = response.data;
    } catch (error) {
        console.error('비디오 업로드 실패:', error);
        data = error.response?.data || { error: '업로드 실패' };
    }

    return data;
};

export const uploadVideoMetadata = async (videoId, metadata) => {
    const url = `/api/videos/metadata/${videoId}`;
    let data = {};

    try {
        const response = await api.patch(url, metadata); // POST -> PATCH로 변경 (컨트롤러에 맞춤)
        console.log(response);
        data = response.data;
    } catch (error) {
        console.error('메타데이터 저장 실패:', error);
        data = error.response?.data || { error: '메타데이터 저장 실패' };
    }

    return data;
};

export default { getVideoList, uploadVideo, uploadVideoMetadata };