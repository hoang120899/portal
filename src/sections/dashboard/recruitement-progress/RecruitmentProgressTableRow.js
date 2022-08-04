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
import { Box, TableCell, TableRow } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

import TextMaxLine from '@/components/TextMaxLine'
import { PATH_DASHBOARD } from '@/routes/paths'

const TimelineSeparatorStyle = styled(TimelineSeparator)(() => ({
  padding: '10px 0',
}))

const TimelineConnectorStyle = styled(TimelineConnector)(() => ({
  width: '4px',
}))

const TimelineContentStyle = styled(TimelineContent)(() => ({
  padding: '8px 10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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
  const theme = useTheme()

  const handleForwardToBoard = () => {
    router.push(PATH_DASHBOARD.board.root)
  }

  return (
    <TableRow hover>
      <TableCell align='left' sx={{ py: '2px', width: '55%' }}>
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
              <TextMaxLine
                variant='subtitle2'
                onClick={handleForwardToBoard}
                sx={{
                  cursor: 'pointer',
                  maxWidth: '100%',
                  '&:hover': { color: theme.palette.primary.main },
                }}
                line={1}
              >
                {candidateName}
              </TextMaxLine>

              <TextMaxLine
                variant='caption'
                sx={{ color: 'text.secondary', maxWidth: '100%' }}
                line={1}
              >
                {title}
              </TextMaxLine>
            </TimelineContentStyle>
          </TimelineItem>
        </Box>
      </TableCell>

      <TableCell align='left' sx={{ py: '2px', width: '45%' }}>
        <ColorPreview component='span'>
          <TimelineDot sx={{ bgcolor: `${background}` }} />
          <TextMaxLine
            variant='subtitle2'
            sx={{ mt: '6px', ml: '4px', maxWidth: '100%' }}
            line={2}
          >
            {nameColumn}
          </TextMaxLine>
        </ColorPreview>
      </TableCell>
    </TableRow>
  )
}
