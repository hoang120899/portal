import { Box, Stack, TextField, styled } from '@mui/material'

import PropTypes from 'prop-types'

import useResponsive from '@/hooks/useResponsive'
import { fDateTime } from '@/utils/formatTime'

InterviewDetail.propTypes = {
  interviewDetail: PropTypes.object,
}

const TextFieldRootStyle = styled('div')(() => ({
  '& .css-upa6c1-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
    backgroundColor: '#f3f6f9',
    borderRadius: '6px',
    WebkitTextFillColor: '#3F4254',
  },
}))

export default function InterviewDetail({ interviewDetail }) {
  const isSmallScreen = useResponsive('down', 'sm')
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
      <TextFieldRootStyle>
        <Box px={3} py={1}>
          <TextField disabled fullWidth value={candidateName} label='Name' />
        </Box>
        <Box px={3} py={1}>
          <TextField
            disabled
            fullWidth
            value={CandidateJob?.Job?.title}
            label='Name job'
          />
        </Box>
        <Box px={3} py={1}>
          <TextField
            disabled
            fullWidth
            value={CandidateJob.Candidate.email}
            label='Email'
          />
        </Box>
        <Box px={3} py={1}>
          <TextField
            disabled
            fullWidth
            value={CandidateJob.Candidate.phone}
            label='Phone'
          />
        </Box>
        <Box px={3} py={1}>
          <TextField
            disabled
            fullWidth
            value={linkZoom || ''}
            label='Link Zoom'
          />
        </Box>

        <Stack
          px={3}
          py={1}
          direction={isSmallScreen ? 'column' : 'row'}
          spacing={isSmallScreen ? 2 : 4}
        >
          <TextField disabled fullWidth value={locationName} label='Location' />
          <TextField disabled fullWidth value={type} label='Type' />
        </Stack>

        <Stack
          px={3}
          py={1}
          direction={isSmallScreen ? 'column' : 'row'}
          spacing={isSmallScreen ? 2 : 4}
        >
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
      </TextFieldRootStyle>
    </Box>
  )
}
