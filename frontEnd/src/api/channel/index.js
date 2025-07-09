import api from "@/plugins/axiosinterceptor";


export const getChannelChart = async () => {

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

export const postChannelInfo = async () => {

    const requestUrl = `/api/channel_info.json`
    let data = {}

    await api.get(requestUrl,)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const postVideoEditor = async () => {

    const requestUrl = `/api/channel_video_Editor`
    let data = {}

    await api.get(requestUrl,)
        .then((response) => {
            // console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};


export default { getChannelChart, postChannelInfo, postVideoEditor }