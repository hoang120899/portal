// @mui
import { TableCell, TableRow } from '@mui/material'

import PropTypes from 'prop-types'

// components
import EmptyContent from '@/components/EmptyContent'

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
}

export default function TableNoData({ isNotFound }) {
  if (!isNotFound) return null
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <EmptyContent
          title='No Data'
          sx={{
            '& span.MuiBox-root': { height: 160 },
          }}
        />
      </TableCell>
    </TableRow>
  )
}
