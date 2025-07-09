import api from "@/plugins/axiosinterceptor";


export const signup = async (signupForm) => {
    const requestUrl = `/api/auth/signup`
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
    // const requestUrl = `/api/auth/login`
    const mockLoginRequestSuccess = `/api/login-success.json`
    let data = {}

    await api.get(mockLoginRequestSuccess)
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
    // const requestUrl = `/api/auth/exists/email`
    const mockResponseDataSuccess = `/api/email-check-success.json`
    const mockResponseDataFailure = `/api/email-check-failure.json`
    let data = {}
    await api.get(mockResponseDataSuccess)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const checkChannelNameExists = async (channelName) => {
    // const requestUrl = `/api/auth/exists/channel`
    const mockResponseDataSuccess = `/api/channel-check-success.json`
    const mockResponseDataFailure = `/api/channel-check-failure.json`
    let data = {}
    await api.get(mockResponseDataSuccess)
        .then((response) => {
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};


export default { signup, login, checkEmailExists, checkChannelNameExists }