import api from "@/plugins/axiosinterceptor";

// GET /api/videos/comment/list/{videoIdx}/paged
export const getComments = async (videoId, params = {}) => {
    try {
        const res = await api.get(`/api/videos/comment/list/${videoId}/paged`, { params });
        return res.data;
    } catch (error) {
        console.error("댓글 목록 불러오기 실패:", error);
        throw error;
    }
};

// POST /api/videos/comment/register/{videoIdx}
export const postComment = async (videoId, commentData) => {
    try {
        const res = await api.post(`/api/videos/comment/register/${videoId}`, commentData);
        return res.data;
    } catch (error) {
        console.error("댓글 작성 실패:", error);
        throw error;
    }
};

// DELETE /api/videos/comment/delete/{commentIdx}
export const deleteComment = async (commentId) => {
    try {
        const res = await api.delete(`/api/videos/comment/delete/${commentId}`);
        return res.data;
    } catch (error) {
        console.error("댓글 삭제 실패:", error);
        throw error;
    }
};