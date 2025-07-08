import api from "@/plugins/axiosinterceptor";


export const getVideoList = async () => {
    // TODO: paging 처리, 영상 키워드별 get
    const requestUrl = `api/video-list.json`
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


export default { getVideoList }