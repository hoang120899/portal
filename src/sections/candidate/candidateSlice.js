import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import qs from 'query-string'

import { apiSlice } from '@/redux/api/apiSlice'
import {
  API_ADMIN_DETAIL_CANDIDATE,
  API_ADMIN_DOWNLOAD_CV_PDF,
  API_ADMIN_PREVIEW_PDF_CANDIDATEJOB,
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
    getAdminCandidateDetail: builder.query({
      query: ({ candidateId }) => ({
        url: `${API_ADMIN_DETAIL_CANDIDATE}/${candidateId}`,
        method: 'GET',
      }),
    }),
  }),
})
export const convertDriverToBase64 = createAsyncThunk(
  'convertBase64/download',
  async (data) => {
    const response = await _postApi(API_ADMIN_DOWNLOAD_CV_PDF, data)
    return response.data.base64
  }
)
export const previewPDF = createAsyncThunk(
  'previewPDF/PDF',
  async (idCandidateJob) => {
    const response = await _getApi(
      `${API_ADMIN_PREVIEW_PDF_CANDIDATEJOB}/${idCandidateJob}`
    )
    return response.data.base64
  }
)
export const candidateSlice = createSlice({
  name: 'candidates',
  initialState: {
    base64: '',
    isLoadingPDF: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(convertDriverToBase64.fulfilled, (state, action) => {
        state.base64 = action.payload
        state.isLoadingPDF = false
      })
      .addCase(previewPDF.fulfilled, (state, action) => {
        state.base64 = action.payload
        state.isLoadingPDF = false
      })
  },
})
export const {
  useGetAdminSearchCandidateQuery,
  useGetAdminCandidateDetailQuery,
} = candidateApiSlice
export default candidateSlice.reducer
