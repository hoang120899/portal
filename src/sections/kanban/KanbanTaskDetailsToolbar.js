// @mui
import { Button, Stack, Tooltip, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
// hooks
import useResponsive from '@/hooks/useResponsive'
import useToggle from '@/hooks/useToggle'

//
import KanbanConfirmDialog from './KanbanConfirmDialog'

KanbanTaskDetailsToolbar.propTypes = {
  card: PropTypes.object,
  isCompleted: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleCompleted: PropTypes.func,
}

export default function KanbanTaskDetailsToolbar({
  card,
  isCompleted,
  onClose,
  onDelete,
  onToggleCompleted,
}) {
  const isDesktop = useResponsive('up', 'sm')

  const {
    toggle: openConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useToggle()

  return (
    <Stack p={2.5} direction='row' alignItems='center'>
      {!isDesktop && (
        <>
          <Tooltip title='Back'>
            <IconButtonAnimate onClick={onClose} sx={{ mr: 1 }}>
              <Iconify icon='eva:arrow-ios-back-fill' width={20} height={20} />
            </IconButtonAnimate>
          </Tooltip>
        </>
      )}

      <Button
        size='small'
        variant='outlined'
        color={isCompleted ? 'primary' : 'inherit'}
        startIcon={
          isCompleted && (
            <Iconify icon='eva:checkmark-fill' width={16} height={16} />
          )
        }
        onClick={onToggleCompleted}
      >
        {isCompleted ? 'Completed' : 'Mark as complete'}
      </Button>

      <Stack direction='row' spacing={1} justifyContent='flex-end' flexGrow={1}>
        <Tooltip title='Delete task'>
          <IconButtonAnimate onClick={onOpenConfirm} size='small'>
            <Iconify icon='eva:trash-2-outline' width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>

        <KanbanConfirmDialog
          open={openConfirm}
          onClose={onCloseConfirm}
          title={
            <Typography>
              Are you sure you want to delete task <strong>{card.name}</strong>?
            </Typography>
          }
          actions={
            <>
              <Button
                variant='outlined'
                color='inherit'
                onClick={onCloseConfirm}
              >
                Cancel
              </Button>
              <Button variant='contained' color='error' onClick={onDelete}>
                Delete
              </Button>
            </>
          }
        />
      </Stack>
    </Stack>
  )
}
