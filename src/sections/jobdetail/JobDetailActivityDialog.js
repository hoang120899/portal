// @mui
import React, { useMemo } from 'react'

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import Iconify from '@/components/Iconify'
import Markdown from '@/components/Markdown'
import { AMPM_DATETIME_FORMAT, DOMAIN_SERVER_API } from '@/config'
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import { fDate } from '@/utils/formatTime'
import { pxToRem } from '@/utils/getFontValue'

import { ACTIVITY_STATUS } from './config'

JobDetailActivityDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  jobActivity: PropTypes.array,
}

const TypographyChangeToStyled = styled(Typography)(({ theme }) => ({
  '& .redColor': {
    color: 'red',
  },
  paddingLeft: theme.spacing(5),
  display: 'block',
  fontSize: pxToRem(12),
  '& b:before': {
    content: '"•"',
    fontSize: pxToRem(12),
    marginRight: theme.spacing(0.5),
  },
}))

const TypographyUpdateJobStyled = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontSize: pxToRem(12),
}))

const UpdateAtTypographyStyled = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontSize: pxToRem(11),
}))

export default function JobDetailActivityDialog({
  open,
  onClose,
  jobActivity,
}) {
  const { translate } = useLocales()

  const smDown = useResponsive('down', 'sm')

  const activityContent = useMemo(
    () =>
      jobActivity?.map((activity) => {
        try {
          const { content: activityContent, type } = activity || {}
          const content =
            type === ACTIVITY_STATUS.UPDATE_JOB
              ? JSON.parse(activityContent)
              : activityContent

          return { ...activity, content }
        } catch (error) {
          return { ...activity, content: '' }
        }
      }),
    [jobActivity]
  )

  return (
    <Dialog fullWidth fullScreen={smDown} open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
          padding: (theme) => theme.spacing(3),
          '& svg': { marginBottom: (theme) => theme.spacing(-0.5) },
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
            sx={{
              borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
              padding: (theme) => theme.spacing(1),
            }}
          >
            <Avatar
              alt={activity.User.name}
              src={`${DOMAIN_SERVER_API}/${activity.User.linkAvatar}`}
              sx={{ m: 0.5, width: 36, height: 36 }}
            />

            <Stack direction='column'>
              <TypographyUpdateJobStyled variant='body2'>
                <b>{activity.User.name}</b>&nbsp;
                {activity.type === ACTIVITY_STATUS.UPDATE_JOB
                  ? translate('pages.jobs.hasUpdateThisJob')
                  : activity.content}
              </TypographyUpdateJobStyled>

              {[].concat(activity?.content).map((e, i) => (
                <TypographyChangeToStyled
                  component='span'
                  color='textSecondary'
                  key={i}
                >
                  <b>{`${e.path}: `}</b>
                  <Markdown components={{}} children={e.lhs} />
                  <span className='redColor'>
                    {translate('pages.jobs.changeTo')}
                  </span>
                  &nbsp;
                  <Markdown components={{}} children={e.rhs} />
                </TypographyChangeToStyled>
              ))}

              <UpdateAtTypographyStyled variant='body2' color='textSecondary'>
                {fDate(new Date(activity.createdAt), AMPM_DATETIME_FORMAT)}
              </UpdateAtTypographyStyled>
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
