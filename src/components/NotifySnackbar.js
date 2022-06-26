import React, { forwardRef, useCallback } from 'react'

// @mui
import { Card, CardActions, Divider, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { SnackbarContent, useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent !important',
    padding: '0 !important',
    '@media (min-width:600px)': {
      minWidth: '344px !important',
    },
  },
  card: {
    width: '100%',
    borderRadius: 0,
  },
  actionRoot: {
    padding: '8px',
    justifyContent: 'space-between',
  },
  paper: {
    borderRadius: 0,
    padding: '8px',
  },
}))

const NotifySnackbar = forwardRef(({ id, message }, ref) => {
  const { closeSnackbar } = useSnackbar()
  const classes = useStyles()

  const onClose = useCallback(() => {
    closeSnackbar(id)
  }, [id, closeSnackbar])

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography variant='subtitle2'>{message}</Typography>
          <IconButtonAnimate size='small' onClick={onClose} sx={{ p: 0.5 }}>
            <Iconify icon={'eva:close-fill'} />
          </IconButtonAnimate>
        </CardActions>
        <Divider />
        <Paper className={classes.paper}>
          <Typography gutterBottom>PDF ready</Typography>
        </Paper>
      </Card>
    </SnackbarContent>
  )
})

NotifySnackbar.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
}

export default NotifySnackbar
