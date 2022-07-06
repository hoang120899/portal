import { useEffect, useRef } from 'react'

// @mui
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'

// components
import Iconify from '@/components/Iconify'
import Scrollbar from '@/components/Scrollbar'
import useIsScrollToBottom from '@/hooks/useIsScrollToBottom'
// hooks
import useOffsetHeightKanban from '@/hooks/useOffsetHeightKanban'

//
import KanbanTaskCard from './KanbanTaskCard'

KanbanColumn.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number,
  hasAddPermission: PropTypes.bool,
  formRefProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  onOpenAddTask: PropTypes.func,
}

export default function KanbanColumn({
  column,
  index,
  hasAddPermission,
  formRefProp,
  onOpenAddTask,
}) {
  const scrollRef = useRef(null)
  const { enqueueSnackbar } = useSnackbar()
  const { lgHeight, xsHeight } = useOffsetHeightKanban(formRefProp)
  const { isScrollToBottom } = useIsScrollToBottom(scrollRef)
  const { nameColumn, CandidateJobs, id } = column

  useEffect(() => {
    if (!isScrollToBottom) return
    // TODO
  }, [isScrollToBottom])

  const handleDeleteTask = () => {
    enqueueSnackbar('Delete success!')
  }

  const color = [
    '#2688ea',
    '#0033ae',
    '#6c06b8',
    '#d804b5',
    '#04d8c7',
    '#04d857',
    '#b5d804',
    '#d8b504',
    '#ee3906',
    '#03875f',
    '#871e03',
    '#0a0387',
  ]

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={true}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant='outlined'
          sx={{
            px: 2,
            bgcolor: 'grey.5008',
            borderTop: `8px solid ${color[index % 12]}`,
            height: {
              lg: `calc(100vh - ${lgHeight}px)`,
              xs: `calc(100vh - ${xsHeight}px)`,
            },
          }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
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
                  onClick={onOpenAddTask}
                  sx={{
                    padding: 0,
                    justifyContent: 'end',
                    minWidth: 0,
                    '& .MuiButton-startIcon': {
                      marginRight: 0,
                    },
                  }}
                />
              )}
            </Box>

            {/* <Stack spacing={2} sx={{ pb: 2 }}>
              {open && (
                <KanbanAddTask
                  onAddTask={handleAddTask}
                  onCloseAddTask={handleCloseAddTask}
                />
              )}

              <Button
                fullWidth
                size='large'
                color='inherit'
                startIcon={
                  <Iconify icon={'eva:plus-fill'} width={20} height={20} />
                }
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14 }}
              />
            </Stack> */}

            <Droppable droppableId={id} type='task'>
              {(provided) => (
                <Scrollbar
                  scrollableNodeProps={{ ref: scrollRef }}
                  sx={{
                    height: {
                      lg: `calc(100vh - ${lgHeight + 16 + 44 + 24}px)`,
                      xs: `calc(100vh - ${xsHeight + 16 + 44 + 24}px)`,
                    },
                    width: '280px',
                    paddingBottom: 2,
                  }}
                >
                  <Stack
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    spacing={2}
                  >
                    {CandidateJobs.map((candi, index) => (
                      <KanbanTaskCard
                        key={candi.id}
                        onDeleteTask={handleDeleteTask}
                        card={candi}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </Stack>
                </Scrollbar>
              )}
            </Droppable>
          </Stack>
        </Paper>
      )}
    </Draggable>
  )
}
