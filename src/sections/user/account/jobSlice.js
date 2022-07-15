import { apiSlice } from '@/redux/api/apiSlice'
import { API_LIST_JOBS_PROFILE } from '@/routes/api'

export const listJobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListJob: builder.query({
      query: ({ pageSize, pageNumber, idUser }) => ({
        url: `${API_LIST_JOBS_PROFILE}?pageSize=${pageSize}&pageNumber=${pageNumber}&id=${idUser}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetListJobQuery } = listJobSlice
