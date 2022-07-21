import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_WEEKLY_TASKS_LIST_USER } from '@/routes/api'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (queries = {}) => ({
        url: `${API_WEEKLY_TASKS_LIST_USER}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllUsersQuery } = userApiSlice
