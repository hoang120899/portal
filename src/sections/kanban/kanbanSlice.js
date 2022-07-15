import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADD_CARD,
  API_ADMIN_CARDS,
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
  API_V1_CARD_LABEL,
} from '@/routes/api'
import { _getApi, _patchApi, _postApi } from '@/utils/axios'

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
    getCardDetail: builder.mutation({
      query: (cardId) => ({
        url: `${API_ADD_CARD}/${cardId}`,
        method: 'GET',
      }),
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
  useGetCardDetailMutation,
} = kanbanApiSlice

// use reducer
const columnAdapter = createEntityAdapter()

const initialColumns = columnAdapter.getInitialState()
const initialState = {
  columns: {
    isLoading: false,
    error: null,
    data: initialColumns,
  },
  loadMoreLane: {
    isLoading: false,
    error: null,
  },
  listColumnName: [],
}
export const getColumns = createAsyncThunk('columns/getColumns', async () => {
  try {
    // const response = await _getApi(API_LIST_CARD)
    const response = await _getApi(API_LIST_CARD)
    return response.data.list
  } catch (error) {
    // console.log(error);
  }
})
export const getContacts = createAsyncThunk('columns/getContacts', async () => {
  try {
    // const response = await _getApi(API_LIST_CARD)
    const response = await _getApi(API_LIST_USER)
    return response.data.list
  } catch (error) {
    // console.log(error);
  }
})
export const loadMoreLane = createAsyncThunk(
  'columns/loadMoreLane',
  async (data) => {
    try {
      const response = await _getApi(
        `${API_ADMIN_CARDS}/${data.laneId}/lane?offset=${data.offset}`
      )
      return { data: response.data.list, laneId: data.laneId }
    } catch (error) {
      // console.log(error);
    }
  }
)
export const createLabel = createAsyncThunk(
  'columns/createLabel',
  async (data) => {
    const { laneId, ...rest } = data
    const response = await _postApi(API_V1_CARD_LABEL, rest)
    if (response.data.success) {
      return { ...data, laneId: laneId }
    }
    return response
  }
)
export const moveCard = createAsyncThunk('columns/moveCard', async (data) => {
  const { laneId, cardId } = data
  const url = `${API_ADD_CARD}/${cardId}`
  const response = await _patchApi(url, { laneId: laneId })
  if (response.data.success) {
    return { ...data }
  }
  return response
})
export const storageCard = createAsyncThunk(
  'columns/storageCard',
  async (data) => {
    const { cardId } = data
    const url = `${API_ADD_CARD}/${cardId}`
    const response = await _patchApi(url, { storage: true })
    if (response.data.success) {
      return { ...data }
    }
    return response
  }
)

export const kanbanSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumnsAction: (state, action) => {
      const { destination, source, draggableId } = action.payload
      const card = state.columns.data.entities[
        source.droppableId
      ].CandidateJobs.find((item) => item.id === draggableId)
      //change data column
      state.columns.data.entities[source.droppableId].CandidateJobs.splice(0, 1)
      state.columns.data.entities[destination.droppableId].CandidateJobs.splice(
        0,
        0,
        card
      )
    },
    updateColumns: (state, action) => {
      columnAdapter.upsertMany(state.columns.data, action?.payload || [])
    },
    updateLane: (state, action) => {
      const { laneId, listData } = action.payload
      const lane = state.columns.data.entities[laneId]
      lane.CandidateJobs.push(...listData)
    },
  },
  // extra reducers set get column to state
  extraReducers: {
    [getColumns.fulfilled]: (state, action) => {
      state.columns.isLoading = false
      columnAdapter.upsertMany(state.columns.data, action?.payload || [])
      const listName = action.payload.map((item) => ({
        label: item.nameColumn,
        value: item.id,
      }))
      state.listColumnName = listName
    },
    [getColumns.pending]: (state) => {
      state.columns.isLoading = true
    },
    [getColumns.rejected]: (state, action) => {
      state.columns.error = action.payload
      state.columns.isLoading = false
    },
    [moveCard.rejected]: () => {},
    [moveCard.fulfilled]: (state, action) => {
      const { laneId, cardId, sourceId } = action.payload
      const card = state.columns.data.entities[sourceId].CandidateJobs.find(
        (item) => item.id === cardId
      )
      const sourceIndex = state.columns.data.entities[
        sourceId
      ].CandidateJobs.findIndex((item) => item.id === cardId)
      // remove card from source
      state.columns.data.entities[sourceId].CandidateJobs.splice(sourceIndex, 1)
      // add card to destination
      state.columns.data.entities[laneId].CandidateJobs.splice(0, 0, card)
    },
    [storageCard.fulfilled]: (state, action) => {
      // remove card after storage
      const { laneId, cardId } = action.payload
      const cardIndex = state.columns.data.entities[
        laneId
      ].CandidateJobs.findIndex((item) => item.id === cardId)
      state.columns.data.entities[laneId].CandidateJobs.splice(cardIndex, 1)
    },
    [createLabel.fulfilled]: (state, action) => {
      const { laneId, candidateJobId, ...rest } = action.payload
      const cardIndex = state.columns.data.entities[
        laneId
      ].CandidateJobs.findIndex((item) => item.id === candidateJobId)
      state.columns.data.entities[laneId].CandidateJobs[cardIndex].Labels.push(
        rest
      )
    },
    [createLabel.pending]: () => {
      // TO DO
    },
    [createLabel.rejected]: () => {
      //TO DO
    },
    //load more lane
    [loadMoreLane.fulfilled]: (state, action) => {
      state.loadMoreLane.isLoading = false
      const isEndPage = action.payload.data.length === 0
      state.columns.data.entities[action.payload.laneId].isEndPage = isEndPage
      state.columns.data.entities[action.payload.laneId].CandidateJobs = [
        ...state.columns.data.entities[action.payload.laneId].CandidateJobs,
        ...action.payload.data,
      ]
      // state.columns.data.entities[action.payload.laneId].CandidateJobs.push(...action.payload.data)
    },
    [loadMoreLane.pending]: (state) => {
      state.loadMoreLane.isLoading = true
    },
    [loadMoreLane.rejected]: (state, action) => {
      state.loadMoreLane.error = action.payload
      state.loadMoreLane.isLoading = false
    },
  },
})

export const { setColumnsAction, updateColumns } = kanbanSlice.actions

export default kanbanSlice.reducer
