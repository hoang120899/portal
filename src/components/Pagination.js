// @mui
import { Box, TablePagination } from '@mui/material'

import PropTypes from 'prop-types'

// config
import { PAGINATION, defaultPagination } from '@/config'
// hooks
import useTable from '@/hooks/useTable'

Pagination.propTypes = {
  dataSource: PropTypes.array.isRequired,
  defaultRowsPerPage: PropTypes.number,
}

export default function Pagination({
  dataSource = [],
  defaultRowsPerPage = defaultPagination,
}) {
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable({
    defaultRowsPerPage,
  })
  return (
    <Box sx={{ position: 'relative' }}>
      <TablePagination
        rowsPerPageOptions={PAGINATION}
        component='div'
        count={dataSource.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </Box>
  )
}
