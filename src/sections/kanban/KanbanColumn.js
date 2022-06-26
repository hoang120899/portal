import { useState } from 'react'

// @mui
import { Button, Paper, Stack } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'

// _mock_
import { board } from '@/_mock'
// components
import Iconify from '@/components/Iconify'

//
import KanbanColumnToolBar from './KanbanColumnToolBar'
import KanbanAddTask from './KanbanTaskAdd'
import KanbanTaskCard from './KanbanTaskCard'

KanbanColumn.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number,
}

export default function KanbanColumn({ column, index }) {
  const { enqueueSnackbar } = useSnackbar()

  const [open, setOpen] = useState(false)

  const { name, cardIds, id } = column

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev)
  }

  const handleCloseAddTask = () => {
    setOpen(false)
  }

  const handleDeleteTask = () => {
    enqueueSnackbar('Delete success!')
  }

  const handleUpdateColumn = async (newName) => {
    try {
      if (newName !== name) {
        enqueueSnackbar('Update success!')
      }
    } catch (error) {
      // TODO
    }
  }

  const handleDeleteColumn = async () => {
    try {
      enqueueSnackbar('Delete success!')
    } catch (error) {
      // TODO
    }
  }

  const handleAddTask = () => {
    handleCloseAddTask()
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant='outlined'
          sx={{ px: 2, bgcolor: 'grey.5008' }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <KanbanColumnToolBar
              columnName={name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            <Stack spacing={2} sx={{ pb: 2 }}>
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
              >
                Add Task
              </Button>
            </Stack>

            <Droppable droppableId={id} type='task'>
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  spacing={2}
                  width={280}
                  sx={{ pb: 2 }}
                >
                  {cardIds.map((cardId, index) => (
                    <KanbanTaskCard
                      key={cardId}
                      onDeleteTask={handleDeleteTask}
                      card={board?.cards[cardId]}
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
