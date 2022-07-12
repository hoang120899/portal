import React from 'react'

// @mui
import { Box, Paper, Stack, Typography } from '@mui/material'

import { format } from 'date-fns'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

// assets
import IconDelete from '@/assets/icon_delete'
import IconTimer from '@/assets/icon_timer'
import CustomLabel from '@/components/CustomLabel'
// hooks
import useLocales from '@/hooks/useLocales'

KanbanTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
}

export default function KanbanTaskCard({ card, index }) {
  const { translate } = useLocales()
  const { Job, Candidate = {}, Labels = [] } = card
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
            <Box sx={{ cursor: 'pointer' }}>
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

                      {Labels.map((label, index) => (
                        <CustomLabel
                          key={index}
                          color={label?.background}
                          title={label?.title}
                          sx={{
                            margin: '2px',
                          }}
                          endIcon={
                            <Box width='10px'>
                              <IconDelete fill='#fff' />
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
                </Stack>
              </Box>
            </Box>
          </Paper>
        </div>
      )}
    </Draggable>
  )
}
