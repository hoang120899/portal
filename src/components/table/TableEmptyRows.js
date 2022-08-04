// @mui
import { TableCell, TableRow } from '@mui/material'

import PropTypes from 'prop-types'

TableEmptyRows.propTypes = {
  emptyRows: PropTypes.number,
  height: PropTypes.number,
}

export default function TableEmptyRows({ emptyRows, height = 80 }) {
  if (!emptyRows) {
    return null
  }

  return (
    <TableRow
      sx={{
        ...(height && {
          height: height * emptyRows,
        }),
      }}
    >
      <TableCell colSpan={9} />
    </TableRow>
  )
}
