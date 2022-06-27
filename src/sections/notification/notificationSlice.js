import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_ADMIN_ALL_NOTIFY } from '@/routes/api'

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminAllNotify: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_ALL_NOTIFY}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAdminAllNotifyQuery } = notificationApiSlice
