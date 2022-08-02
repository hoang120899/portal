import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_ADMIN_LIST_NEW_APPLICANTS } from '@/routes/api'

export const applicantsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNewApplicants: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_LIST_NEW_APPLICANTS}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllNewApplicantsQuery } = applicantsSlice
