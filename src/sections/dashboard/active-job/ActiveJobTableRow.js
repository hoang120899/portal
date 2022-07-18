// @mui
import { Link, TableCell, TableRow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

// components
import Label from '@/components/Label'

UserTableRow.propTypes = {
  row: PropTypes.object,
}

export default function UserTableRow({ row }) {
  const theme = useTheme()

  const {
    title,
    clientName = '',
    nameTeam,
    jobStatus,
    numberCandidate,
    type,
  } = row
  return (
    <TableRow hover style={{ width: '100%' }}>
      <TableCell>
        <Link href='/'>{title}</Link>
        <Typography variant='subtitle2' noWrap>
          {type}
        </Typography>
      </TableCell>

      <TableCell align='left'>{clientName || ''}</TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {nameTeam}
      </TableCell>

      <TableCell align='left'>{numberCandidate}</TableCell>

      <TableCell align='left'>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'banned' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {jobStatus}
        </Label>
      </TableCell>
    </TableRow>
  )
}
