import React, { useEffect, useRef, useState } from 'react'

// @mui
import { Box, Button, Container, Stack } from '@mui/material'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import Iconify from '@/components/Iconify'
// components
import Page from '@/components/Page'
import { SkeletonKanbanColumn } from '@/components/skeleton'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
// layouts
import Layout from '@/layouts'
import { API_LIST_CARD } from '@/routes/api'
// sections
import { KanbanColumn, KanbanTableToolbar } from '@/sections/kanban'
import KanbanAddTask from '@/sections/kanban/KanbanTaskAdd'
import { _getApi } from '@/utils/axios'
// utils
import { getRolesByPage } from '@/utils/role'

Board.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Board),
    },
  }
}

export default function Board() {
  const { translate } = useLocales()
  const formRef = useRef(null)
  const [isMounted, setIsMounted] = useState(false)
  const [columns, setColumns] = useState([])
  const [open, setOpen] = useState(false)
  const [isAddTaskNoColumn, setIsAddTaskNoColumn] = useState(false)

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev)
  }

  const handleOpenAddTaskNoColumn = () => {
    setOpen((prev) => !prev)
    setIsAddTaskNoColumn(true)
  }

  const handleCloseAddTask = () => {
    setOpen(false)
    setIsAddTaskNoColumn(false)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await _getApi(API_LIST_CARD)
        setColumns(res.data.list)
      } catch (error) {
        // TODO: handle error
      }
    }
    getJobs()
  }, [])

  const onDragEnd = (result) => {
    // Reorder card
    const { destination, source, draggableId, type } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return

    if (type === 'column') {
      const newColumnOrder = Array.from(columns, (x) => x.nameColumn)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      // dispatch(persistColumn(newColumnOrder));
      return
    }

    // const start = columns[source.droppableId]
    // const finish = columns[destination.droppableId]

    // if (start.id === finish.id) {
    //   const updatedCardIds = [...start.cardIds]
    //   updatedCardIds.splice(source.index, 1)
    //   updatedCardIds.splice(destination.index, 0, draggableId)

    //   const updatedColumn = {
    //     ...start,
    //     cardIds: updatedCardIds,
    //   };

    //   dispatch(
    //     persistCard({
    //       ...board.columns,
    //       [updatedColumn.id]: updatedColumn,
    //     })
    //   );
    //   return
    // }

    // const startCardIds = [...start.cardIds]
    // startCardIds.splice(source.index, 1)
    // const updatedStart = {
    //   ...start,
    //   cardIds: startCardIds,
    // };

    // const finishCardIds = [...finish.cardIds]
    // finishCardIds.splice(destination.index, 0, draggableId)
    // const updatedFinish = {
    //   ...finish,
    //   cardIds: finishCardIds,
    // };

    // dispatch(
    //   persistCard({
    //     ...board.columns,
    //     [updatedStart.id]: updatedStart,
    //     [updatedFinish.id]: updatedFinish,
    //   })
    // );
  }

  return (
    <Page title={translate('nav.board')} sx={{ height: 1 }}>
      <Container maxWidth={false} sx={{ height: 1 }}>
        <KanbanTableToolbar ref={formRef} setColumns={setColumns} />
        <KanbanAddTask
          open={open}
          isAddTaskNoColumn={isAddTaskNoColumn}
          onCloseAddTask={handleCloseAddTask}
        />
        {isMounted && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId='all-columns'
              direction='horizontal'
              type='column'
            >
              {(provided) => (
                <Stack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  direction='row'
                  alignItems='flex-start'
                  spacing={2}
                  sx={{
                    overflowY: 'hidden',
                  }}
                >
                  {!columns.length ? (
                    <SkeletonKanbanColumn formRefProp={formRef} />
                  ) : (
                    columns.map((column, index) => (
                      <KanbanColumn
                        index={index}
                        key={column.id}
                        column={column}
                        formRefProp={formRef}
                        onOpenAddTask={handleOpenAddTask}
                      />
                    ))
                  )}

                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Container>
      <Box sx={{ position: 'fixed', right: '50px', bottom: '50px' }}>
        <Button
          size='large'
          variant='contained'
          onClick={handleOpenAddTaskNoColumn}
          sx={{ fontSize: 12, padding: '32px 16px', borderRadius: '50%' }}
        >
          <Iconify icon={'eva:plus-fill'} width={24} height={24} />
        </Button>
      </Box>
    </Page>
  )
}
