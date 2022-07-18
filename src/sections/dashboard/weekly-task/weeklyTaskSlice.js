import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_WEEKLY_TASKS } from '@/routes/api'

export const weeklyTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWeeklyTasks: builder.mutation({
      query: (payload) => ({
        url: `${API_WEEKLY_TASKS}?${qs.stringify(payload?.queries)}`,
        method: 'POST',
        data: payload?.body,
      }),
    }),
  }),
})

export const { useGetAllWeeklyTasksMutation } = weeklyTaskApiSlice
