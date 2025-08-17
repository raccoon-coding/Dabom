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
    const requestUrl = `http://localhost:8080/channel/board/list`;
    let data = [];

    try {
        console.log('API 호출 시작:', requestUrl);
        const response = await api.get(requestUrl);

        console.log('API 전체 응답:', response);
        console.log('API 응답 데이터:', response.data);
        console.log('API 응답 상태:', response.status);

        if (response.data.code === 200) {
            data = response.data.data.content || response.data.data;
            console.log('추출된 데이터:', data);
        } else {
            console.log('응답 코드가 200이 아님:', response.data.code);
        }
    } catch (error) {
        console.error('API 에러 상세:', error);
        console.error('에러 메시지:', error.message);
        console.error('에러 응답:', error.response);
        console.error('에러 요청:', error.request);
        data = [];
    }

    return data;
};
export const getChannelBoardDetail = async (boardIdx) => {
    const requestUrl = `http://localhost:8080/channel/board/read/${boardIdx}`;
    let data = {};

    await api.get(requestUrl)
        .then((response) => {
            console.log('게시글 상세 응답:', response.data);
            data = response.data.data;
        })
        .catch((error) => {
            console.error('게시글 상세 조회 에러:', error);
            data = {};
        })
    return data;
};

// 댓글 목록 조회 API 수정
export const getBoardComments = async (boardIdx) => {
    const requestUrl = `http://localhost:8080/channel/board/comment/list/${boardIdx}`;
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

// 댓글 검색 정렬
export const getBoardCommentsSorted = async (boardIdx, sortBy = 'oldest') => {
    const requestUrl = `http://localhost:8080/channel/board/comment/list/${boardIdx}/sorted`;
    let data = [];

    await api.get(requestUrl, { params: { sort: sortBy } })
        .then((response) => {
            console.log('정렬된 댓글 목록 응답:', response.data);
            if (response.data.code === 200) {
                data = response.data.data || [];
            }
        })
        .catch((error) => {
            console.error('정렬된 댓글 목록 조회 에러:', error);
            data = [];
        })
    return data;
};

export const getBoardCommentsPagedSorted = async (boardIdx, page = 0, size = 10, sortBy = 'oldest') => {
    const requestUrl = `http://localhost:8080/channel/board/comment/list/${boardIdx}/paged`;
    let data = {};

    await api.get(requestUrl, {
        params: {
            page: page,
            size: size,
            sort: sortBy
        }
    })
        .then((response) => {
            console.log('페이지네이션 댓글 응답:', response.data);
            if (response.data.code === 200) {
                data = response.data.data; // SliceBaseResponse
            }
        })
        .catch((error) => {
            console.error('페이지네이션 댓글 조회 에러:', error);
            data = { content: [], hasNext: false };
        })

    return data;
};

// 댓글 작성 API
export const createBoardComment = async (boardIdx, commentData) => {
    const requestUrl = `http://localhost:8080/channel/board/comment/create/${boardIdx}`;
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

// 게시글 삭제 API 추가
export const deleteChannelBoard = async (boardIdx) => {
    const requestUrl = `http://localhost/channel/board/delete/${boardIdx}`;
    let data = {};

    await api.delete(requestUrl)
        .then((response) => {
            console.log('게시글 삭제 응답:', response.data);
            data = response.data;
        })
        .catch((error) => {
            console.error('게시글 삭제 에러:', error);
            data = error.response?.data || {};
        })
    return data;
};

// 게시글 수정 API 추가
export const updateChannelBoard = async (boardIdx, boardData) => {
    const requestUrl = `http://localhost/channel/board/update/${boardIdx}`;
    let data = {};

    await api.put(requestUrl, boardData)
        .then((response) => {
            console.log('게시글 수정 응답:', response.data);
            data = response.data;
        })
        .catch((error) => {
            console.error('게시글 수정 에러:', error);
            data = error.response?.data || {};
        })
    return data;
};

// 게시글 작성 API 추가
export const createChannelBoard = async (boardData) => {
    const requestUrl = `http://localhost:8080/channel/board/register`;
    let data = {};

    await api.post(requestUrl, boardData)
        .then((response) => {
            console.log('게시글 작성 응답:', response.data);
            data = response.data;
        })
        .catch((error) => {
            console.error('게시글 작성 에러:', error);
            data = error.response?.data || {};
        })
    return data;
};

// export default에 추가
export default {
    getChannelChart, postChannelInfo, updatePlaylistItem, deletePlaylistItem,
    uploadVideo, uploadThumbnail, getChannelBoardList, getChannelBoardDetail,
    getBoardComments, createBoardComment, deleteBoardComment,
    deleteChannelBoard, updateChannelBoard, createChannelBoard, getBoardCommentsSorted
}
