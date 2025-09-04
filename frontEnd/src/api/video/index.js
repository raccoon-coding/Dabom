// video.index js

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
        data = error.response?.data || {error: '업로드 실패'};
    }


    return data;
};

export const uploadVideoMetadata = async (videoIdx, metadata) => {
    const url = `/api/videos/metadata/${videoIdx}`;
    let data = {};

    try {
        const response = await api.patch(url, metadata, {
            timeout: 0,
        });
        console.log(response);
        data = response.data;
    } catch (error) {
        console.error('메타데이터 저장 실패:', error);
        data = error.response?.data || {error: '메타데이터 저장 실패'};
    }

    return data;
};

export const getPresignedUrl = async (fileInfo) => {
    const requestUrl = `/api/videos/presigned`

    try {
        const response = await api.post(requestUrl, fileInfo)
        return response.data
    } catch (error) {
        console.error('Presigned URL 요청 실패:', error)
        throw error
    }
}

export const uploadToPresignedUrl = async (presignedUrl, file) => {
    const axiosResponse = await api.put(presignedUrl, file, {
        headers: {
            'Content-Type': file.type
        },
        timeout: 120000, // 2분으로 오버라이드
        maxBodyLength: Infinity,
        maxContentLength: Infinity
    });
    return axiosResponse;
}

export const getMyVideoList = async () => {
    const requestUrl = `/api/channels/videos/manage`

    return await api.get(requestUrl)
        .then((response) => {
            return response.data
        })
        .catch((error) => {
            console.error("내 비디오 리스트 요청 실패", erro)
            throw error;
        })
}

export const deleteVideo = async (videoIdx) => {
    console.log('API 함수 내부 videoIdx:', videoIdx); // 이것도 추가로 확인해보세요
    const requestUrl = `/api/videos/metadata/${videoIdx}`
    console.log('요청 URL:', requestUrl); // URL도 확인

    await api.delete(requestUrl)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.error(error)
            throw error
        })
}


export default {
    uploadVideo, uploadVideoMetadata, uploadToPresignedUrl,
    getVideoList, getPresignedUrl, getMyVideoList,
    deleteVideo
}


