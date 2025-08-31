import api from "@/plugins/axiosinterceptor";

// 내 모든 플레이리스트 조회
export const getMyPlaylists = async () => {
    try {
        const response = await api.post('/api/playlist/list');
        return response.data.data; // BaseResponse<List<playlistResponseDto>>
    } catch (error) {
        console.error('플레이리스트 조회 실패', error);
        throw error;
    }
};

// 특정 플레이리스트 상세 정보 조회
export const getPlaylistDetails = async (playlistIdx) => {
    try {
        const response = await api.get(`/api/playlist/${playlistIdx}`);
        return response.data.data; // BaseResponse<PlaylistInnerDto>
    } catch (error) {
        console.error('플레이리스트 상세 조회 실패', error);
        throw error;
    }
};

// 새 플레이리스트 생성
export const createPlaylist = async (playlistTitle) => {
    try {
        const response = await api.post('/api/playlist/register', { playlistTitle });
        return response.data.data; // BaseResponse<Integer>
    } catch (error) {
        console.error('플레이리스트 생성 실패', error);
        throw error;
    }
};

// 플레이리스트에 비디오 추가
export const addVideoToPlaylist = async (playlistIdx, videoIdx) => {
    try {
        const response = await api.post('/api/playlist/add', { playlistIdx, videoIdx });
        return response.data; // BaseResponse<Void>
    } catch (error) {
        console.error('플레이리스트에 비디오 추가 실패', error);
        throw error;
    }
};

// --- 백엔드에 추가 구현이 필요한 API ---

// 플레이리스트 이름 수정
export const updatePlaylist = async (playlistIdx, playlistTitle) => {
    // 참고: 이 API는 현재 백엔드에 구현되어 있지 않습니다.
    // 백엔드에 PUT /api/playlist/{playlistIdx} 와 같은 엔드포인트 구현이 필요합니다.
    try {
        const response = await api.put(`/api/playlist/${playlistIdx}`, { playlistTitle });
        return response.data;
    } catch (error) {
        console.error('플레이리스트 수정 실패', error);
        throw error;
    }
};

// 플레이리스트 삭제
export const deletePlaylist = async (playlistIdx) => {
    // 참고: 이 API는 현재 백엔드에 구현되어 있지 않습니다.
    // 백엔드에 DELETE /api/playlist/{playlistIdx} 와 같은 엔드포인트 구현이 필요합니다.
    try {
        const response = await api.delete(`/api/playlist/${playlistIdx}`);
        return response.data;
    } catch (error) {
        console.error('플레이리스트 삭제 실패', error);
        throw error;
    }
};

export default {
    getMyPlaylists,
    getPlaylistDetails,
    createPlaylist,
    addVideoToPlaylist,
    updatePlaylist,
    deletePlaylist,
};
