import api from "@/plugins/axiosinterceptor";


export const getChannelInfo = async () => {

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


export default { getChannelInfo }