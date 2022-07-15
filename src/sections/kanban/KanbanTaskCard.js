import React from 'react'

// @mui
import { Box, Paper, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

// hooks
import useLocales from '@/hooks/useLocales'
import { useDispatch } from '@/redux/store'

import KanbanAssignee from './KanbanAssignee'
import KanbanBasicInfo from './KanbanBasicInfo'
import KanbanLabels from './KanbanLabels'
import KanbanQuickMenu from './KanbanQuickMenu'
import { deleteLabel } from './kanbanSlice'

KanbanTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  laneId: PropTypes.string,
  onOpenUpdateTask: PropTypes.func,
}

function KanbanTaskCard({ card, index, laneId, onOpenUpdateTask }) {
  const { translate } = useLocales()
  const { Job, Candidate = {}, Labels = [], id: cardId } = card

  const dispatch = useDispatch()
  const handleDeleteLabel = async (label) => {
    try {
      const data = { ...label, laneId, cardId: cardId }
      await dispatch(deleteLabel(data))
    } catch (error) {
      // TO DO: handle error
    }
  }

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

  return (
    <Draggable draggableId={card.id} index={index}>
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
              sx={{ cursor: 'pointer' }}
              onClick={onOpenUpdateTask.bind(null, card)}
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
                  spacing={1}
                  sx={{
                    p: 2,
                    background: 'white',
                    boxShadow: '0 1px 0 rgb(9 30 66 / 25%)',
                  }}
                >
                  <KanbanLabels
                    Job={Job}
                    Labels={Labels}
                    handleDeleteLabel={handleDeleteLabel}
                  />
                  <KanbanBasicInfo
                    Candidate={Candidate}
                    card={card}
                    Job={Job}
                  />
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
                  <KanbanAssignee
                    Users={card?.Users}
                    laneId={laneId}
                    cardId={cardId}
                  />
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
                laneId={laneId}
                cardId={cardId}
                Labels={Labels}
              />
            </Box>
          </Paper>
        </div>
      )}
    </Draggable>
  )
}

export default React.memo(KanbanTaskCard)
