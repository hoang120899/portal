import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_ADMIN_ALL_NOTIFY, API_ADMIN_READ_ALL_NOTIFY } from '@/routes/api'

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminAllNotify: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_ALL_NOTIFY}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
    updateAdminReadAllNotify: builder.mutation({
      query: () => ({
        url: `${API_ADMIN_READ_ALL_NOTIFY}`,
        method: 'PATCH',
      }),
    }),
  }),
})

export const {
  useGetAdminAllNotifyQuery,
  useUpdateAdminReadAllNotifyMutation,
} = notificationApiSlice
