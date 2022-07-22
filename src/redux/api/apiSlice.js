import { createApi } from '@reduxjs/toolkit/query/react'

import { API_ADMIN_USER_LIST } from '@/routes/api'
import axiosInstance from '@/utils/axios'

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      return {
        error: {
          status: axiosError?.response?.status || axiosError?.code,
          data:
            axiosError.response?.data || axiosError?.data || axiosError.message,
        },
      }
    }
  }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getAdminUserList: builder.query({
      query: () => ({ url: API_ADMIN_USER_LIST, method: 'POST' }),
    }),
  }),
})

export const { useGetAdminUserListQuery } = apiSlice
