import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { API_UPLOAD_AVATAR_PROFILE } from '@/routes/api'
import { _uploadApi } from '@/utils/axios'

export const fetchUploadAPI = createAsyncThunk(
  'fetchAvatar',
  async (formData) => {
    const data = await _uploadApi(`${API_UPLOAD_AVATAR_PROFILE}`, formData)
    return data
  }
)
const initialState = {
  avatar: {},
}
const uploadAvatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUploadAPI.fulfilled, (state, action) => {
      state.avatar = action.payload.data.avatar
    })
  },
})
export default uploadAvatarSlice.reducer
