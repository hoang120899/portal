import { useState } from 'react'

// @mui
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'

// components
import Iconify from '@/components/Iconify'
// hooks
import useOffsetHeightKanban from '@/hooks/useOffsetHeightKanban'

//
import KanbanAddTask from './KanbanTaskAdd'
import KanbanTaskCard from './KanbanTaskCard'

KanbanColumn.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number,
  formRefProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
}

export default function KanbanColumn({ column, index, formRefProp }) {
  const { enqueueSnackbar } = useSnackbar()
  const { lgHeight, xsHeight } = useOffsetHeightKanban(formRefProp)

  const [open, setOpen] = useState(false)

  const { nameColumn, CandidateJobs, id } = column

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev)
  }

  const handleCloseAddTask = () => {
    setOpen(false)
  }

  const handleDeleteTask = () => {
    enqueueSnackbar('Delete success!')
  }

  const handleAddTask = () => {
    handleCloseAddTask()
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
              <Button
                color='inherit'
                startIcon={
                  <Iconify
                    icon={'eva:plus-circle-outline'}
                    width={24}
                    height={24}
                  />
                }
                onClick={handleOpenAddTask}
                sx={{
                  padding: 0,
                  justifyContent: 'end',
                  minWidth: 0,
                  '& .MuiButton-startIcon': {
                    marginRight: 0,
                  },
                }}
              />
            </Box>
            {open && (
              <KanbanAddTask
                onAddTask={handleAddTask}
                onCloseAddTask={handleCloseAddTask}
              />
            )}

            <Droppable droppableId={id} type='task'>
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  spacing={2}
                  width={280}
                  sx={{
                    pb: 2,
                    height: {
                      lg: `calc(100vh - ${lgHeight + 16 + 44 + 24}px)`,
                      xs: `calc(100vh - ${xsHeight + 16 + 44 + 24}px)`,
                    },
                    overflowY: 'auto',
                  }}
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
              )}
            </Droppable>
          </Stack>
        </Paper>
      )}
    </Draggable>
  )
}
