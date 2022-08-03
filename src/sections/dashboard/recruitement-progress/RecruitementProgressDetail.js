// @mui
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab'
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

const TimelineSeparatorStyle = styled(TimelineSeparator)(() => ({
  padding: '10px 0',
}))

const TimelineConnectorStyle = styled(TimelineConnector)(() => ({
  width: '4px',
}))

const TimelineContentStyle = styled(TimelineContent)(() => ({
  padding: '8px 10px',
}))

const ColorPreview = styled(Box)(() => ({
  display: 'flex',
}))

RecruitementProgressDetail.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    team: PropTypes.string,
    status: PropTypes.string,
  }),
}

export default function RecruitementProgressDetail({ item }) {
  const { name, team, status } = item
  return (
    <Stack direction='row'>
      <Box sx={{ flexGrow: 1 }}>
        <TimelineItem>
          <TimelineSeparatorStyle>
            <TimelineConnectorStyle />
          </TimelineSeparatorStyle>

          <TimelineContentStyle>
            <Typography variant='subtitle2'>{name}</Typography>

            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
              {team}
            </Typography>
          </TimelineContentStyle>
        </TimelineItem>
      </Box>

      <ColorPreview component='span'>
        <TimelineDot color='primary' />
        <Typography variant='subtitle2' sx={{ mt: '6px', ml: '4px' }}>
          {status}
        </Typography>
      </ColorPreview>
    </Stack>
  )
}
