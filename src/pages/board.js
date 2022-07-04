import React, { useEffect, useState } from 'react'

// @mui
import { Container, Stack } from '@mui/material'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
import { SkeletonKanbanColumn } from '@/components/skeleton'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'
import { API_LIST_CARD } from '@/routes/api'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
// sections
import { KanbanColumn } from '@/sections/kanban'
import Filter from '@/sections/kanban/filter'
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
  const { themeStretch } = useSettings()
  const { translate } = useLocales()
  const [isMounted, setIsMounted] = useState(false)
  const [columns, setColumns] = useState([])

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
    <Page title={translate('nav.board')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={translate('nav.board')}
          links={[
            {
              name: translate('nav.dashboard'),
              href: PATH_DASHBOARD.dashboard,
            },
            { name: translate('nav.board') },
          ]}
        />
        <Filter />
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
                  {!columns.length ? (
                    <SkeletonKanbanColumn />
                  ) : (
                    columns.map((column, index) => (
                      <KanbanColumn
                        index={index}
                        key={column.id}
                        column={column}
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
