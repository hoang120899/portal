import React, { useEffect, useRef } from 'react'

// @mui
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'

// components
import Iconify from '@/components/Iconify'
// hooks
import useIsScrollToBottom from '@/hooks/useIsScrollToBottom'
import useKanban from '@/hooks/useKanban'
import useLocales from '@/hooks/useLocales'
// redux
import { useDispatch, useSelector } from '@/redux/store'

//
import KanbanTaskCard from './KanbanTaskCard'
import { CARD_WIDTH, KANBAN_STATUS_HEADER_HEIGHT } from './config'
// sections
import { getMoreCardByColumn } from './kanbanSlice'

KanbanColumn.propTypes = {
  column: PropTypes.object,
  hasAddPermission: PropTypes.bool,
  onOpenAddTask: PropTypes.func,
  onOpenUpdateTask: PropTypes.func,
}

function KanbanColumn({
  column,
  hasAddPermission,
  onOpenAddTask,
  onOpenUpdateTask,
}) {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.kanban)
  const { translate } = useLocales()
  const scrollRef = useRef(null)
  const { kanbanColumn: { lgHeight = 0, xsHeight = 0 } = {} } = useKanban()
  const { isScrollToBottom } = useIsScrollToBottom(scrollRef)
  const {
    nameColumn,
    background,
    CandidateJobs = [],
    id: columnId,
    isEndPage = false,
  } = column
  const offset = CandidateJobs.length

  useEffect(() => {
    if (!isScrollToBottom || isEndPage) return
    dispatch(
      getMoreCardByColumn({
        columnId,
        offset,
      })
    )
  }, [isScrollToBottom, isEndPage, dispatch, columnId, offset])

  return (
    <Paper
      variant='outlined'
      sx={{
        px: 2,
        bgcolor: 'grey.5008',
        height: {
          lg: `calc(100vh - ${lgHeight}px)`,
          xs: `calc(100vh - ${xsHeight}px)`,
        },
      }}
    >
      <Box
        sx={{
          background: background,
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          height: '8px',
          marginX: -2,
        }}
      />

      <Stack spacing={2} sx={{ pb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2,
          }}
        >
          <Typography variant='h6'>{nameColumn}</Typography>
          {hasAddPermission && (
            <Button
              color='inherit'
              startIcon={
                <Iconify
                  icon={'eva:plus-circle-outline'}
                  width={24}
                  height={24}
                />
              }
              sx={{
                padding: 0,
                justifyContent: 'end',
                minWidth: 0,
                '& .MuiButton-startIcon': {
                  marginRight: 0,
                },
              }}
              onClick={onOpenAddTask.bind(null, columnId)}
            />
          )}
        </Box>
      </Stack>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <Box
            ref={scrollRef}
            sx={{
              height: {
                lg: `calc(100vh - ${lgHeight + KANBAN_STATUS_HEADER_HEIGHT}px)`,
                xs: `calc(100vh - ${xsHeight + KANBAN_STATUS_HEADER_HEIGHT}px)`,
              },
              width: `${CARD_WIDTH}px`,
              overflowY: 'auto',
              mb: 2,
            }}
          >
            <Stack
              ref={provided.innerRef}
              {...provided.droppableProps}
              spacing={2}
              sx={{
                minHeight: '200px',
              }}
            >
              {CandidateJobs.map((value, index) => (
                <KanbanTaskCard
                  key={`${value.id}-${index}`}
                  card={value}
                  hasAddPermission={hasAddPermission}
                  onOpenUpdateTask={onOpenUpdateTask}
                  laneId={columnId}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Stack>

            {isScrollToBottom && isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingY: 2,
                }}
              >
                <CircularProgress size={24} sx={{ marginRight: 0.5 }} />
                {translate('pages.board.waiting')}...
              </Box>
            )}
          </Box>
        )}
      </Droppable>
    </Paper>
  )
}

export default React.memo(KanbanColumn)
