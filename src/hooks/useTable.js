import { useState } from 'react'

export default function useTable({
  defaultCurrentPage = 0,
  defaultRowsPerPage = 5,
}) {
  const [page, setPage] = useState(defaultCurrentPage)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)

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
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0
}
