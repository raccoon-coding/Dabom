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

export const getChannelInfo = async () => {
  const requestUrl = `/api/member/info`
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

export const updateChannelInfo = async (channelInfoForm) => {
    const requestUrl = `/api/member/update`
    let data = {}

    await api.patch(requestUrl, channelInfoForm)
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

        if (response.data.code === 200) {
            data = response.data.data.content || response.data.data;
            console.log('추출된 데이터:', data);
        } else {
            console.log('응답 코드가 200이 아님:', response.data.code);
        }
    } catch (error) {

        data = [];
    }

    return data;
};

export const getChannelBoardListPaged = async (page = 0, size = 10, sort = 'oldest') => {
    const requestUrl = `http://localhost:8080/channel/board/list`;
    let data = {};

    try {
        console.log('무한 스크롤 API 호출:', requestUrl, { page, size, sort });
        const response = await api.get(requestUrl, {
            params: {
                page: page,
                size: size,
                sort: sort
            }
        });

        console.log('무한 스크롤 응답:', response.data);

        if (response.data.code === 200) {
            data = response.data.data; // SliceBaseResponse<ChannelBoardReadResponseDto>
            console.log('추출된 페이지 데이터:', data);
        } else {
            console.log('응답 코드가 200이 아님:', response.data.code);
            data = { content: [], hasNext: false, totalCount: 0 };
        }
    } catch (error) {
        console.error('무한 스크롤 API 오류:', error);
        data = { content: [], hasNext: false, totalCount: 0 };
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
    const requestUrl = `http://localhost:8080/api/channel/board/comment/list/${boardIdx}`;
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
    const requestUrl = `http://localhost:8080/api/channel/board/comment/list/${boardIdx}/sorted`;
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
    const requestUrl = `http://localhost:8080/api/channel/board/comment/list/${boardIdx}/paged`;
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
    const requestUrl = `http://localhost:8080/api/channel/board/comment/create/${boardIdx}`;
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
    const requestUrl = `http://localhost:8080/channel/board/delete/${boardIdx}`;
    let data = {};

    await api.get(requestUrl) // DELETE가 아닌 GET 사용
        .then((response) => {
            console.log('게시글 삭제 응답:', response);
            data = { code: 200, success: true }; // 백엔드가 void 반환하므로 성공 표시
        })
        .catch((error) => {
            console.error('게시글 삭제 에러:', error);
            data = error.response?.data || {};
        })
    return data;
};

// 게시글 수정 API 추가
export const updateChannelBoard = async (boardIdx, boardData) => {
    const requestUrl = `http://localhost:8080/channel/board/update`;

    // 백엔드 DTO에 맞게 데이터 구조 수정
    const updateData = {
        boardIdx: boardIdx,
        title: boardData.title,
        contents: boardData.contents
    };

    let data = {};

    await api.post(requestUrl, updateData) // PUT이 아닌 POST 사용
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
    getChannelChart, getChannelInfo, updateChannelInfo, updatePlaylistItem, deletePlaylistItem,
    uploadVideo, uploadThumbnail, getChannelBoardList, getChannelBoardDetail,
    getBoardComments, createBoardComment, deleteBoardComment,
    deleteChannelBoard, updateChannelBoard, createChannelBoard, getBoardCommentsSorted, getChannelBoardListPaged
}
