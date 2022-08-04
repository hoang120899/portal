// @mui
import { useRouter } from 'next/router'

import { TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
import { PATH_DASHBOARD } from '@/routes/paths'
import { fDate } from '@/utils/formatTime'
import getColorPresets from '@/utils/getColorPresets'

NotificationTableRow.propTypes = {
  row: PropTypes.object,
}

export default function NotificationTableRow({ row }) {
  const { User, content, createdAt } = row

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
        color: `${getColorPresets('yellow').main}`,
      },
    },
    buttonDetail: {
      p: 1,
      ml: 0.5,
      border: (theme) => `dashed 1px ${theme.palette.divider}`,
      transition: 'all 0.15s',
      '&:hover': {
        color: `${getColorPresets('yellow').main}`,
      },
    },
  }

  const router = useRouter()
  return (
    <TableRow hover>
      <TableCell align='left'>{User?.name}</TableCell>

      <TableCell align='left' width='50%'>
        <Typography
          variant='body2'
          sx={styles.message}
          onClick={() => router.push(PATH_DASHBOARD.board.view(content?.id))}
        >
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
