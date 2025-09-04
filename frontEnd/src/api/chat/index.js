import api from '@/plugins/axiosinterceptor';

export const getRandomTogetherList = async () => {
  const requestUrl = '/api/random-together.json';
  try {
    const response = await api.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch random together list:', error);
    return error.response?.data || {};
  }
};

export const getTogetherSearch = async (search) => {
  const requestUrl = '/api/search-together.json';
  try {
    const response = await api.get(requestUrl, { params: { search } });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch together search:', error);
    return error.response?.data || {};
  }
};

export const getChatList = async () => {
  const requestUrl = '/api/chat/list';
  try {
    const response = await api.get(requestUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Failed to fetch chat list:', error);
    return [];
  }
};

export const getChatRoom = async (roomIdx, page = 0, size = 20) => {
  console.log("챗룸")
  const requestUrl = `/api/chat/read/${roomIdx}`;
  try {
    const response = await api.get(requestUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      params: { page, size },
    });
    return response.data.data;
  } catch (error) {
    console.error(`Failed to fetch chat room ${roomIdx}:`, error);
    return {};
  }
};

export const createChatRoom = async (member2Idx) => {
  const requestUrl = '/api/chat/room';
  const member1Idx = parseInt(localStorage.getItem('memberIdx'));
  try {
    const response = await api.post(
      requestUrl,
      { member1: { idx: member1Idx }, member2: { idx: member2Idx } },
      { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }
    );
    return response.data.data;
  } catch (error) {
    console.error('Failed to create chat room:', error);
    return null;
  }
};

export const getProfile = async (memberIdx) => {
  const requestUrl = `/api/member/info/profileImg/${memberIdx}`;
  try {
    const response = await api.get(requestUrl);
    return response.data.data;
  } catch (error) {
    console.error('이미지 가져오기 실패', error);
    return error.response?.data || {};
  }
}

export default { getRandomTogetherList, getTogetherSearch, getChatList, getChatRoom, createChatRoom,getProfile };