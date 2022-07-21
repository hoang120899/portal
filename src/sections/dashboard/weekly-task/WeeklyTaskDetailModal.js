import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

import useLocales from '@/hooks/useLocales'

export default function WeeklyTaskDetailModal({
  isOpen,
  onClose,
  // handleType,
  task = [],
  handleOpenEdit,
}) {
  const { translate } = useLocales()
  return (
    <Dialog fullWidth maxWidth='xs' open={isOpen} onClose={onClose} task={task}>
      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography
          variant='h6'
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

        <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
          <Button variant='contained' sx={{ mr: 1 }} onClick={handleOpenEdit}>
            {translate('Edit')}
          </Button>

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
