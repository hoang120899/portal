import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_LIST_JOBS_PROFILE,
  API_MEMBER_ACTIVITIES_USER_INFO,
} from '@/routes/api'

export const listJobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListJob: builder.query({
      query: ({ pageSize, pageNumber, idUser }) => ({
        url: `${API_LIST_JOBS_PROFILE}?pageSize=${pageSize}&pageNumber=${pageNumber}&id=${idUser}`,
        method: 'GET',
      }),
    }),
    getUserProfile: builder.query({
      query: ({ userId = '' }) => ({
        url: `${API_MEMBER_ACTIVITIES_USER_INFO}/${userId}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
  }),
})

export const { useGetListJobQuery, useGetUserProfileQuery } = listJobSlice
