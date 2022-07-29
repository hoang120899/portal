import { apiSlice } from '@/redux/api/apiSlice'
import { API_PERFORMANCE } from '@/routes/api'

export const performanceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDataPerformance: builder.query({
      query: (data) => ({
        url: `${API_PERFORMANCE}/?${data.currentRole}`,
        method: 'POST',
        data: JSON.stringify(data.body),
      }),
    }),
  }),
})

export const { useGetDataPerformanceQuery } = performanceSlice
