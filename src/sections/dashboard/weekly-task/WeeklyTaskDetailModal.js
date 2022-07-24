import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'

WeeklyTaskDetailModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  task: PropTypes.object,
  handleOpenEdit: PropTypes.func,
}

export default function WeeklyTaskDetailModal({
  isOpen,
  onClose,
  task = [],
  handleOpenEdit,
}) {
  const { translate } = useLocales()
  const { isLeaderRole } = useRole()

  return (
    <Dialog fullWidth maxWidth='xs' open={isOpen} onClose={onClose} task={task}>
      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography
          variant='body1'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {task?.startDate} - {task?.endDate}
        </Typography>
        <Divider />

        <Stack direction='row' alignItems='center'>
          <Avatar src={task?.user?.linkAvatar} sx={{ width: 48, height: 48 }} />

          <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
              {task?.user?.name}
            </Typography>

            <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
              {task?.user?.nameTeam}
            </Typography>
          </Box>
        </Stack>

        {task?.content?.map((item, index) => {
          if (task) {
            return (
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary' }}
                noWrap
                key={index}
              >
                {`${item.content} (achievement: ${item.percent}%, target: ${
                  item.target ? item.target : '0'
                }%)`}
              </Typography>
            )
          }
        })}

        <Box
          sx={{
            flexGrow: 1,
            ml: 2,
            minWidth: 100,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {isLeaderRole && (
            <Button variant='contained' sx={{ mr: 1 }} onClick={handleOpenEdit}>
              {translate('Edit')}
            </Button>
          )}

          <Button
            sx={{
              bgcolor: 'background.neutral',
            }}
            onClick={onClose}
          >
            {translate('Cancel')}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  )
}
