import api from "@/plugins/axiosinterceptor";


export const signup = async (signupForm) => {
    const requestUrl = `/api/member/signup`
    let data = {}
    await api.post(requestUrl, signupForm)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
}

export const login = async (loginForm) => {
    const requestUrl = `/api/member/login`
    let data = {}

    await api.post(requestUrl, loginForm)
        .then((response) => {
            console.log(response)
            console.log(response.data)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
}

export const checkEmailExists = async (email) => {
    const requestUrl = `/api/member/exists/email`
    let data = {}
    await api.post(requestUrl, email)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const checkChannelNameExists = async (channelName) => {
    const requestUrl = `/api/member/exists/channel`
    let data = {}
    await api.post(requestUrl, channelName)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};


export default { signup, login, checkEmailExists, checkChannelNameExists }