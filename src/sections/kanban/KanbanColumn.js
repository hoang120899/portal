import { useState } from 'react'

// @mui
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'

// components
import Iconify from '@/components/Iconify'

//
import KanbanAddTask from './KanbanTaskAdd'
import KanbanTaskCard from './KanbanTaskCard'

KanbanColumn.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number,
}

export default function KanbanColumn({ column, index }) {
  const { enqueueSnackbar } = useSnackbar()

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
            height: '100%',
          }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <Box
              display='flex'
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Typography variant='h5'>{nameColumn}</Typography>
              <Button
                size='large'
                color='inherit'
                startIcon={
                  <Iconify icon={'eva:plus-fill'} width={20} height={20} />
                }
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14, minWidth: 'fit-content' }}
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
                  sx={{ pb: 2 }}
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
