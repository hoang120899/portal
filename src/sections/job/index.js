import { useEffect } from 'react'

// @mui
import { Card } from '@mui/material'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import useTable from '@/hooks/useTable'

import JobTaskTableRow from './JobTaskTableRow'
import { TABLE_HEAD } from './config'
import { useGetListJobQuery } from './jobSlice'

export default function JobList() {
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable()
  useEffect(() => {
    setPage(0)
  }, [setPage])

  const { data, isLoading, isFetching } = useGetListJobQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    status: 'All',
  })
  const { list: listJob = [], total: totalRecord = 0 } = data?.data || {}

  return (
    <Card>
      <BasicTable
        columns={TABLE_HEAD}
        page={page}
        rowsPerPage={rowsPerPage}
        dataSource={listJob}
        isLoading={isLoading || isFetching}
        TableRowComp={(row, index) => (
          <JobTaskTableRow key={row?.id || index} row={row} />
        )}
      />
      <Pagination
        totalRecord={totalRecord}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Card>
  )
}
