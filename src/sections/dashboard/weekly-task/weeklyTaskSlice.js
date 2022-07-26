import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_WEEKLY_TASKS,
  API_WEEKLY_TASKS_LIST_USER,
  API_WEEKLY_TASKS_UPDATE,
} from '@/routes/api'

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
        url: `${API_WEEKLY_TASKS_UPDATE}/${payload?.id}`,
        method: 'PATCH',
        data: payload?.body,
      }),
    }),
    createWeeklyTask: builder.mutation({
      query: (payload) => ({
        url: `${API_WEEKLY_TASKS_UPDATE}`,
        method: 'POST',
        data: payload?.body,
      }),
    }),
    getTaskUserList: builder.query({
      query: (queries = {}) => ({
        url: `${API_WEEKLY_TASKS_LIST_USER}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllWeeklyTasksMutation,
  useUpdateWeeklyTaskMutation,
  useCreateWeeklyTaskMutation,
  useGetTaskUserListQuery,
} = weeklyTaskApiSlice
