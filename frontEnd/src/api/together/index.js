import api from "@/plugins/axiosinterceptor";


export const getRandomTogetherList = async () => {
    const requestUrl = `/api/random-together.json`
    let data = {}

    await api.get(requestUrl)
        .then((response) => {
            console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const getTogetherSearch = async () => {
    const requestUrl = `/api/search-together.json`
    let data = {}

    // await api.get(requestUrl, {params: searc h})
    await api.get(requestUrl)
        .then((response) => {
            console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export default { getRandomTogetherList, getTogetherSearch }