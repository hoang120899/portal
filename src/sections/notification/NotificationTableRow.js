// @mui
import { TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
import useSettings from '@/hooks/useSettings'
import { fDate } from '@/utils/formatTime'
import getColorPresets from '@/utils/getColorPresets'

NotificationTableRow.propTypes = {
  row: PropTypes.object,
}

export default function NotificationTableRow({ row }) {
  const { User, content, createdAt } = row
  const { themeMode } = useSettings()

  const styles = {
    message: {
      width: '100%',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontWeight: 300,
      transition: 'all 0.3s',
      '&:hover': {
        color:
          themeMode === 'light'
            ? '#1BC5BD'
            : `${getColorPresets('yellow').main}`,
      },
    },
    buttonDetail: {
      p: 1,
      ml: 0.5,
      border: (theme) => `dashed 1px ${theme.palette.divider}`,
      transition: 'all 0.15s',
      '&:hover': {
        color:
          themeMode === 'light'
            ? '#1BC5BD'
            : `${getColorPresets('yellow').main}`,
      },
    },
  }

  return (
    <TableRow hover>
      <TableCell align='left'>{User?.name}</TableCell>

      <TableCell align='left' width='50%'>
        <Typography variant='body2' sx={styles.message}>
          {content?.message}
          <strong> {content?.title}</strong>
        </Typography>
      </TableCell>

      <TableCell align='left'>{fDate(createdAt)}</TableCell>

      <TableCell maxwidth='15%'>
        <Tooltip title='Detail'>
          <IconButtonAnimate sx={styles.buttonDetail}>
            <Iconify icon={'eva:eye-fill'} width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
