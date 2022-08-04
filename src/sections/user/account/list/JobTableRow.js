import { TableCell, TableRow, Typography, useTheme } from '@mui/material'

import PropTypes from 'prop-types'

import useLocales from '@/hooks/useLocales'
import {
  DEFAULT_STATUS_COLOR,
  STATUS_COLOR,
} from '@/sections/dashboard/active-job/config'

JobTableRow.propTypes = {
  row: PropTypes.object,
}
export default function JobTableRow({ row }) {
  const { translate } = useLocales()
  const theme = useTheme()
  const color = STATUS_COLOR[row?.jobStatus] || DEFAULT_STATUS_COLOR

  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography variant='subtitle1'>{row.title}</Typography>
        <Typography
          sx={{ px: 1, paddingLeft: 0, color: '#b5b5c3', fontSize: 13 }}
          variant='subtitle2'
        >
          {row.type}
        </Typography>
      </TableCell>
      <TableCell align='left' width={200}>
        <Typography variant='subtitle1'>{row?.salary}</Typography>
        <Typography
          variant='subtitle2'
          sx={{ px: 1, paddingLeft: 0, color: '#b5b5c3', fontSize: 13 }}
        >
          {translate('Salary')}
        </Typography>
      </TableCell>
      <TableCell align='left' width={160}>
        <Typography variant='subtitle1'>Candidate</Typography>
        <Typography
          variant='subtitle2'
          sx={{ px: 1, paddingLeft: 0, color: '#b5b5c3', fontSize: 13 }}
        >
          {row?.candidate}
        </Typography>
      </TableCell>
      <TableCell align='left'>
        <Typography
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={color}
          sx={{ textTransform: 'capitalize' }}
        >
          {row.jobStatus}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
