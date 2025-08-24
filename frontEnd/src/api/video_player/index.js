// video-player index.js

import api from "@/plugins/axiosinterceptor";


const getVideoInfo = async (req) => {
    let data = {}
    const requestUrl = `/api/video-list2.json`

    await api.get(requestUrl, req)
        .then((res) => {
            // console.log(response)
            data = res.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

const getRecommendVideo = async (req) => {
    let data = {};
    let url = '/api/recommend-video.json';

    await api.get(url, req)
        .then((res) => {
            data = res.data;
        })
        .catch((error) => {
            data = error.data;
        });

    return data;
}

const getVideoById = async (videoId) => {
    let data = {};
    const requestUrl = `/api/videos/${videoId}`;
    // let url = /api/video${req}.json;

    await api.get(requestUrl)
        .then((response) => {
            console.log(response)
            data = response.data;
        })
        .catch((error) => {
            data = error.data;
        });

    return data;
}


export default { getVideoInfo, getRecommendVideo, getVideoById }