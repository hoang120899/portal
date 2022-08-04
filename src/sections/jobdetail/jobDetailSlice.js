import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADD_CARD,
  API_ADMIN_DOWNLOAD_CV_PDF,
  API_ASSIGNMENT_JOB,
  API_ASSIGN_LIST_USER,
  API_CANDIDATE_JOB,
  API_HISTORY_JOB,
  API_JOB_REMOVE_ASSIGNMENT,
  API_LANES,
  API_LIST_JOBS,
  API_SHORT_LINK,
} from '@/routes/api'
import { _getApi, _patchApi, _postApi } from '@/utils/axios'

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ['JobDetail', 'Comment'],
})

export const jobDetailApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getJobDetail: builder.query({
      query: ({ jobId }) => ({
        url: `${API_LIST_JOBS}/${jobId}`,
        method: 'GET',
      }),
    }),
    getAssignmentJob: builder.query({
      query: ({ jobId }) => ({
        url: `${API_ASSIGNMENT_JOB}/${jobId}`,
        method: 'GET',
      }),
    }),
    getAssignListUser: builder.query({
      query: () => ({
        url: API_ASSIGN_LIST_USER,
        method: 'GET',
      }),
    }),
    getShortLink: builder.query({
      query: ({ token }) => ({
        url: API_SHORT_LINK,
        method: 'POST',
        data: { link: token },
      }),
    }),
    getCandidateJob: builder.query({
      query: ({ jobId }) => ({
        url: `${API_CANDIDATE_JOB}/${jobId}`,
        method: 'GET',
      }),
    }),
    getLane: builder.query({
      query: () => ({
        url: API_LANES,
        method: 'GET',
      }),
    }),
    getJobActivity: builder.query({
      query: ({ idJob }) => ({
        url: API_HISTORY_JOB,
        method: 'POST',
        data: { idJob },
      }),
    }),
    getAdminCandidateDetail: builder.query({
      query: ({ id }) => ({
        url: `${API_ADD_CARD}/${id}`,
        method: 'GET',
      }),
    }),
    updateCandidate: builder.mutation({
      query: (data) => ({
        url: `${API_ADD_CARD}/${data.id}`,
        method: 'PATCH',
        data,
      }),
    }),
  }),
})

export const {
  useGetJobDetailQuery,
  useGetAssignmentJobQuery,
  useGetAssignListUserQuery,
  useGetShortLinkQuery,
  useGetCandidateJobQuery,
  useGetLaneQuery,
  useGetJobActivityQuery,
  useGetAdminCandidateDetailQuery,
  useUpdateCandidateMutation,
} = jobDetailApiSlice

export const getAssignUser = createAsyncThunk(
  'jobDetail/getAssignUser',
  async ({ jobId }) => {
    const url = `${API_ASSIGNMENT_JOB}/${jobId}`
    const response = await _getApi(url)
    return (response.data?.result || []).map((user) => ({
      ...user,
      id: user.userId,
    }))
  }
)

export const getJobDetail = createAsyncThunk(
  'jobDetail/getJobDetail',
  async ({ jobId }) => {
    const url = `${API_LIST_JOBS}/${jobId}`
    const response = await _getApi(url)

    return response?.data?.success ? response.data : []
  }
)

export const updateJobDetail = createAsyncThunk(
  'jobDetail/updateJobDetail',
  async ({ jobId, data }) => {
    const url = `${API_LIST_JOBS}/${jobId}`
    const response = await _patchApi(url, data)

    return response?.data?.success ? response.data : []
  }
)

export const removeAssignUser = createAsyncThunk(
  'jobDetail/removeAssignUser',
  async ({ jobId, userId, assignUser }, { dispatch, rejectWithValue }) => {
    try {
      const newAssignUser = assignUser.filter((user) => user.id !== userId)
      dispatch(updateAssignUser(newAssignUser))
      const response = await _postApi(API_JOB_REMOVE_ASSIGNMENT, {
        jobId,
        userId,
      })
      if (!response?.data?.success) {
        throw new Error('remove assign user failed')
      }
      return assignUser
    } catch (error) {
      return rejectWithValue(assignUser)
    }
  }
)

export const addAssignUser = createAsyncThunk(
  'jobDetail/addAssignUser',
  async (
    { jobId, userId, assignUser, assign },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(updateAssignUser([...assignUser, assign]))
      const url = `${API_ASSIGNMENT_JOB}/${jobId}`

      const response = await _postApi(url, {
        userId,
      })

      if (!response?.data?.success) {
        throw new Error('add assign user failed')
      }

      return assignUser
    } catch (error) {
      return rejectWithValue(assignUser)
    }
  }
)

const initialState = {
  assignUser: {
    isLoading: false,
    data: [],
  },
  jobDetail: {
    isLoading: false,
    data: {},
  },
  candidateJob: {
    base64: '',
    isLoading: false,
  },
}

export const convertDriverToBase64 = createAsyncThunk(
  'convertBase64/download',
  async ({ linkDrive }) => {
    const response = await _postApi(API_ADMIN_DOWNLOAD_CV_PDF, {
      linkDrive: linkDrive,
    })
    return response.data.base64
  }
)

const jobDetailSlice = createSlice({
  name: 'jobDetail',
  initialState,
  reducers: {
    updateAssignUser(state, action) {
      state.assignUser.data = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAssignUser.pending, (state) => {
        state.assignUser.isLoading = true
        state.assignUser.data = []
      })
      .addCase(getAssignUser.fulfilled, (state, action) => {
        state.assignUser.isLoading = false
        state.assignUser.data = action.payload
      })
      .addCase(getAssignUser.rejected, (state) => {
        state.assignUser.isLoading = false
      })
      .addCase(removeAssignUser.rejected, (state, action) => {
        state.assignUser.data = action.payload
      })
      .addCase(addAssignUser.rejected, (state, action) => {
        state.assignUser.data = action.payload
      })
      .addCase(getJobDetail.pending, (state) => {
        state.jobDetail.isLoading = true
        state.jobDetail.data = {}
      })
      .addCase(getJobDetail.fulfilled, (state, action) => {
        state.jobDetail.isLoading = false
        state.jobDetail.data = action.payload
      })
      .addCase(getJobDetail.rejected, (state) => {
        state.jobDetail.isLoading = false
      })
      .addCase(convertDriverToBase64.pending, (state) => {
        state.isLoading = true
      })
      .addCase(convertDriverToBase64.fulfilled, (state, action) => {
        state.isLoading = false
        state.base64 = action.payload
      })
      .addCase(convertDriverToBase64.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { updateAssignUser } = jobDetailSlice.actions

export default jobDetailSlice.reducer
