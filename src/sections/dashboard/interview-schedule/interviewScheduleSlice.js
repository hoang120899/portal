import qs from 'query-string'

import { DATETIME_FORMAT } from '@/config'
import { apiSlice } from '@/redux/api/apiSlice'
import { API_ADMIN_CALENDAR_INTERVIEW } from '@/routes/api'
import { fDate, fUtcToDateTime } from '@/utils/formatTime'

import { TEXT_COLORS } from './config'

export const interviewScheduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminCalendarInterview: builder.query({
      query: (queries = {}) => ({
        url: `${API_ADMIN_CALENDAR_INTERVIEW}?${qs.stringify(queries)}`,
        method: 'GET',
      }),
      transformResponse: (responseData) => {
        const { calendar = {} } = responseData?.data || {}

        return Object.keys(calendar).reduce((prev, curr, currIndex) => {
          const { interviews = [] } = calendar[curr] || {}
          const listInterviews = interviews.map((value) => {
            const {
              timeInterview,
              timeInterviewEnd,
              CandidateJob: {
                Candidate: { name: candidateName = '' } = {},
                Job: { Location: { name: locationName = '' } = {} } = {},
              } = {},
            } = value

            return {
              ...value,
              start: timeInterview,
              end: timeInterviewEnd,
              timeInterviewStr: fDate(
                fUtcToDateTime(timeInterview),
                DATETIME_FORMAT
              ),
              timeInterviewEndStr: fDate(
                fUtcToDateTime(timeInterviewEnd),
                DATETIME_FORMAT
              ),
              title: candidateName,
              textColor: TEXT_COLORS[currIndex % 5],
              candidateName,
              locationName,
            }
          })
          return {
            ...prev,
            [curr]: {
              interviews: listInterviews,
            },
          }
        }, {})
      },
    }),
  }),
})

export const { useGetAdminCalendarInterviewQuery } = interviewScheduleApiSlice
