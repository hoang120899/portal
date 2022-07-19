// @mui
import { Link, TableCell, TableRow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

// components

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
  const colorStatus = [
    {
      status: 'Active',
      color: '#00b300',
    },
    {
      status: 'Pending',
      color: '#ffc530',
    },
    {
      status: 'Close',
      color: '#e62e00',
    },
  ]
  const color = colorStatus.find((obj) => obj.status === jobStatus).color
  return (
    <TableRow hover style={{ width: '100%' }}>
      <TableCell width='40%'>
        <Link
          sx={{
            color: 'inherit',
            fontWeight: 'bold',
          }}
          href='/'
        >
          {title}
        </Link>
        <Typography
          variant='subtitle2'
          noWrap
          sx={{
            color: 'text.secondary',
            fontWeight: 'normal',
          }}
        >
          {type}
        </Typography>
      </TableCell>

      <TableCell width='20%' align='left'>
        {clientName || ''}
      </TableCell>

      <TableCell width='15%' align='left' sx={{ textTransform: 'capitalize' }}>
        {nameTeam}
      </TableCell>

      <TableCell width='15%' align='center'>
        {numberCandidate}
      </TableCell>

      <TableCell width='10%' align='left'>
        <Typography
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={color}
          sx={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        >
          {jobStatus}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
