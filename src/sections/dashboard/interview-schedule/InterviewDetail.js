import { Box, Stack, TextField } from '@mui/material'

import PropTypes from 'prop-types'

import { fDateTime } from '@/utils/formatTime'

InterviewDetail.propTypes = {
  interviewDetail: PropTypes.object,
}

export default function InterviewDetail({ interviewDetail }) {
  const {
    candidateName,
    linkZoom = '',
    timeInterview,
    timeInterviewEnd,
    CandidateJob,
    type,
    locationName,
  } = interviewDetail

  return (
    <Box>
      <Box px={3} py={2}>
        <TextField disabled fullWidth value={candidateName} label='Name' />
      </Box>
      <Box px={3} py={2}>
        <TextField
          disabled
          fullWidth
          value={CandidateJob?.Job?.title}
          label='Name job'
        />
      </Box>
      <Box px={3} py={2}>
        <TextField
          disabled
          fullWidth
          value={CandidateJob.Candidate.email}
          label='Email'
        />
      </Box>
      <Box px={3} py={2}>
        <TextField
          disabled
          fullWidth
          value={CandidateJob.Candidate.phone}
          label='Phone'
        />
      </Box>
      <Box px={3} py={2}>
        <TextField disabled fullWidth value={linkZoom} label='Link Zoom' />
      </Box>

      <Stack px={3} py={2} direction='row' spacing={2}>
        <TextField disabled fullWidth value={locationName} label='Location' />
        <TextField disabled fullWidth value={type} label='Type' />
      </Stack>

      <Stack px={3} py={2} direction='row' spacing={2}>
        <TextField
          disabled
          fullWidth
          value={fDateTime(timeInterview)}
          label='Time Interview'
        />
        <TextField
          disabled
          fullWidth
          value={fDateTime(timeInterviewEnd)}
          label='Time Interview End'
        />
      </Stack>
    </Box>
  )
}
