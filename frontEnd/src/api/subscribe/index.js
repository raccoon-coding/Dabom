import api from "@/plugins/axiosinterceptor.js";


export const getSubscribe = async (subscribeId) => {
    const requestUrl = `/api/subscribe`
    let data = {}
    await api.post(requestUrl, subscribeId)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
}

export const trySubscribe = async (subscribeId) => {
    const requestUrl = `/api/subscribe/save`
    let data = {}
    await api.post(requestUrl, subscribeId)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
}

export const deleteSubscribe = async (subscribeId) => {
    const requestUrl = `/api/subscribe/delete`
    let data = {}
    await api.post(requestUrl, subscribeId)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
}


export default { getSubscribe, deleteSubscribe, trySubscribe }