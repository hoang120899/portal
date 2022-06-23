import axios from 'axios'

// routes
import { PATH_AUTH } from '@/routes/paths'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST_API_KEY || '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      //1. Redirect to login page or
      //2. Request refresh token
      window.location.href = PATH_AUTH.login
      return
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
  }
)

export const _getApi = (url, data) =>
  axiosInstance
    .get(url, {
      params: data,
    })
    .then((response) => response.data)
    .catch((error) => error)

export const _postApi = (url, data) =>
  axiosInstance
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => error)

export const _putApi = (url, data) =>
  axiosInstance
    .put(url, data)
    .then((response) => response.data)
    .catch((error) => error)

export const _patchApi = (url, data) =>
  axiosInstance
    .patch(url, data)
    .then((response) => response.data)
    .catch((error) => error)

export const _deleteApi = (url) =>
  axiosInstance
    .delete(url)
    .then((response) => response.data)
    .catch((error) => error)

export const _uploadApi = (url, data) =>
  axiosInstance
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => response.data)
    .catch((error) => error)

export default axiosInstance
