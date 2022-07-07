import { useState } from 'react'

// @mui
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material'

import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

import Assignee from '@/components/Assignee'
import Label from '@/components/Label'
// components
import useLocales from '@/hooks/useLocales'

//
import KanbanTaskDetails from './KanbanTaskDetails'

KanbanTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  onDeleteTask: PropTypes.func,
}

export default function KanbanTaskCard({ card, onDeleteTask, index }) {
  const { labels = ['label test'], Users, Job, Candidate } = card
  const [openDetails, setOpenDetails] = useState(false)
  const { translate } = useLocales()
  const theme = useTheme()

  const handleOpenDetails = () => {
    setOpenDetails(true)
  }

  const handleCloseDetails = () => {
    setOpenDetails(false)
  }

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
            <Box onClick={handleOpenDetails} sx={{ cursor: 'pointer' }}>
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
                    handleOpenDetails()
                  }}
                >
                  {labels.map((label, index) => (
                    <Label
                      key={index}
                      variant={
                        theme.palette.mode === 'light' ? 'ghost' : 'filled'
                      }
                      // color={(status === 'banned' && 'error') || 'success'}
                      color='success'
                      sx={{ textTransform: 'capitalize', width: 'fit-content' }}
                    >
                      {label}
                    </Label>
                  ))}
                  <Typography variant='h5'>{Candidate?.name}</Typography>
                  <Typography variant='subtitle2' color='#777'>
                    {Job.title}
                  </Typography>
                  <Box
                    display={'Grid'}
                    alignItems={'center'}
                    gridTemplateColumns='60px 1fr'
                  >
                    <Typography variant='subtitle2' fontWeight={'bold'}>
                      {translate('Email')}:
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
                      {Candidate?.email}
                    </Typography>
                    <Typography variant='subtitle2' fontWeight={'bold'}>
                      {translate('Phone')}:
                    </Typography>
                    <Typography variant='subtitle2' align='right' color='#777'>
                      {Candidate?.phone}
                    </Typography>
                    <Typography variant='subtitle2' fontWeight={'bold'}>
                      {translate('Position')}:
                    </Typography>
                    <Typography align='right' variant='subtitle2' color='#777'>
                      {card?.position}
                    </Typography>
                  </Box>
                  <Box onClick={(e) => e.stopPropagation()}>
                    <Assignee assignee={Users} hasAddAssignee />
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Paper>
          <KanbanTaskDetails
            card={card}
            isOpen={openDetails}
            onClose={handleCloseDetails}
            onDeleteTask={() => onDeleteTask(card.id)}
          />
        </div>
      )}
    </Draggable>
  )
}
