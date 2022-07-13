import React, { useEffect, useState } from 'react'

// @mui
import { Box, MenuItem, Paper, Stack, Typography } from '@mui/material'

import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

import IconDelete from '@/assets/icon_delete'
import IconTimer from '@/assets/icon_timer'
import Assignee from '@/components/Assignee'
import CustomLabel from '@/components/CustomLabel'
// components
import useLocales from '@/hooks/useLocales'
import {
  useAddAssigneeMutation,
  useDeleteLabelMutation,
  useGetUserQuery,
  useRemoveAssigneeMutation,
} from '@/sections/kanban/kanbanSlice'

import KanbanActionCreateLabel from './KanbanActionCreateLabel'
import KanbanActionMove from './KanbanActionMove'
import KanbanActionStorage from './KanbanActionStorage'
import KanbanQuickMenu from './KanbanQuickMenu'

KanbanTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  hasAddPermission: PropTypes.bool,
  onOpenUpdateTask: PropTypes.func,
  laneId: PropTypes.string,
}

export default function KanbanTaskCard({
  card,
  onOpenUpdateTask,
  hasAddPermission,
  index,
  laneId,
}) {
  const { Job, Candidate, id: cardId } = card
  const { translate } = useLocales()

  const [labels, setLabels] = useState([])
  const [users, setUsers] = useState([])

  const { data: contactData } = useGetUserQuery()
  const [addAssignee] = useAddAssigneeMutation()
  const [removeAssignee] = useRemoveAssigneeMutation()

  const configUserInfo = [
    {
      label: translate('Email'),
      value: Candidate?.email,
    },
    {
      label: translate('Phone'),
      value: Candidate?.phone,
    },
    {
      label: translate('Position'),
      value: card?.position,
    },
  ]
  const [deleteLabel] = useDeleteLabelMutation()
  const handleDeleteLabel = async (label) => {
    try {
      deleteLabel(label.id)
      setLabels(labels.filter((item) => item.id !== label.id))
    } catch (error) {
      // TO DO: handle error
    }
  }
  const onToggleAssignee = async (checked, userId) => {
    if (checked) {
      try {
        await removeAssignee({ id: card.id, userId })
        setUsers(users.filter((item) => item.id !== userId))
      } catch (error) {
        // TO DO: handle error
      }
    } else {
      try {
        await addAssignee({ id: card.id, userId })
        const user = [
          ...users,
          contactData.data.list.find((item) => item.id === userId),
        ]
        setUsers(user)
      } catch (error) {
        // TO DO: handle error
      }
    }
  }
  const configAction = () => {
    switch (actions) {
      case 'move':
        return (
          <KanbanActionMove laneId={laneId} sourceId={laneId} cardId={cardId} />
        )
      case 'label':
        return (
          <KanbanActionCreateLabel
            cardId={cardId}
            labels={labels}
            setOpenMenuActions={setOpenMenuActions}
            laneId={laneId}
          />
        )
      case 'storage':
        return <KanbanActionStorage cardId={cardId} laneId={laneId} />
      default:
        return (
          <>
            <MenuItem
              onClick={() => {
                setActions('move')
              }}
            >
              {translate('pages.board.moveCard')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActions('storage')
              }}
            >
              {translate('pages.board.storageCard')}
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActions('label')
              }}
            >
              {translate('pages.board.createLabel')}
            </MenuItem>
          </>
        )
    }
  }
  const [actions, setActions] = useState('actions')

  const [openMenu, setOpenMenuActions] = useState(null)

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget)
    setActions('')
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }
  const handleOnback = () => {
    if (actions !== 'actions') {
      setActions('actions')
    } else {
      setOpenMenuActions(null)
    }
  }
  useEffect(() => {
    setLabels(card.Labels)
  }, [card.Labels])
  useEffect(() => {
    setUsers(card.Users)
  }, [card.Users])

  return (
    <Draggable
      draggableId={card.id}
      index={index}
      isDragDisabled={!hasAddPermission}
    >
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Paper
            sx={{
              width: 1,
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z16,
              },
            }}
          >
            <Box
              onClick={onOpenUpdateTask.bind(null, card)}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                sx={{
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest,
                    }),
                }}
              >
                <Stack
                  spacing={2}
                  sx={{
                    p: 2,
                    background: 'white',
                    boxShadow: '0 1px 0 rgb(9 30 66 / 25%)',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpenUpdateTask(card)
                  }}
                >
                  <Box>
                    <Box display='flex' flexWrap='wrap'>
                      <CustomLabel
                        key={index}
                        color={card?.Job?.Client?.background}
                        sx={{
                          margin: '2px',
                        }}
                        title={card?.Job?.Client?.name}
                      >
                        {card?.Job?.Client?.name}
                      </CustomLabel>
                      {labels.map((label, index) => (
                        <CustomLabel
                          key={index}
                          color={label?.background}
                          title={label?.title}
                          sx={{
                            margin: '2px',
                          }}
                          endIcon={
                            <Box width='10px'>
                              <IconDelete
                                fill='#fff'
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteLabel(label)
                                }}
                              />
                            </Box>
                          }
                        >
                          {label?.title}
                        </CustomLabel>
                      ))}
                    </Box>
                    <Typography variant='h5'>{Candidate?.name}</Typography>
                    {card.Interviews.length > 0 && (
                      <Box
                        sx={{
                          background: '#3699FF',
                          color: 'white',
                          width: 'fit-content',
                          padding: '0.55rem 0.75rem',
                          borderRadius: '0.42rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconTimer
                          fill='#fff'
                          color='white'
                          sx={{
                            marginRight: '0.5rem',
                          }}
                        />
                        {format(new Date('2021-05-07T04:55:00.000Z'), 'do MMM')}
                      </Box>
                    )}
                    <Typography variant='subtitle2' color='#777'>
                      {Job.title}
                    </Typography>
                  </Box>
                  <Box
                    display={'Grid'}
                    alignItems={'center'}
                    gridTemplateColumns='60px 1fr'
                  >
                    {configUserInfo.map((item, index) => (
                      <React.Fragment key={`label${index}`}>
                        <Typography variant='subtitle2' fontWeight={'bold'}>
                          {item?.label}:
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          align='right'
                          color='#777'
                          sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item?.value}
                        </Typography>
                      </React.Fragment>
                    ))}
                  </Box>
                  <Box onClick={(e) => e.stopPropagation()}>
                    <Assignee
                      onToggleAssignee={onToggleAssignee}
                      assignee={users}
                      hasAddAssignee={hasAddPermission}
                      listContacts={contactData?.data?.list}
                    />
                  </Box>
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
              }}
            >
              <KanbanQuickMenu
                open={openMenu}
                onOpen={handleOpenMenu}
                onClose={handleCloseMenu}
                onBack={handleOnback}
                title={actions}
                actions={configAction()}
              />
            </Box>
          </Paper>
        </div>
      )}
    </Draggable>
  )
}
