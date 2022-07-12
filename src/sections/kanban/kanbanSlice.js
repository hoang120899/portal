import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADD_CARD,
  API_ADMIN_CARDS,
  API_ADMIN_LIST_JOB,
  API_LIST_CARD,
  API_LIST_CLIENT,
  API_LIST_LABEL,
  API_LIST_MEMBER,
  API_SEARCH_CARD,
} from '@/routes/api'
import { _getApi, _patchApi } from '@/utils/axios'

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
    getJob: builder.query({
      query: () => ({
        url: API_ADMIN_LIST_JOB,
        method: 'GET',
      }),
    }),
    getMember: builder.query({
      query: () => ({
        url: API_LIST_MEMBER,
        method: 'GET',
      }),
    }),
    searchCards: builder.query({
      query: (queries = {}) => ({
        url: `${API_SEARCH_CARD}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
      transformResponse: (responseData) =>
        (responseData.data.list || []).map(
          ({ id: cardId, Candidate: { name: candidateName } }, index) => ({
            value: candidateName,
            label: `${candidateName}-${index}`,
            id: cardId,
          })
        ),
    }),
  }),
})

export const {
  useGetClientQuery,
  useGetJobQuery,
  useGetLabelQuery,
  useGetMemberQuery,
  useSearchCardsQuery,
} = kanbanApiSlice

export const getBoard = createAsyncThunk(
  'kanban/getBoard',
  async (queries = {}) => {
    const response = await _getApi(API_LIST_CARD, {
      params: queries,
    })
    return response.data.list
  }
)

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
}

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    updateBoardColumns(state, action) {
      state.board.columns = action.payload
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
  },
})

export const { updateBoardColumns } = kanbanSlice.actions
export const selectBoard = createSelector(
  [(state) => state.kanban.board],
  (board) => board
)

export default kanbanSlice.reducer
