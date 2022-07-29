import React from 'react'

import { useRouter } from 'next/router'

// @mui
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab'
import { Box, TableCell, TableRow, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import { PATH_DASHBOARD } from '@/routes/paths'

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

RecruitmentProgressTableRow.propTypes = {
  row: PropTypes.object,
}

export default function RecruitmentProgressTableRow({ row }) {
  const {
    Candidate: { name: candidateName },
    Job: { title },
    Lane: { nameColumn, background },
  } = row
  const router = useRouter()

  const handleForwardToBoard = () => {
    router.push(PATH_DASHBOARD.board.root)
  }

  return (
    <TableRow hover>
      <TableCell align='left' sx={{ py: '2px', width: '65%' }}>
        <Box
          sx={{
            '& .MuiTimelineItem-missingOppositeContent:before': {
              display: 'none',
            },
          }}
        >
          <TimelineItem>
            <TimelineSeparatorStyle>
              <TimelineConnectorStyle sx={{ bgcolor: `${background}` }} />
            </TimelineSeparatorStyle>

            <TimelineContentStyle>
              <Typography
                variant='subtitle2'
                onClick={handleForwardToBoard}
                sx={{ cursor: 'pointer' }}
              >
                {candidateName}
              </Typography>

              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                {title}
              </Typography>
            </TimelineContentStyle>
          </TimelineItem>
        </Box>
      </TableCell>
      <TableCell align='left'>
        <ColorPreview component='span'>
          <TimelineDot sx={{ bgcolor: `${background}` }} />
          <Typography variant='subtitle2' sx={{ mt: '6px', ml: '4px' }}>
            {nameColumn}
          </Typography>
        </ColorPreview>
      </TableCell>
    </TableRow>
  )
}
