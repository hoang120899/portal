// @mui
import { Link, TableCell, TableRow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

import { DEFAULT_STATUS_COLOR, STATUS_COLOR } from './config'

ActiveJobTableRow.propTypes = {
  row: PropTypes.object,
}

export default function ActiveJobTableRow({ row }) {
  const theme = useTheme()

  const {
    title,
    clientName = '',
    nameTeam: teamName = '',
    jobStatus,
    numberCandidate,
    type,
  } = row || {}
  const color = STATUS_COLOR[jobStatus] || DEFAULT_STATUS_COLOR

  return (
    <TableRow hover>
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
        {clientName}
      </TableCell>

      <TableCell width='15%' align='left' sx={{ textTransform: 'capitalize' }}>
        {teamName}
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
