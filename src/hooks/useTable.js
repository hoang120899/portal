import { useState } from 'react'

import { defaultPagination } from '@/config'

export default function useTable(props) {
  const [page, setPage] = useState(props?.defaultCurrentPage || 0)
  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerPage || defaultPagination
  )

  const onChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const onChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return {
    page,
    setPage,
    rowsPerPage,
    //
    onChangePage,
    onChangeRowsPerPage,
  }
}

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page > 0 ? Math.max(0, rowsPerPage - arrayLength) : 0
}
