// @mui
import { TableCell, TableRow, Typography } from '@mui/material'

import PropTypes from 'prop-types'

CandidateTableRow.propTypes = {
  row: PropTypes.object,
}

export default function CandidateTableRow({ row = {} }) {
  const { name = '' } = row

  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography variant='subtitle2'>{name}</Typography>
      </TableCell>

      <TableCell align='left'>2</TableCell>

      <TableCell align='left'>3</TableCell>

      <TableCell align='left'>4</TableCell>

      <TableCell align='left'>5</TableCell>

      <TableCell align='left'>6</TableCell>

      <TableCell align='left'>6</TableCell>
    </TableRow>
  )
}
