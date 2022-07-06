import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADMIN_LIST_JOB,
  API_LIST_CLIENT,
  API_LIST_LABEL,
  API_LIST_MEMBER,
  API_SEARCH_CARD,
} from '@/routes/api'

export const kanbanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLabel: builder.query({
      query: () => ({
        url: API_LIST_LABEL,
        method: 'GET',
      }),
    }),
    getClient: builder.query({
      query: () => ({
        url: API_LIST_CLIENT,
        method: 'GET',
      }),
    }),
    getMember: builder.query({
      query: () => ({
        url: API_LIST_MEMBER,
        method: 'GET',
      }),
    }),
    getJob: builder.query({
      query: () => ({
        url: API_ADMIN_LIST_JOB,
        method: 'GET',
      }),
    }),
    searchCards: builder.query({
      query: (queries = {}) => ({
        url: `${API_SEARCH_CARD}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetLabelQuery,
  useGetClientQuery,
  useGetJobQuery,
  useGetMemberQuery,
  useSearchCardsQuery,
} = kanbanApiSlice
