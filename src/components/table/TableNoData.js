// @mui
import { TableCell, TableRow } from '@mui/material'

import PropTypes from 'prop-types'

// components
import EmptyContent from '@/components/EmptyContent'

TableNoData.propTypes = {
  isNotFound: PropTypes.bool,
}

export default function TableNoData({ isNotFound }) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title='No Data'
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  )
}
