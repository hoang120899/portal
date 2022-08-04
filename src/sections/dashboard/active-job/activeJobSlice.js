import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_DASHBOARD_JOBS_BY_STATUS } from '@/routes/api'

export const activeJobSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobsByStatus: builder.query({
      query: (queries = {}) => ({
        url: `${API_DASHBOARD_JOBS_BY_STATUS}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetJobsByStatusQuery } = activeJobSlice
