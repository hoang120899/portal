import { useEffect } from 'react'

// @mui
import { Card, CardHeader, Typography } from '@mui/material'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import useAuth from '@/hooks/useAuth'
import useTable from '@/hooks/useTable'

import { useGetListJobQuery } from './jobSlice'
import JobTaskTableRow from './jobTaskTableRow'

export default function JobList({ subheader, ...other }) {
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable()
  useEffect(() => {
    setPage(0)
  }, [setPage])
  const { user } = useAuth()
  const { data, isLoading, isFetching } = useGetListJobQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    idUser: user.userId,
  })
  const { jobs: listJob = [], total: totalRecord = 0 } = data?.data || {}
  return (
    <Card {...other}>
      <CardHeader
        sx={{ px: 1, paddingLeft: 3 }}
        title='List Jobs'
        subheader={subheader}
      />
      <Typography
        sx={{ px: 1, paddingLeft: 3, color: '#b5b5c3', fontSize: 13 }}
      >
        You are following {totalRecord} jobs
      </Typography>
      <BasicTable
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
