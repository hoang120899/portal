import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_SALARY } from '@/routes/api'
import { _postApi } from '@/utils/axios'

export const getSalary = createAsyncThunk(
  'caculator/post',
  async ({ rateInputValue, ...res }) => {
    const response = await _postApi(API_SALARY, res)
    return {
      data: response.data.result,
      rateInputValue,
    }
  }
)

export const salarySlice = createSlice({
  name: 'caculator',
  initialState: { data: {} },
  reducers: {},
  // extra reducers set get column to state
  extraReducers: {
    [getSalary.fulfilled]: (state, action) => {
      const { data = {}, rateInputValue } = action.payload
      const listKeys = Object.keys(data)

      state.data = listKeys.reduce(
        (prev, curr) => ({
          ...prev,
          [curr]: data[curr],
          [`${curr}_VNDToSGD`]: (
            Number(data[curr]?.replaceAll(',', '')) / rateInputValue
          ).toFixed(0),
        }),
        {}
      )
    },
  },
})

export default salarySlice.reducer
