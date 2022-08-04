import React, { memo } from 'react'

import { Box, Button, Stack, Typography } from '@mui/material'

import { compareAsc, format, parseISO } from 'date-fns'
import PropTypes from 'prop-types'

import IconTimer from '@/assets/icon_timer'
import Iconify from '@/components/Iconify'
import { DATETIME_FORMAT, DATE_FORMAT_DAY_MONTH } from '@/config'

KanbanBasicInfo.propTypes = {
  Candidate: PropTypes.object,
  card: PropTypes.object,
  Job: PropTypes.object,
}

function KanbanBasicInfo({ Candidate, card, Job }) {
  const isAfterNow = (date) => compareAsc(parseISO(date), new Date()) === 1

  return (
    <Box>
      <Typography
        variant='h5'
        sx={{
          overflowWrap: 'break-word',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: '2',
          overflow: 'hidden',
        }}
      >
        {Candidate?.name}
      </Typography>

      <Stack spacing={1} sx={{ marginY: '8px', position: 'relative' }}>
        {card.Interviews.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: -16,
              zIndex: 1,
            }}
          >
            <Iconify
              icon={'bi:bookmark-star-fill'}
              sx={{
                color: '#3699FF',
                width: '36px',
                height: '36px',
              }}
            />
          </Box>
        )}

        {card.Interviews?.map((interview) => (
          <Button
            key={interview.id}
            variant='contained'
            color='secondary'
            size='small'
            sx={{
              paddingX: '0.75rem',
              borderRadius: '0.42rem',
              width: 'fit-content',
              boxShadow: 'none',
              svg: {
                marginRight: '0.5rem',
              },
            }}
          >
            <IconTimer fill='#fff' color='white' />
            {format(new Date(interview.timeInterview), DATE_FORMAT_DAY_MONTH)}
          </Button>
        ))}

        {card.expectedDate && (
          <Button
            variant='contained'
            color={`${isAfterNow(card.expectedDate) ? 'primary' : 'error'}`}
            size='small'
            sx={{
              width: 'fit-content',
              boxShadow: 'none',
              paddingX: '0.75rem',
              borderRadius: '0.42rem',
              svg: {
                marginRight: '0.5rem',
              },
            }}
          >
            <IconTimer fill='#fff' color='white' />
            {format(new Date(card.expectedDate), DATETIME_FORMAT)}
          </Button>
        )}
      </Stack>

      <Typography variant='subtitle2' color='#777'>
        {Job.title}
      </Typography>
    </Box>
  )
}

export default memo(KanbanBasicInfo)
