import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_MEMBER_ACTIVITIES_LAST_LOGIN } from '@/routes/api'

export const memberActivitiesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMemberLastLogin: builder.query({
      query: (queries = {}) => ({
        url: `${API_MEMBER_ACTIVITIES_LAST_LOGIN}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllMemberLastLoginQuery } = memberActivitiesSlice
