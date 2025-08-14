import api from "@/plugins/axiosinterceptor";


export const getChannelChart = async () => {

    const requestUrl = `/api/channel_stats.json`
    let data = {}

    await api.get(requestUrl)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const postChannelInfo = async () => {

    const requestUrl = `/api/channel_info.json`
    let data = {}

    await api.get(requestUrl,)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const updatePlaylistItem = async (playlistedit) => {

    const requestUrl = `/api/channel_playlist_update.json`
    let data = {}

    await api.get(requestUrl, playlistedit)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const deletePlaylistItem = async (playlistdelete) => {

    const requestUrl = `/api/channel_playlist_delete.json`
    let data = {}

    await api.get(requestUrl, playlistdelete)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const uploadVideo = async (videoform) => {

    const requestUrl = `/api/channel_uploadVideo.json`
    let data = {}

    await api.get(requestUrl, videoform)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const uploadThumbnail = async (Thumbnailform) => {

    const requestUrl = `/api/channel_thumbnail.json`
    let data = {}

    await api.get(requestUrl, Thumbnailform)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};
export const getChannelBoardList = async () => {
    const requestUrl = `http://localhost:8080/channel/board/list`; // baseURL 제거 (axiosinterceptor에서 처리)
    let data = [];

    await api.get(requestUrl)
        .then((response) => {
            console.log('API 전체 응답:', response.data);
            // 응답 구조에 맞게 content 배열 추출
            data = response.data.data.content;
        })
        .catch((error) => {
            console.error('API 에러:', error);
            data = [];
        })
    return data;
};
export const getChannelBoardDetail = async (boardIdx) => {
    const requestUrl = `http://localhost:8080/channel/board/${boardIdx}`;
    let data = {};

    await api.get(requestUrl)
        .then((response) => {
            console.log('게시글 상세 응답:', response.data);
            data = response.data.data; // 응답 구조에 맞게 조정
        })
        .catch((error) => {
            console.error('게시글 상세 조회 에러:', error);
            data = {};
        })
    return data;
};

// 댓글 목록 조회 API 수정
export const getBoardComments = async (boardIdx) => {
    const requestUrl = `http://localhost:8080/comment/list/${boardIdx}`;
    let data = [];

    await api.get(requestUrl)
        .then((response) => {
            console.log('댓글 목록 응답:', response.data);

            if (response.data.code === 200) {
                const responseData = response.data.data;

                // 응답이 배열인지 단일 객체인지 확인
                if (Array.isArray(responseData)) {
                    data = responseData;
                } else if (responseData && typeof responseData === 'object') {
                    // 단일 객체인 경우 배열로 변환
                    data = [responseData];
                } else if (responseData && responseData.content) {
                    // content 배열이 있는 경우
                    data = responseData.content;
                } else {
                    data = [];
                }
            }
        })
        .catch((error) => {
            console.error('댓글 목록 조회 에러:', error);
            data = [];
        })
    return data;
};

// 댓글 작성 API
export const createBoardComment = async (boardIdx, commentData) => {
    const requestUrl = `/comment/create/${boardIdx}`;
    let data = {};

    await api.post(requestUrl, commentData)
        .then((response) => {
            console.log('댓글 작성 응답:', response.data);
            data = response.data;
        })
        .catch((error) => {
            console.error('댓글 작성 에러:', error);
            data = error.response?.data || {};
        })
    return data;
};

// 댓글 삭제 API
export const deleteBoardComment = async (commentIdx) => {
    const requestUrl = `/comment/delete/${commentIdx}`;
    let data = {};

    await api.delete(requestUrl)
        .then((response) => {
            console.log('댓글 삭제 응답:', response.data);
            data = response.data;
        })
        .catch((error) => {
            console.error('댓글 삭제 에러:', error);
            data = error.response?.data || {};
        })
    return data;
};

// export default에 추가
export default {
    getChannelChart, postChannelInfo, updatePlaylistItem, deletePlaylistItem,
    uploadVideo, uploadThumbnail, getChannelBoardList, getChannelBoardDetail,
    getBoardComments, createBoardComment, deleteBoardComment
}

