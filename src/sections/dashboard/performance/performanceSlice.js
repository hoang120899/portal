import { apiSlice } from '@/redux/api/apiSlice'
import { API_PERFORMANCE } from '@/routes/api'

export const activeJobsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => ({
        url: API_PERFORMANCE,
        method: 'POST',
      }),
    }),
  }),
})

export const { useGetJobsQuery } = activeJobsSlice
