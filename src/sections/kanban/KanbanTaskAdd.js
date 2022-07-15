import React, { Fragment, useState } from 'react'

// @mui
import { Box, Button, Drawer, Stack, Typography } from '@mui/material'

// import { useSnackbar } from 'notistack'
// @prop-types
import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
// import {
//   FormProvider,
//   RHFAutocomplete,
//   RHFBasicSelect,
//   RHFDatePicker,
//   RHFDateTimePicker,
//   RHFMultiCheckbox,
//   RHFTextField,
// } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

import KanbanTaskCommentInput from './KanbanTaskCommentInput'
import KanbanTaskCommentList from './KanbanTaskCommentList'
import KanbanTaskForm from './KanbanTaskForm'
import KanbanUpdateHistory from './KanbanUpdateHistory'

// import { socialOptions } from './config'

KanbanTaskAdd.propTypes = {
  open: PropTypes.bool,
  isAddTaskNoColumn: PropTypes.bool,
  hasAddPermission: PropTypes.bool,
  card: PropTypes.object,
  laneId: PropTypes.string,
  columns: PropTypes.object,
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
  columnOptions,
  onClose,
  onCloseUpdate,
  activeJobOptions,
}) {
  // const { enqueueSnackbar } = useSnackbar()
  const { translate } = useLocales()
  const [openHistory, setOpenHistory] = useState(false)
  // const [users, setUsers] = useState([])

  const handleOpenHistory = () => {
    setOpenHistory((prev) => !prev)
  }

  // const handleCloseAddTaskReset = () => {
  //   onClose()
  //   setOpenHistory(false)
  //   reset()
  // }

  // const handleCloseUpdateTaskReset = () => {
  //   onCloseUpdate()
  //   setOpenHistory(false)
  //   reset()
  // }

  // const onToggleAssignee = async (checked, userId) => {
  //   if (checked) {
  //     try {
  //       await removeAssignee({ id: card.id, userId })
  //       enqueueSnackbar('Remove assignee successfully!')
  //       setUsers(users.filter((item) => item.id !== userId))
  //     } catch (error) {
  //       enqueueSnackbar('Remove assignee failed!', { variant: 'error' })
  //     }
  //   } else {
  //     try {
  //       await addAssignee({ id: card.id, userId })
  //       enqueueSnackbar('Add assignee successfully!')
  //       const user = [
  //         ...users,
  //         contactData.data.list.find((item) => item.id === userId),
  //       ]
  //       setUsers(user)
  //     } catch (error) {
  //       enqueueSnackbar('Add assignee failed!', { variant: 'error' })
  //     }
  //   }
  // }

  return (
    <Fragment>
      {/* <Modal
        open={isAdding || isUpdating}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CircularProgress size={60} />
      </Modal> */}
      <Drawer
        open={open}
        onClose={() => {
          onClose()
          // card ? handleCloseUpdateTaskReset() : handleCloseAddTaskReset()
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
              columnOptions={columnOptions}
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
    </Fragment>
  )
}

// function columnOptionsEqual(prevProps, nextProps) {
//   return prevProps.columnOptions.length === nextProps.columnOptions.length
// }

export default React.memo(KanbanTaskAdd)
