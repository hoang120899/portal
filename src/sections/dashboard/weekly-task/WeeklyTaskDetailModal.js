import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

export default function WeeklyTaskDetailModal({
  isOpen,
  onClose,
  // handleType,
  task,
}) {
  const {
    user: { linkAvatar, name, nameTeam },
    startDate,
    endDate,
    content,
  } = task

  return (
    <Dialog fullWidth maxWidth='xs' open={isOpen} onClose={onClose} task={task}>
      <Stack spacing={2} sx={{ p: 2.5, pb: 1 }}>
        <Typography variant='h5'>
          {startDate} - {endDate}
        </Typography>
        <Divider />

        <Stack direction='row' alignItems='center'>
          <Avatar src={linkAvatar} sx={{ width: 48, height: 48 }} />

          <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
              {name}
            </Typography>

            <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
              {nameTeam}v
            </Typography>
          </Box>
        </Stack>

        <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
          {content
            .reduce((acc, cur) => acc + cur.content + ', ', '')
            .slice(0, -2)}
        </Typography>

        <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
          <Button variant='contained' sx={{ mr: 1 }}>
            Edit
          </Button>

          <Button
            variant='contained'
            sx={{
              bgcolor: 'background.action.active',
              '&:hover': { bgcolor: 'red' },
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </Dialog>
  )
}
