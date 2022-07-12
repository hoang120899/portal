import { TableCell, TableRow, Typography, useTheme } from '@mui/material'

import PropTypes from 'prop-types'

import Label from '@/components/Label'

// components

JobTaskTableRow.propTypes = {
  row: PropTypes.object,
}
export default function JobTaskTableRow({ row }) {
  const theme = useTheme()
  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography variant='subtitle1'>{row.title}</Typography>
      </TableCell>
      <TableCell align='left' width={160}>
        <Typography variant='subtitle1'>{row?.salary}</Typography>
      </TableCell>
      <TableCell align='left' width={160}>
        <Typography variant='subtitle1'>{row?.candidate}</Typography>
      </TableCell>
      <TableCell align='left'>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'banned' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {row.jobStatus}
        </Label>
      </TableCell>
    </TableRow>
  )
}
