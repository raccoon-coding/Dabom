import api from "@/plugins/axiosinterceptor";


// { exists: true/false }
export const checkEmailExists = async (email) => {
    const requestUrl = `/api/auth/exists/email`
    let data = {}

    console.log("이메일 중복체크") // TODO: 삭제

    await api.post(requestUrl, { email })
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const checkChannelNameExists = async (channelName) => {
    const requestUrl = `/api/auth/exists/channel`
    let data = {}

    console.log("채널명 중복체크") // TODO: 삭제

    await api.post(requestUrl, { channelName })
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const login = async (loginForm) => {
    const requestUrl = `/api/auth/login`
    let data = {}

    await api.post(requestUrl, loginForm)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
}



export default { checkEmailExists, checkChannelNameExists, login }