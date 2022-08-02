import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

import { DOMAIN_SERVER_API } from '@/config'
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
  task = {},
  handleOpenEdit,
}) {
  const { translate } = useLocales()
  const { isLeaderRole } = useRole()
  const theme = useTheme()
  const { startDate = '', endDate = '', user = {}, content = [] } = task || {}
  const { linkAvatar = '', name = '', nameTeam = '' } = user || {}

  return (
    <Dialog fullWidth maxWidth='xs' open={isOpen} onClose={onClose} task={task}>
      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography
          variant='body1'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {startDate} - {endDate}
        </Typography>
        <Divider />

        <Stack direction='row' alignItems='center'>
          <Avatar
            src={`${DOMAIN_SERVER_API}/${linkAvatar}`}
            sx={{ width: 48, height: 48 }}
          />

          <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
              {name}
            </Typography>

            <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
              {nameTeam}
            </Typography>
          </Box>
        </Stack>

        {(() => {
          if (!Array.isArray(content) || !content.length || !task) return

          return content.map(
            ({ content = '', percent = 0, target = 0 }, index) => {
              const achievementText = translate(
                'pages.dashboard.weeklyTask.achievement'
              )
              const targetText = translate('pages.dashboard.weeklyTask.target')

              return (
                <Typography
                  variant='body2'
                  sx={{ color: 'text.secondary' }}
                  noWrap
                  key={index}
                >
                  {`${content} (${achievementText}: ${percent}%, ${targetText}: ${target}%)`}
                </Typography>
              )
            }
          )
        })()}

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
              {translate('pages.dashboard.weeklyTask.edit')}
            </Button>
          )}

          <Button
            variant='outlined'
            sx={{
              color: 'inherit',
              borderColor: `${theme.palette.grey[400]}`,
              '&:hover': {
                borderColor: `${theme.palette.grey[400]}`,
                bgcolor: 'background.neutral',
              },
            }}
            onClick={onClose}
          >
            {translate('pages.dashboard.weeklyTask.cancel')}
          </Button>
        </Box>
      </Stack>
    </Dialog>
  )
}
