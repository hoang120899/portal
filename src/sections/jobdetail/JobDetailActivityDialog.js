// @mui
import React from 'react'

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { format } from 'date-fns'
import PropTypes from 'prop-types'

import Iconify from '@/components/Iconify'
import Markdown from '@/components/Markdown'
import { AMPM_DATETIME_FORMAT, DOMAIN_SERVER_API } from '@/config'
import useLocales from '@/hooks/useLocales'

import { ACTIVITY_STATUS } from './config'

JobDetailActivityDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  jobActivity: PropTypes.array,
}

export default function JobDetailActivityDialog({
  open,
  onClose,
  jobActivity,
}) {
  const { translate } = useLocales()

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const activityContent = jobActivity?.map((activity) => {
    try {
      const content =
        activity.type === ACTIVITY_STATUS.UPDATE_JOB
          ? JSON.parse(activity?.content)
          : activity?.content
      return { ...activity, content }
    } catch (error) {
      return { ...activity, content: '' }
    }
  })

  return (
    <Dialog fullWidth fullScreen={smDown} open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          borderBottom: '1px solid #e0e0e0',
          padding: '24px',
          '& svg': { marginBottom: '-4px' },
        }}
      >
        <Iconify icon={'bx:calendar'} width={24} height={24} />
        {translate('pages.jobs.activity')}
      </DialogTitle>

      <DialogContent dividers>
        {activityContent?.map((activity) => (
          <Stack
            key={activity.id}
            direction='row'
            sx={{ borderBottom: '1px solid #e0e0e0', padding: '0.5rem' }}
          >
            <Avatar
              alt={activity.User.name}
              src={`${DOMAIN_SERVER_API}/${activity.User.linkAvatar}`}
              sx={{ m: 0.5, width: 36, height: 36 }}
            />

            <Stack direction='column'>
              <Typography
                variant='body2'
                sx={{
                  m: 0.5,
                  fontSize: '12px',
                }}
              >
                <b>{activity.User.name}</b>&nbsp;
                {activity.type === ACTIVITY_STATUS.UPDATE_JOB
                  ? 'has update this job:'
                  : activity.content}
              </Typography>

              {typeof activity.content === 'object' &&
                activity.content?.map((e, i) => (
                  <Typography
                    component='span'
                    color='textSecondary'
                    sx={{
                      '& .redColor': {
                        color: 'red',
                      },
                      paddingLeft: '40px',
                      display: 'block',
                      fontSize: '12px',
                      '& b:before': {
                        content: '"•"',
                        fontSize: '12px',
                        marginRight: '5px',
                      },
                    }}
                    key={i}
                  >
                    <b>{`${e.path}: `}</b>
                    <Markdown components={{}} children={e.lhs} />
                    <span className='redColor'>
                      {translate('pages.jobs.changeTo')}
                    </span>
                    &nbsp;
                    <Markdown components={{}} children={e.rhs} />
                  </Typography>
                ))}

              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ m: 0.5, fontSize: '11px' }}
              >
                {format(new Date(activity.createdAt), AMPM_DATETIME_FORMAT)}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{translate('common.close')}</Button>
      </DialogActions>
    </Dialog>
  )
}
