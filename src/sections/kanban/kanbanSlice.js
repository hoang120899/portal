import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'
import qs from 'query-string'

import { DATE_YEAR_MONTH_DAY_FORMAT } from '@/config'
import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADD_CARD,
  API_ADMIN_CARDS,
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
import { _deleteApi, _getApi, _patchApi, _postApi } from '@/utils/axios'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['Kanban', 'Comment'],
})

export const kanbanApiSlice = apiWithTag.injectEndpoints({
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
    getActiveJobs: builder.query({
      query: () => ({
        url: API_LIST_ACTIVE_JOB,
        method: 'GET',
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
    searchCards: builder.query({
      query: (queries = {}) => ({
        url: `${API_SEARCH_CARD}?${qs.stringify(queries)}`,
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
    getUser: builder.query({
      query: () => ({
        url: API_LIST_USER,
        method: 'GET',
      }),
    }),
    getCardDetail: builder.mutation({
      query: (cardId) => ({
        url: `${API_ADD_CARD}/${cardId}`,
        method: 'GET',
      }),
    }),
    updateLane: builder.mutation({
      query: (data) => ({
        url: `${API_ADD_CARD}/${data.cardId}`,
        method: 'PATCH',
        data: { laneId: data.laneId },
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
  }),
})

export const {
  useGetClientQuery,
  useGetLabelQuery,
  useGetMemberQuery,
  useSearchCardsQuery,
  useGetUserQuery,
  useSearchPhoneQuery,
  useSearchEmailQuery,
  useGetActiveJobsQuery,
  useGetListCommentQuery,
  useAddCommentMutation,
  useEditCommentMutation,
  useGetUpdateHistoryQuery,
  useGetCardDetailMutation,
  useUpdateLaneMutation,
  useAddCardMutation,
  useUpdateCardMutation,
} = kanbanApiSlice

export const getBoard = createAsyncThunk('kanban/getBoard', async (data) => {
  let queries
  if (data) {
    queries = Object.keys(data)
      .filter((key) => key !== 'search' && data[key])
      .reduce((obj, key) => {
        const getValue = (key) => {
          if (['startDate', 'endDate'].includes(key))
            return format(data[key], DATE_YEAR_MONTH_DAY_FORMAT)
          return data[key]
        }
        return {
          ...obj,
          [key]: getValue(key),
        }
      }, {})
  }
  const response = await _getApi(API_LIST_CARD, {
    params: queries,
  })
  return response.data.list
})

export const getMoreCardByColumn = createAsyncThunk(
  'kanban/getMoreCardByColumn',
  async ({ columnId, offset = 0 }) => {
    const response = await _getApi(`${API_ADMIN_CARDS}/${columnId}/lane`, {
      params: {
        offset,
      },
    })
    return {
      data: response.data.list,
      columnId,
    }
  }
)

export const updateCardByDestColumn = createAsyncThunk(
  'kanban/updateCardByDestColumn',
  async (
    { columnId, cardId, originalColumns = {}, newColumns = {} },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateBoardColumns(newColumns))
      const response = await _patchApi(`${API_ADD_CARD}/${cardId}`, {
        laneId: columnId,
      })
      if (response.data.success) return
      return rejectWithValue({
        columns: originalColumns,
      })
    } catch (error) {
      return rejectWithValue({
        columns: originalColumns,
      })
    }
  }
)

export const createLabel = createAsyncThunk(
  'kanban/createLabel',
  async (data) => {
    const { laneId, ...rest } = data
    const response = await _postApi(API_V1_CARD_LABEL, rest)
    if (response.data.success) {
      return { ...data, laneId: laneId }
    }
    return response
  }
)
export const deleteLabel = createAsyncThunk(
  'kanban/deleteLabel',
  async (data) => {
    const { id } = data
    const response = await _deleteApi(`${API_V1_CARD}/${id}/label`)
    if (response.data.success) {
      return { ...data }
    }
    return response
  }
)
export const moveCard = createAsyncThunk('kanban/moveCard', async (data) => {
  const { laneId, cardId } = data
  const url = `${API_ADD_CARD}/${cardId}`
  const response = await _patchApi(url, { laneId: laneId })
  if (response.data.success) {
    return { ...data }
  }
  return response
})
export const storageCard = createAsyncThunk(
  'kanban/storageCard',
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
export const removeAssignee = createAsyncThunk(
  'kanban/removeAssignee',
  async ({ cardId, ...user }, { dispatch, rejectWithValue }) => {
    try {
      const url = `${API_REMOVE_ASSIGNMENT}/${cardId}`
      dispatch(removeCardAssignee({ cardId: cardId, ...user }))
      const response = await _patchApi(url, { userId: user.id })
      if (response.data.success) {
        return { cardId: cardId, ...user }
      }
      return response
    } catch (error) {
      return rejectWithValue({ cardId: cardId, ...user })
    }
  }
)
export const addAssignee = createAsyncThunk(
  'kanban/addAssignee',
  async ({ cardId, ...user }, { dispatch, rejectWithValue }) => {
    try {
      const url = `${API_ASSIGNMENT}/${cardId}`
      dispatch(addCardAssignee({ cardId: cardId, ...user }))
      const response = await _patchApi(url, { userId: user.id })
      if (response.data.success) {
        return { cardId: cardId, ...user }
      }
      return response
    } catch (error) {
      return rejectWithValue({ cardId: cardId, ...user })
    }
  }
)

function objFromArray(array, key = 'id') {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current
    return accumulator
  }, {})
}

const initialState = {
  isLoading: false,
  error: null,
  board: {
    columns: {},
    columnOrder: [],
  },
  listColumnName: [],
}

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    updateBoardColumns(state, action) {
      state.board.columns = action.payload
    },
    addCardAssignee(state, action) {
      const { laneId, cardId, ...user } = action.payload
      const cardIndex = state.board.columns[laneId].CandidateJobs.findIndex(
        (item) => item.id === cardId
      )
      if (cardIndex !== -1) {
        state.board.columns[laneId].CandidateJobs[cardIndex].Users.push(user)
      }
    },
    removeCardAssignee(state, action) {
      const { laneId, cardId, ...user } = action.payload
      const cardIndex = state.board.columns[laneId].CandidateJobs.findIndex(
        (item) => item.id === cardId
      )
      if (cardIndex !== -1) {
        state.board.columns[laneId].CandidateJobs[cardIndex].Users =
          state.board.columns[laneId].CandidateJobs[cardIndex].Users.filter(
            (item) => item.id !== user.id
          )
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getBoard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.isLoading = false
        state.board.columnOrder = action.payload.map((value) => value.id)
        state.board.columns = objFromArray(action.payload)
        const listName = action.payload.map((item) => ({
          label: item.nameColumn,
          value: item.id,
        }))
        state.listColumnName = listName
      })
      .addCase(getBoard.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(getMoreCardByColumn.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMoreCardByColumn.fulfilled, (state, action) => {
        const { columnId, data } = action.payload || {}

        state.isLoading = false
        state.board.columns[columnId].isEndPage = data.length === 0
        state.board.columns[columnId].CandidateJobs.push(...data)
      })
      .addCase(getMoreCardByColumn.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(updateCardByDestColumn.rejected, (state, action) => {
        state.board.columns = action.payload.columns
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        const { laneId, cardId, id } = action.payload
        const cardIndex = state.board.columns[laneId].CandidateJobs.findIndex(
          (item) => item.id === cardId
        )
        state.board.columns[laneId].CandidateJobs[cardIndex].Labels =
          state.board.columns[laneId].CandidateJobs[cardIndex].Labels.filter(
            (item) => item.id !== id
          )
      })
      .addCase(createLabel.pending, () => {
        // TODO: show loading
      })
      .addCase(createLabel.fulfilled, (state, action) => {
        const { laneId, candidateJobId, ...rest } = action.payload
        const cardIndex = state.board.columns[laneId].CandidateJobs.findIndex(
          (item) => item.id === candidateJobId
        )
        state.board.columns[laneId].CandidateJobs[cardIndex].Labels.push(rest)
      })
      .addCase(createLabel.rejected, () => {
        // TODO: show error
      })
      .addCase(moveCard.pending, () => {
        // TODO: show loading
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        const { laneId, cardId, sourceId } = action.payload
        const card = state.board.columns[sourceId].CandidateJobs.find(
          (item) => item.id === cardId
        )
        const sourceIndex = state.board.columns[
          sourceId
        ].CandidateJobs.findIndex((item) => item.id === cardId)
        state.board.columns[sourceId].CandidateJobs.splice(sourceIndex, 1)
        state.board.columns[laneId].CandidateJobs.splice(0, 0, card)
      })
      .addCase(moveCard.rejected, () => {
        // TODO: show error
      })
      .addCase(storageCard.pending, () => {
        // TODO: show loading
      })
      .addCase(storageCard.fulfilled, (state, action) => {
        // remove card after storage
        const { laneId, cardId } = action.payload
        const cardIndex = state.board.columns[laneId].CandidateJobs.findIndex(
          (item) => item.id === cardId
        )
        state.board.columns[laneId].CandidateJobs.splice(cardIndex, 1)
      })
      .addCase(storageCard.rejected, () => {
        // TODO: show error
      })
      .addCase(addAssignee.rejected, (state, action) => {
        const { laneId, cardId, ...user } = action.payload
        const cardIndex = state.board.columns[laneId].CandidateJobs.findIndex(
          (item) => item.id === cardId
        )
        if (cardIndex !== -1) {
          state.board.columns[laneId].CandidateJobs[cardIndex].Users =
            state.board.columns[laneId].CandidateJobs[cardIndex].Users.filter(
              (item) => item.id !== user.id
            )
        }
      })
      .addCase(removeAssignee.rejected, (state, action) => {
        const { laneId, cardId, ...user } = action.payload
        const cardIndex = state.board.columns[laneId].CandidateJobs.findIndex(
          (item) => item.id === cardId
        )
        if (cardIndex !== -1) {
          state.board.columns[laneId].CandidateJobs[cardIndex].Users.push(user)
        }
      })
  },
})

export const { updateBoardColumns, addCardAssignee, removeCardAssignee } =
  kanbanSlice.actions
export const selectBoard = createSelector(
  [(state) => state.kanban.board],
  (board) => board
)

export default kanbanSlice.reducer
