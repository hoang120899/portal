import { Box, Stack, TextField, styled } from '@mui/material'

import PropTypes from 'prop-types'

import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import { fDateTime } from '@/utils/formatTime'

InterviewDetail.propTypes = {
  interviewDetail: PropTypes.object,
}

const TypographyRootStyle = styled('div')(({ theme }) => ({
  '& .MuiInputBase-input.Mui-disabled': {
    color: `${theme.palette.text.primary}`,
    WebkitTextFillColor: `${theme.palette.text.primary}`,
    opacity: 0.8,
    ...(theme.palette.mode === 'light' && {
      backgroundColor: '#f3f6f9',
      borderRadius: theme.spacing(1),
    }),
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    WebkitTextFillColor: `${theme.palette.text.primary}`,
  },
}))

export default function InterviewDetail({ interviewDetail }) {
  const { translate } = useLocales()
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

  const { Job = {}, Candidate = {} } = CandidateJob || {}
  const { title = '' } = Job || {}
  const { email = '', phone = '' } = Candidate || {}

  return (
    <Box>
      <TypographyRootStyle>
        <Box px={3} py={1}>
          <TextField
            disabled
            fullWidth
            value={candidateName}
            label={translate('pages.dashboard.interviewSchedule.name')}
          />
        </Box>

        <Box px={3} py={1}>
          <TextField
            disabled
            fullWidth
            value={title}
            label={translate('pages.dashboard.interviewSchedule.nameJob')}
          />
        </Box>

        <Box px={3} py={1}>
          <TextField disabled fullWidth value={email} label='Email' />
        </Box>

        <Box px={3} py={1}>
          <TextField
            disabled
            fullWidth
            value={phone}
            label={translate('pages.dashboard.interviewSchedule.phone')}
          />
        </Box>

        <Box px={3} py={1}>
          <TextField
            disabled
            fullWidth
            value={linkZoom || ''}
            label={translate('pages.dashboard.interviewSchedule.linkZoom')}
          />
        </Box>

        <Stack
          px={3}
          py={1}
          direction={isSmallScreen ? 'column' : 'row'}
          spacing={isSmallScreen ? 2 : 4}
        >
          <TextField
            disabled
            fullWidth
            value={locationName}
            label={translate('pages.dashboard.interviewSchedule.location')}
          />
          <TextField
            disabled
            fullWidth
            value={type}
            label={translate('pages.dashboard.interviewSchedule.type')}
          />
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
            label={translate('pages.dashboard.interviewSchedule.timeStart')}
          />
          <TextField
            disabled
            fullWidth
            value={fDateTime(timeInterviewEnd)}
            label={translate('pages.dashboard.interviewSchedule.timeEnd')}
          />
        </Stack>
      </TypographyRootStyle>
    </Box>
  )
}
