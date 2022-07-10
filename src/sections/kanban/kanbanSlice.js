import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADD_CARD,
  API_ADMIN_LIST_JOB,
  API_ASSIGNMENT,
  API_LIST_ACTIVE_JOB,
  API_LIST_CARD,
  API_LIST_CLIENT,
  API_LIST_COMMENT,
  API_LIST_LABEL,
  API_LIST_MEMBER,
  API_LIST_UPDATE_HISTORY,
  API_LIST_USER,
  API_REMOVE_ASSIGNMENT,
  API_SEARCH_CARD,
  API_SEARCH_EMAIL,
  API_SEARCH_PHONE,
  API_V1_CARD,
} from '@/routes/api'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Kanban', 'Comment'],
})

export const kanbanApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query({
      query: () => ({
        url: API_LIST_CARD,
        method: 'GET',
      }),
      providesTags: (result) => {
        let cardArr = []
        if (result) {
          result.data.list.forEach((column) => {
            if (column.CandidateJobs.length > 0) {
              cardArr = [...cardArr.concat(column.CandidateJobs)]
            }
          })
        }
        return [
          'Kanban',
          ...cardArr.map((card) => ({ type: 'Kanban', id: card.id })),
        ]
      },
    }),
    getActiveJobs: builder.query({
      query: () => ({
        url: API_LIST_ACTIVE_JOB,
        method: 'GET',
      }),
    }),
    getLabel: builder.query({
      query: () => ({
        url: API_LIST_LABEL,
        method: 'GET',
      }),
    }),
    deleteLabel: builder.mutation({
      query: (id) => ({
        url: `${API_V1_CARD}/${id}/label`,
        method: 'DELETE',
      }),
    }),
    addAssignee: builder.mutation({
      query: ({ id, userId }) => ({
        url: `${API_ASSIGNMENT}/${id}`,
        method: 'PATCH',
        data: { userId },
      }),
      invalidatesTags: ['Kanban'],
    }),
    removeAssignee: builder.mutation({
      query: ({ id, userId }) => ({
        url: `${API_REMOVE_ASSIGNMENT}/${id}`,
        method: 'PATCH',
        data: { userId },
      }),
      invalidatesTags: ['Kanban'],
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
    addCard: builder.mutation({
      query: (data) => ({
        url: `${API_ADD_CARD}`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Kanban'],
    }),
    updateCard: builder.mutation({
      query: (data) => ({
        url: `${API_ADD_CARD}/${data.cardId}`,
        method: 'PATCH',
        data: data.reqData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Kanban', id: arg.cardId },
      ],
    }),
    updateLane: builder.mutation({
      query: (data) => ({
        url: `${API_ADD_CARD}/${data.cardId}`,
        method: 'PATCH',
        data: { laneId: data.laneId },
      }),
    }),
    searchPhone: builder.query({
      query: (queries = {}) => ({
        url: `${API_SEARCH_PHONE}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
    searchEmail: builder.query({
      query: (queries = {}) => ({
        url: `${API_SEARCH_EMAIL}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: API_LIST_USER,
        method: 'GET',
      }),
    }),
    getUpdateHistory: builder.query({
      query: (data) => ({
        url: `${API_LIST_UPDATE_HISTORY}`,
        method: 'POST',
        data,
      }),
    }),
    getListComment: builder.query({
      query: (cardId) => ({
        url: `${API_LIST_COMMENT}/${cardId}/card`,
        method: 'GET',
      }),
      providesTags: ['Comment'],
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `${API_LIST_COMMENT}/${data.cardId}/card`,
        method: 'POST',
        data: { content: data.content },
      }),
      invalidatesTags: ['Comment'],
    }),
    editComment: builder.mutation({
      query: (data) => ({
        url: `${API_LIST_COMMENT}/${data.id}`,
        method: 'PATCH',
        data: { content: data.content },
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
})

export const {
  useGetColumnsQuery,
  useGetActiveJobsQuery,
  useGetLabelQuery,
  useDeleteLabelMutation,
  useGetClientQuery,
  useGetJobQuery,
  useGetMemberQuery,
  useGetListCommentQuery,
  useSearchCardsQuery,
  useSearchPhoneQuery,
  useSearchEmailQuery,
  useGetUserQuery,
  useAddAssigneeMutation,
  useGetUpdateHistoryQuery,
  useRemoveAssigneeMutation,
  useAddCardMutation,
  useUpdateCardMutation,
  useUpdateLaneMutation,
  useAddCommentMutation,
  useEditCommentMutation,
} = kanbanApiSlice
