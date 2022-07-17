import React, { useState } from 'react'

// @mui
import { Box, Button, Drawer, Stack, Typography } from '@mui/material'

// @prop-types
import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import useLocales from '@/hooks/useLocales'

import KanbanTaskCommentInput from './KanbanTaskCommentInput'
import KanbanTaskCommentList from './KanbanTaskCommentList'
import KanbanTaskForm from './KanbanTaskForm'
import KanbanUpdateHistory from './KanbanUpdateHistory'

KanbanTaskAdd.propTypes = {
  open: PropTypes.bool,
  isAddTaskNoColumn: PropTypes.bool,
  hasAddPermission: PropTypes.bool,
  card: PropTypes.object,
  laneId: PropTypes.string,
  onClose: PropTypes.func,
  onCloseUpdate: PropTypes.func,
  columnOptions: PropTypes.array,
  activeJobOptions: PropTypes.array,
}

function KanbanTaskAdd({
  open,
  isAddTaskNoColumn,
  hasAddPermission,
  card,
  laneId,
  onClose,
  onCloseUpdate,
  activeJobOptions,
}) {
  const { translate } = useLocales()
  const [openHistory, setOpenHistory] = useState(false)

  const handleOpenHistory = () => {
    setOpenHistory((prev) => !prev)
  }

  const handleCloseAddTask = () => {
    onClose()
    setOpenHistory(false)
  }

  const handleCloseUpdateTask = () => {
    onCloseUpdate()
    setOpenHistory(false)
  }

  return (
    <Drawer
      open={open}
      onClose={() => {
        card ? handleCloseUpdateTask() : handleCloseAddTask()
      }}
      anchor='right'
      PaperProps={{ sx: { width: { xs: 1, sm: 640 } } }}
    >
      <Box p={3}>
        <Box component='header'>
          <Typography variant='h5'>
            {card ? translate('Update Card') : translate('Add Card')}
          </Typography>
        </Box>
        <Box>
          <KanbanTaskForm
            card={card}
            hasAddPermission={hasAddPermission}
            isAddTaskNoColumn={isAddTaskNoColumn}
            activeJobOptions={activeJobOptions}
            laneId={laneId}
            onClose={onClose}
            onCloseUpdate={onCloseUpdate}
            setOpenHistory={setOpenHistory}
          />

          {card && (
            <Box mt={3}>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Stack direction='row'>
                  <Iconify
                    icon='dashicons:calendar-alt'
                    width={20}
                    height={20}
                  />
                  <Typography variant='span' sx={{ ml: 1 }}>
                    {translate('History')}
                  </Typography>
                </Stack>
                <Button
                  type='button'
                  variant='outlined'
                  onClick={handleOpenHistory}
                >
                  {openHistory ? translate('Hide') : translate('Show')}
                </Button>
              </Stack>
            </Box>
          )}
          {openHistory && card && (
            <Box mt={2}>
              <KanbanUpdateHistory
                title={translate('News Update')}
                cardId={card.id}
              />
            </Box>
          )}

          {card && (
            <Box mt={3}>
              <Stack direction='row' mb={2}>
                <Iconify
                  icon='ant-design:comment-outlined'
                  width={20}
                  height={20}
                />
                <Typography variant='span' sx={{ ml: 1 }}>
                  {translate('Comment')}
                </Typography>
              </Stack>

              <KanbanTaskCommentInput cardId={card.id} />
              <Box mt={2}>
                <KanbanTaskCommentList
                  title={translate('List Comment')}
                  cardId={card.id}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

export default React.memo(KanbanTaskAdd)
