import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADMIN_DETAIL_CANDIDATE,
  API_ADMIN_DOWNLOAD_CV_PDF,
  API_ADMIN_SEARCH_CANDIDATE,
} from '@/routes/api'
import { _getApi, _postApi } from '@/utils/axios'

import { SEARCH_FIELD } from './config'

export const candidateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSearchCandidate: builder.query({
      query: (queries = {}) => {
        const data = Object.keys(queries).reduce((obj, key) => {
          let value = queries[key] || null
          if (SEARCH_FIELD.JOB_ID === key) {
            value = queries[key]?.id
          } else if (SEARCH_FIELD.SKILL === key) {
            value = (queries[key] || [])
              .map(({ label }) => label)
              .filter(Boolean)
              .join(',')
          }

          if (!value) return obj
          return {
            ...obj,
            [key]: value,
          }
        }, {})

        return {
          url: `${API_ADMIN_SEARCH_CANDIDATE}?${qs.stringify(data)}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const getAdminCandidateDetail = createAsyncThunk(
  'getCandidate/Detail',
  async ({ candidateId }) => {
    const response = await _getApi(
      `${API_ADMIN_DETAIL_CANDIDATE}/${candidateId}`
    )
    return response.data
  }
)

export const convertDriverToBase64 = createAsyncThunk(
  'convertBase64/download',
  async ({ linkDrive, candidateId }) => {
    if (!candidateId) return
    const response = await _postApi(API_ADMIN_DOWNLOAD_CV_PDF, {
      linkDrive: linkDrive,
    })
    return {
      base64: response.data.base64,
      candidateId,
    }
  }
)

export const candidateSlice = createSlice({
  name: 'candidates',
  initialState: {
    candidateDetail: {},
    base64: '',
    isLoadingPDF: false,
  },
  reducers: {
    resetCandidateDetail(state) {
      state.candidateDetail = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminCandidateDetail.pending, (state) => {
        state.isLoadingPDF = false
      })
      .addCase(getAdminCandidateDetail.fulfilled, (state, action) => {
        state.candidateDetail = action.payload.data
        state.base64 = ''
        state.isLoadingPDF = true
      })
      .addCase(getAdminCandidateDetail.rejected, (state) => {
        state.isLoadingPDF = false
      })
      .addCase(convertDriverToBase64.pending, (state) => {
        state.isLoadingPDF = true
      })
      .addCase(convertDriverToBase64.fulfilled, (state, action) => {
        const { base64 = '', candidateId: originalCandidateId = '' } =
          action.payload
        const { id: candidateId = '' } = state.candidateDetail
        if (originalCandidateId !== candidateId) return

        state.base64 = base64
        state.isLoadingPDF = false
      })
      .addCase(convertDriverToBase64.rejected, (state) => {
        state.isLoadingPDF = false
      })
  },
})

export const { resetCandidateDetail } = candidateSlice.actions

export const { useGetAdminSearchCandidateQuery } = candidateApiSlice

export default candidateSlice.reducer
