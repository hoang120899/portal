import React, { useRef, useState } from 'react'

// @mui
import { Box, Button, Drawer, Stack, Typography, useTheme } from '@mui/material'

// @prop-types
import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import Scrollbar from '@/components/Scrollbar'
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
  const [isScrolled, setIsScrolled] = useState(false)
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10)
  }
  const formRef = useRef()

  return (
    <Drawer
      open={open}
      onClose={() => {
        card ? handleCloseUpdateTask() : handleCloseAddTask()
      }}
      anchor='right'
      PaperProps={{ sx: { width: { xs: 1, sm: 640 } }, onScroll: handleScroll }}
    >
      <Scrollbar sx={{ zIndex: 999, '& label': { zIndex: 0 } }}>
        <Box pb={3} pl={3} pr={3} ref={formRef}>
          <KanbanTaskForm
            card={card}
            hasAddPermission={hasAddPermission}
            isAddTaskNoColumn={isAddTaskNoColumn}
            activeJobOptions={activeJobOptions}
            laneId={laneId}
            onClose={onClose}
            onCloseUpdate={onCloseUpdate}
            setOpenHistory={setOpenHistory}
            isScrolled={isScrolled}
            isLight={isLight}
            formRef={formRef}
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
                    {translate('pages.board.history')}
                  </Typography>
                </Stack>

                <Button
                  type='button'
                  variant='outlined'
                  onClick={handleOpenHistory}
                >
                  {openHistory
                    ? translate('pages.board.hide')
                    : translate('pages.board.show')}
                </Button>
              </Stack>
            </Box>
          )}

          {openHistory && card && (
            <Box mt={2}>
              <KanbanUpdateHistory
                title={translate('pages.board.newsUpdate')}
                cardId={card.id}
                isLight={isLight}
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
                  {translate('pages.board.comment')}
                </Typography>
              </Stack>

              <KanbanTaskCommentInput cardId={card.id} />

              <Box mt={2}>
                <KanbanTaskCommentList
                  title={translate('pages.board.listComment')}
                  cardId={card.id}
                  isLight={isLight}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Scrollbar>
    </Drawer>
  )
}

export default React.memo(KanbanTaskAdd)
