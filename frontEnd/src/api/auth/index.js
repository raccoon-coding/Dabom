import api from "@/plugins/axiosinterceptor";


// { exists: true/false }
export const checkEmailExists = async (email) => {
    const requestUrl = `/api/auth/exists/email`
    let data = {}
    const mockResponse = {
        "status": 200,
        "data":
        {
            "field": "email",
            "isDuplicate": false
        }

    }
    data = mockResponse.data;
    // await api.post(requestUrl, { email })
    //     .then((response) => {
    //         data = response.data
    //     })
    //     .catch((error) => {
    //         data = error.data
    //     })
    return data
};

export const checkChannelNameExists = async (channelName) => {
    const requestUrl = `/api/auth/exists/channel`
    let data = {}
    const mockResponse = {
        "status": 200,
        "data":
        {
            "field": "channel",
            "isDuplicate": false
        }

    }
    data = mockResponse.data;
    // await api.post(requestUrl, { channelName })
    //     .then((response) => {
    //         data = response.data
    //     })
    //     .catch((error) => {
    //         data = error.data
    //     })
    return data
};

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



export default { checkEmailExists, checkChannelNameExists, login, signup }