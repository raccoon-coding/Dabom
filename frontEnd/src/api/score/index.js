import api from '@/plugins/axiosinterceptor';

const BASE_URL = 'http://localhost:8080/api/score';

/**
 * 채널 또는 비디오의 평균 평점을 조회합니다.
 * @param {string} type - 평점 타입 ('CHANNEL' 또는 'VIDEO')
 * @param {number} idx - 채널 또는 비디오의 고유 ID
 * @returns {Promise<number>} 평균 평점 (없으면 0.0)
 */
const getAverageScore = async (type, idx) => {
  const requestUrl = `${BASE_URL}/${type}/${idx}/average`;
  try {
    const response = await api.get(requestUrl);
    return response.data.data || 0.0;
  } catch (error) {
    console.error(`Failed to fetch average score for ${type} ${idx}:`, error);
    return 0.0;
  }
};

/**
 * 새로운 평점을 등록합니다.
 * @param {object} scoreData - 평점 등록 데이터 (score, member, channel/video, scoreType)
 * @returns {Promise<void>}
 */
const registerScore = async (scoreData) => {
  const requestUrl = `${BASE_URL}/register`;
  try {
    const response = await api.post(requestUrl, scoreData);
    return response.data; // BaseResponse<Void>
  } catch (error) {
    console.error('Failed to register score:', error);
    // 에러 응답에 커스텀 메시지가 있다면 Error 객체에 담아 던짐
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw error; // 커스텀 메시지가 없으면 원래 에러를 던짐
  }
};

/**
 * 기존 평점을 업데이트합니다.
 * @param {object} scoreData - 평점 업데이트 데이터 (idx, score, member, channel/video, scoreType)
 * @returns {Promise<void>}
 */
const updateScore = async (scoreData) => {
  const requestUrl = `${BASE_URL}/update`;
  try {
    const response = await api.post(requestUrl, scoreData);
    return response.data; // BaseResponse<Void>
  } catch (error) {
    console.error('Failed to update score:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

/**
 * 평점을 삭제합니다.
 * @param {string} type - 평점 타입 ('CHANNEL' 또는 'VIDEO')
 * @param {number} idx - 삭제할 평점의 고유 ID (Score 엔티티의 idx)
 * @returns {Promise<void>}
 */
const deleteScore = async (type, idx) => {
  const requestUrl = `${BASE_URL}/delete/${type},${idx}`;
  try {
    const response = await api.get(requestUrl); // 백엔드가 GET 메소드를 사용하므로 GET 사용
    return response.data; // BaseResponse<Void>
  } catch (error) {
    console.error('Failed to delete score:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export default { getAverageScore, registerScore, updateScore, deleteScore };
