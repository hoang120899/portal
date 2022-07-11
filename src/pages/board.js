import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

// @mui
import { Box, Button, Container, Stack } from '@mui/material'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import Iconify from '@/components/Iconify'
// components
import Page from '@/components/Page'
import { SkeletonKanbanColumn } from '@/components/skeleton'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'
// layouts
import Layout from '@/layouts'
// sections
import { KanbanColumn, KanbanTableToolbar } from '@/sections/kanban'
import KanbanAddTask from '@/sections/kanban/KanbanTaskAdd'
import {
  getColumns,
  setColumnsAction,
  useGetColumnsQuery,
  useUpdateLaneMutation,
} from '@/sections/kanban/kanbanSlice'
// utils
import { getRolesByPage } from '@/utils/role'
import uuidv4 from '@/utils/uuidv4'

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
  const { query } = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [laneId, setLaneId] = useState('')
  const [open, setOpen] = useState(false)
  const [cardId, setCardId] = useState('')
  const [isAddTaskNoColumn, setIsAddTaskNoColumn] = useState(false)
  const { isLeaderRole, isMemberRole } = useRole()
  const { data: columnData } = useGetColumnsQuery()

  const hasAddPermission = isLeaderRole || isMemberRole

  const dispatch = useDispatch()
  const columns = useSelector((state) => state.kanban.columns)
  const handleOpenAddTask = (laneId) => {
    setOpen((prev) => !prev)
    setLaneId(laneId)
  }

  const handleOpenAddTaskNoColumn = () => {
    setOpen((prev) => !prev)
    setIsAddTaskNoColumn(true)
  }

  const handleCloseAddTask = () => {
    setOpen(false)
    setLaneId('')
    setIsAddTaskNoColumn(false)
  }

  const handleOpenUpdateTask = (cardId) => {
    setOpen((prev) => !prev)
    setIsAddTaskNoColumn(true)
    setCardId(cardId)
  }

  const handleCloseUpdateTask = () => {
    setOpen(false)
    setIsAddTaskNoColumn(false)
    setCardId('')
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const action = getColumns()
    dispatch(action)
  }, [dispatch])

  useEffect(() => {
    if (isMounted && query && query.cardId && columnData) {
      handleOpenUpdateTask(query.cardId)
    }
  }, [query, isMounted, columnData])

  const [updateLane] = useUpdateLaneMutation()

  const onDragEnd = (result) => {
    // Reorder card
    const { destination, source, draggableId } = result
    if (destination.droppableId === source.droppableId) return
    const action = setColumnsAction({ destination, source, draggableId })
    dispatch(action)
    updateLane({ cardId: draggableId, laneId: destination.droppableId })
  }

  return (
    <Page title={translate('nav.board')} sx={{ height: 1 }}>
      <Container maxWidth={false} sx={{ height: 1 }}>
        <KanbanTableToolbar ref={formRef} />
        <KanbanAddTask
          open={open}
          isAddTaskNoColumn={isAddTaskNoColumn}
          columns={columnData}
          cardId={cardId}
          laneId={laneId}
          hasAddPermission={hasAddPermission}
          onClose={handleCloseAddTask}
          onCloseUpdate={handleCloseUpdateTask}
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
                  {columns.isLoading ? (
                    <SkeletonKanbanColumn formRefProp={formRef} />
                  ) : (
                    columns.data?.ids?.map((id, index) => (
                      <KanbanColumn
                        index={index}
                        key={uuidv4()}
                        hasAddPermission={hasAddPermission}
                        column={columns.data.entities[id]}
                        formRefProp={formRef}
                        onOpenAddTask={handleOpenAddTask}
                        onOpenUpdateTask={handleOpenUpdateTask}
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
      {hasAddPermission && (
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
      )}
    </Page>
  )
}
