import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_UPDATE_TASK, API_WEEKLY_TASKS } from '@/routes/api'

export const weeklyTaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWeeklyTasks: builder.mutation({
      query: (payload) => ({
        url: `${API_WEEKLY_TASKS}?${qs.stringify(payload?.queries)}`,
        method: 'POST',
        data: payload?.body,
      }),
    }),
    updateWeeklyTask: builder.mutation({
      query: (payload) => ({
        url: `${API_UPDATE_TASK}/${payload?.id}`,
        method: 'PATCH',
        data: payload?.body,
      }),
    }),
  }),
})

export const { useGetAllWeeklyTasksMutation, useUpdateWeeklyTaskMutation } =
  weeklyTaskApiSlice
