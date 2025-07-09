import api from "@/plugins/axiosinterceptor";


export const community_write = async (req) => {

    const requestUrl = `/api/community_write.json` // 예시
    let data = {}

    await api.post(requestUrl, req)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};


export default { community_write }