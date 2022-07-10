import { apiSlice } from '@/redux/api/apiSlice'
import { API_LIST_JOBS } from '@/routes/api'

export const listJobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListJob: builder.query({
      query: ({ pageSize, pageNumber, status }) => ({
        url: `${API_LIST_JOBS}?pageSize=${pageSize}&pageNumber=${pageNumber}&status=${status}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetListJobQuery } = listJobSlice
