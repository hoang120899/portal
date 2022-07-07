import React from 'react'

// @mui
import { Box, Paper, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

import Assignee from '@/components/Assignee'
import CustomLabel from '@/components/CustomLabel'
// components
import useLocales from '@/hooks/useLocales'

KanbanTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  onOpenUpdateTask: PropTypes.func,
}

export default function KanbanTaskCard({ card, index, onOpenUpdateTask }) {
  const { Users, Job, Candidate, id: cardId } = card
  const labels = card.Labels || []
  const { translate } = useLocales()

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
              onClick={onOpenUpdateTask.bind(null, cardId)}
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
                    onOpenUpdateTask(cardId)
                  }}
                >
                  <Box display='flex'>
                    <CustomLabel
                      key={index}
                      // color={(status === 'banned' && 'error') || 'success'}
                      color={card.Job.Client.background}
                      sx={{
                        marginX: '2px',
                      }}
                    >
                      {card.Job.Client.name}
                    </CustomLabel>
                    {labels.map((label, index) => (
                      <CustomLabel
                        key={index}
                        color={label.background}
                        sx={{
                          marginX: '2px',
                        }}
                      >
                        {label.title}
                      </CustomLabel>
                    ))}
                  </Box>
                  <Typography variant='h5'>{Candidate?.name}</Typography>
                  <Typography variant='subtitle2' color='#777'>
                    {Job.title}
                  </Typography>
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
                    <Assignee assignee={Users} hasAddAssignee />
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Paper>
        </div>
      )}
    </Draggable>
  )
}
