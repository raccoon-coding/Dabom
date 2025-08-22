import api from "@/plugins/axiosinterceptor";


export const getRandomTogetherList = async () => {
    const requestUrl = `/api/together`
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

export const getTogetherListInMember = async () => {
  const requestUrl = `/api/together/member`
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

export const searchTogether = async (body) => {
    const requestUrl = `/api/together/search`
    let data = {}

    // await api.get(requestUrl, {params: searc h})
    await api.post(requestUrl, body)
        .then((response) => {
            console.log(response)
            data = response.data
        })
        .catch((error) => {
            data = error.data
        })
    return data
};

export const saveTogether = async (body) => {
  const requestUrl = `/api/together/save`
  let data = {}

  await api.post(requestUrl, body)
    .then((response) => {
      console.log(response)
      data = response.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
};

export const joinTogether = async (togetherIdx) => {
  const requestUrl = `/api/together/` + togetherIdx
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

export const joinOpenTogether = async (togetherIdx) => {
  const requestUrl = `/api/together/` + togetherIdx
  let data = {}

  await api.post(requestUrl)
    .then((response) => {
      console.log(response)
      data = response.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
};

export const joinTogetherWithCode = async (togetherIdx, code) => {
  const requestUrl = `/api/together/` + togetherIdx + `/code`
  let data = {}

  await api.post(requestUrl, code)
    .then((response) => {
      console.log(response)
      data = response.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
};

export const leaveTogether = async (togetherIdx) => {
  const requestUrl = `/api/together/` + togetherIdx + `/member`
  let data = {}

  await api.delete(requestUrl)
    .then((response) => {
      console.log(response)
      data = response.data
    })
    .catch((error) => {
      data = error.data
    })
  return data
};

export default { getRandomTogetherList, getTogetherListInMember, searchTogether,
  joinTogether, joinOpenTogether, joinTogetherWithCode, saveTogether, leaveTogether }