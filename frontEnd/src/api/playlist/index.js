import api from "@/plugins/axiosinterceptor";


export const playlist_show = async (req) => {

    const requestUrl = `/api/playlist.json` // 예시
    let data = {}

    await api.get(requestUrl, { params: req })
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};


export default { playlist_show }