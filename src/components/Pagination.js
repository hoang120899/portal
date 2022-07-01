// @mui
import { Box, TablePagination } from '@mui/material'

import PropTypes from 'prop-types'

// config
import { PAGINATION, defaultPagination } from '@/config'

Pagination.propTypes = {
  dataSource: PropTypes.array.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
}

export default function Pagination({
  dataSource = [],
  page = 0,
  rowsPerPage = defaultPagination,
  onChangePage,
  onChangeRowsPerPage,
  ...other
}) {
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
        {...other}
      />
    </Box>
  )
}
