// @mui
import { Box, TablePagination } from '@mui/material'

import PropTypes from 'prop-types'

// config
import { PAGINATION, defaultPagination } from '@/config'

Pagination.propTypes = {
  totalRecord: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
}

export default function Pagination({
  totalRecord = 0,
  page = 0,
  rowsPerPage = defaultPagination,
  onChangePage,
  onChangeRowsPerPage,
  ...other
}) {
  return (
    <Box px={2} mt={1}>
      <TablePagination
        rowsPerPageOptions={PAGINATION}
        component='div'
        count={totalRecord}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        {...other}
      />
    </Box>
  )
}
