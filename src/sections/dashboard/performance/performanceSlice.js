import { apiSlice } from '@/redux/api/apiSlice'
import { API_PERFORMANCE } from '@/routes/api'

export const performanceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDataPerformance: builder.query({
      query: (data) => ({
        url: API_PERFORMANCE,
        method: 'POST',
        data: JSON.stringify(data),
      }),
    }),
  }),
})

export const { useGetDataPerformanceQuery } = performanceSlice
