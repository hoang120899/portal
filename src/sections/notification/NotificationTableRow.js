// @mui
import { TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
import { fDate } from '@/utils/formatTime'

NotificationTableRow.propTypes = {
  row: PropTypes.object,
}

export default function NotificationTableRow({ row }) {
  const { User, content, createdAt } = row

  return (
    <TableRow hover>
      <TableCell align='left'>{User?.name}</TableCell>

      <TableCell align='left' width='40%'>
        <Typography variant='subtitle2'>
          {content?.message}
          <strong>{content?.title}</strong>
        </Typography>
      </TableCell>

      <TableCell align='left'>{fDate(createdAt)}</TableCell>

      <TableCell>
        <Tooltip title='Detail'>
          <IconButtonAnimate
            sx={{
              p: 1,
              ml: 0.5,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon={'eva:eye-fill'} width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
