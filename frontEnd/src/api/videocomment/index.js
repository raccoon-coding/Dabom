import api from "@/plugins/axiosinterceptor";

export const getComments = async (videoId, params = {}) => {
    try {
        const res = await api.get(`/api/videos/${videoId}/comments`, { params });
        return res.data;
    } catch (error) {
        console.error("댓글 목록 불러오기 실패:", error);
        throw error;
    }
};

export const postComment = async (commentData, params = {}) => {
    try {
        const res = await api.post(`/api/videocomment/register`, commentData, { params });
        return res.data;
    } catch (error) {
        console.error("댓글 작성 실패:", error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const res = await api.delete(`/api/comments/${commentId}`);
        return res.data;
    } catch (error) {
        console.error("댓글 삭제 실패:", error);
        throw error;
    }
};