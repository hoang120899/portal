import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADD_SKILL,
  API_ADMIN_CLIENTS_LIST,
  API_CREATE_JOB,
  API_LIST_CLIENT,
  API_LIST_JOBS,
  API_LIST_TAGS,
  API_LOCATIONS,
  API_SEARCH_SKILL,
} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Job'],
})

export const jobSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getListJobs: builder.query({
      query: (queries = {}) => ({
        url: `${API_LIST_JOBS}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
      providesTags: ['Job'],
    }),
    getListLocation: builder.query({
      query: () => ({
        url: API_LOCATIONS,
        method: 'GET',
      }),
    }),
    getListClient: builder.query({
      query: () => ({
        url: API_LIST_CLIENT,
        method: 'GET',
      }),
    }),
    getListTags: builder.query({
      query: () => ({
        url: API_LIST_TAGS,
        method: 'GET',
      }),
    }),
    createSkill: builder.mutation({
      query: (data) => ({
        url: API_ADD_SKILL,
        method: 'POST',
        data,
      }),
    }),
    searchSkill: builder.mutation({
      query: (data) => ({
        url: API_SEARCH_SKILL,
        method: 'POST',
        data,
      }),
    }),
    createJob: builder.mutation({
      query: (data) => ({
        url: API_CREATE_JOB,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Job'],
    }),
    updateJobClient: builder.mutation({
      query: ({ clientId, data }) => ({
        url: `${API_ADMIN_CLIENTS_LIST}/${clientId}`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['Job'],
    }),
  }),
})

export const {
  useGetListJobsQuery,
  useGetListLocationQuery,
  useGetListClientQuery,
  useGetListTagsQuery,
  useCreateSkillMutation,
  useSearchSkillMutation,
  useCreateJobMutation,
  useUpdateJobClientMutation,
} = jobSlice
