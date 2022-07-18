import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_SALARY } from '@/routes/api'
import { _postApi } from '@/utils/axios'

export const getSalary = createAsyncThunk('caculator/post', async (data) => {
  const response = await _postApi(API_SALARY, data)
  return response.data
})

export const salarySlice = createSlice({
  name: 'caculator',
  initialState: { data: {} },
  reducers: {},
  // extra reducers set get column to state
  extraReducers: {
    [getSalary.fulfilled]: (state, action) => {
      state.data = action.payload.result
    },
  },
})

export default salarySlice.reducer
