import { apiSlice } from '@/redux/api/apiSlice'
import { API_ACTIVE_JOBS } from '@/routes/api'

export const activeJobsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: ({ pageSize, pageNumberJob, statusJob }) => ({
        url: `${API_ACTIVE_JOBS}?pageSize=${pageSize}&pageNumber=${pageNumberJob}&status=${statusJob}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetJobsQuery } = activeJobsSlice
