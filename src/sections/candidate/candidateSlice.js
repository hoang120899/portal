import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_ADMIN_SEARCH_CANDIDATE } from '@/routes/api'

import { SEARCH_FIELD } from './config'

export const candidateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSearchCandidate: builder.query({
      query: (queries = {}) => {
        const data = Object.keys(queries).reduce((obj, key) => {
          let value = queries[key] || null
          if (SEARCH_FIELD.JOB_ID === key) {
            value = queries[key]?.id
          } else if (SEARCH_FIELD.SKILL === key) {
            value = (queries[key] || [])
              .map(({ label }) => label)
              .filter(Boolean)
              .join(',')
          }

          if (!value) return obj
          return {
            ...obj,
            [key]: value,
          }
        }, {})

        return {
          url: `${API_ADMIN_SEARCH_CANDIDATE}?${qs.stringify(data)}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetAdminSearchCandidateQuery } = candidateApiSlice
