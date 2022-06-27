import axios from 'axios'

import { handleRefreshToken } from './jwt'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API_KEY || '',
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      handleRefreshToken()
      return
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
  }
)

export const _getApi = (url, data) =>
  axiosInstance.get(url, data).then((response) => response.data)

export const _postApi = (url, data, headers = {}) =>
  axiosInstance.post(url, data, headers).then((response) => response.data)

export const _putApi = (url, data) =>
  axiosInstance.put(url, data).then((response) => response.data)

export const _patchApi = (url, data) =>
  axiosInstance.patch(url, data).then((response) => response.data)

export const _deleteApi = (url) =>
  axiosInstance.delete(url).then((response) => response.data)

export const _uploadApi = (url, data) =>
  axiosInstance
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data)

export default axiosInstance
