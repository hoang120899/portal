import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_ADMIN_RECRUITMENT_PROGRESS } from '@/routes/api'

export const recruitmentProgressApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRecruitmentProgress: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_RECRUITMENT_PROGRESS}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllRecruitmentProgressQuery } = recruitmentProgressApiSlice
