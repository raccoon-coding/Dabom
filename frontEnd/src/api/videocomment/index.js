// src/api/commentApi.js
import api from "@/plugins/axiosinterceptor";

/**
 * 댓글 목록 가져오기
 * @param {Number} videoId - 영상 ID
 */
export const getComments = async (videoId) => {
    try {
        const res = await api.get(`/api/videos/${videoId}/comments`);
        return res.data;
    } catch (error) {
        console.error("댓글 목록 불러오기 실패:", error);
        throw error;
    }
};

/**
 * 댓글 작성
 * @param {Object} commentData - { videoId, content }
 */
export const postComment = async (commentData) => {
    try {
        const res = await api.post(`/videocomment/register`, commentData);
        return res.data;
    } catch (error) {
        console.error("댓글 작성 실패:", error);
        throw error;
    }
};

/**
 * 댓글 삭제
 * @param {Number} commentId - 댓글 ID
 */
export const deleteComment = async (commentId) => {
    try {
        const res = await api.delete(`/api/comments/${commentId}`);
        return res.data;
    } catch (error) {
        console.error("댓글 삭제 실패:", error);
        throw error;
    }
};
