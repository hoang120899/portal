import React, { forwardRef, useCallback } from 'react'

// @mui
import { Box, Card, CardActions, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { SnackbarContent, useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
//hooks
import useSettings from '@/hooks/useSettings'
//utils
import getColorPresets from '@/utils/getColorPresets'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent !important',
    padding: '0px !important',
    maxWidth: '344px',
    '@media (min-width:600px)': {
      minWidth: '344px !important',
    },
  },
  card: {
    width: '100%',
    borderRadius: '8px !important',
    boxShadow: `0px 0px 12px 3px ${getColorPresets('yellow').main} !important`,
    padding: '6px',
  },
  actionRoot: {
    width: '100%',
    padding: '2px',
    justifyContent: 'space-between',
    alignItems: 'flex-start !important',
  },
  paper: {
    borderRadius: '4px',
    color: '#b5b5c3 !important',
    fontWeight: '300 !important',
    fontSize: '0.75rem',
    width: '100%',
    display: '-webkit-box',
    '-webkitLineClamp': '2',
    '-webkitBoxOrient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  message: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '1rem',
  },
}))

const NotifySnackbar = forwardRef(({ id, message }, ref) => {
  const { closeSnackbar } = useSnackbar()
  const { themeMode } = useSettings()
  const classes = useStyles()
  const { messageNoti, title, type, createdAt } = message
  const { icon } = renderIcon(type)

  const onClose = useCallback(() => {
    closeSnackbar(id)
  }, [id, closeSnackbar])

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '69px',
            }}
          >
            <IconButtonAnimate
              size='medium'
              onClick={onClose}
              sx={{ color: `${getColorPresets('yellow').main}` }}
            >
              {icon}
            </IconButtonAnimate>
          </Box>

          <Box sx={{ width: '254px', overflow: 'hidden' }}>
            <Typography variant='subtitle2' className={classes.message}>
              {messageNoti}
            </Typography>
            <Paper className={classes.paper}>
              <Typography variant='body2'>{title}</Typography>
            </Paper>
          </Box>

          <IconButtonAnimate size='small' onClick={onClose} sx={{ p: 0.25 }}>
            <Iconify icon={'eva:close-fill'} />
          </IconButtonAnimate>
        </CardActions>

        <Paper className={classes.paper}>
          <Typography
            variant='body2'
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: `${themeMode === 'light' ? '#212B36' : ''}`,
              justifyContent: 'flex-end',
            }}
          >
            <Iconify
              icon='eva:clock-outline'
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {createdAt}
          </Typography>
        </Paper>
      </Card>
    </SnackbarContent>
  )
})

NotifySnackbar.propTypes = {
  id: PropTypes.string,
  message: PropTypes.object,
}

export default NotifySnackbar

const renderIcon = (type) => {
  if (type === 'assignCard') {
    return {
      icon: <Iconify icon={'bxs:bell'} />,
    }
  }
  if (type === 'assignJob') {
    return {
      icon: <Iconify icon={'fluent:notepad-edit-20-filled'} />,
    }
  }
  if (type === 'jobOverTime') {
    return {
      icon: <Iconify icon={'bi:shield-fill-check'} />,
    }
  }
  if (type === 'assignTask') {
    return {
      icon: <Iconify icon={'akar-icons:calendar'} />,
    }
  }
}
