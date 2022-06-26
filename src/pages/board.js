import React, { useEffect, useState } from 'react'

// @mui
import { Container, Stack } from '@mui/material'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// _mock_
import { board } from '@/_mock'
// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
import { SkeletonKanbanColumn } from '@/components/skeleton'
// config
import { PAGES } from '@/config'
// hooks
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
// sections
import { KanbanColumn } from '@/sections/kanban'
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
  const { themeStretch } = useSettings()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
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
      const newColumnOrder = Array.from(board.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      // dispatch(persistColumn(newColumnOrder));
      return
    }

    const start = board.columns[source.droppableId]
    const finish = board.columns[destination.droppableId]

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds]
      updatedCardIds.splice(source.index, 1)
      updatedCardIds.splice(destination.index, 0, draggableId)

      // const updatedColumn = {
      //   ...start,
      //   cardIds: updatedCardIds,
      // };

      // dispatch(
      //   persistCard({
      //     ...board.columns,
      //     [updatedColumn.id]: updatedColumn,
      //   })
      // );
      return
    }

    const startCardIds = [...start.cardIds]
    startCardIds.splice(source.index, 1)
    // const updatedStart = {
    //   ...start,
    //   cardIds: startCardIds,
    // };

    const finishCardIds = [...finish.cardIds]
    finishCardIds.splice(destination.index, 0, draggableId)
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
    <Page title={PAGES.Board}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='Board'
          links={[
            {
              name: PAGES.Dashboard,
              href: PATH_DASHBOARD.dashboard,
            },
            { name: 'Board' },
          ]}
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
                  spacing={3}
                  sx={{ height: 'calc(100% - 32px)', overflowY: 'hidden' }}
                >
                  {!board.columnOrder.length ? (
                    <SkeletonKanbanColumn />
                  ) : (
                    board.columnOrder.map((columnId, index) => (
                      <KanbanColumn
                        index={index}
                        key={columnId}
                        column={board.columns[columnId]}
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
    </Page>
  )
}
