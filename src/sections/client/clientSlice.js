import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import { API_ADMIN_CLIENTS_LIST, API_SHORT_LINK } from '@/routes/api'
import { _postApi } from '@/utils/axios'

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['Clients'] })

export const clientApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getAdminClientList: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_CLIENTS_LIST}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
      providesTags: ['Clients'],
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: API_ADMIN_CLIENTS_LIST,
        data,
        method: 'POST',
      }),
      invalidatesTags: ['Clients'],
    }),
    updateClient: builder.mutation({
      query: ({ clientId, data }) => ({
        url: `${API_ADMIN_CLIENTS_LIST}/${clientId}`,
        data,
        method: 'PATCH',
      }),
      invalidatesTags: ['Clients'],
    }),
    deleteClient: builder.mutation({
      query: (clientId) => ({
        url: `${API_ADMIN_CLIENTS_LIST}/${clientId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Clients'],
    }),
  }),
})

export const {
  useGetAdminClientListQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApiSlice

export const getShortLink = createAsyncThunk(
  'client/getShortLink',
  async (token) => {
    const response = await _postApi(API_SHORT_LINK, { link: token })
    return response.data.url
  }
)

export const clientSlice = createSlice({
  name: 'client',
  initialState: { shortLink: '' },
  reducers: {},
  // extra reducers set get column to state
  extraReducers: {
    [getShortLink.fulfilled]: (state, action) => {
      state.shortLink = action.payload
    },
  },
})

export default clientSlice.reducer
