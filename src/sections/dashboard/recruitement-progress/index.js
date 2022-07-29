// @mui
import { useEffect } from 'react'

import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'

import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import useRole from '@/hooks/useRole'
import useTable from '@/hooks/useTable'

import RecruitmentProgressTableRow from './RecruitmentProgressTableRow'
import { DEFAULT_ROWS_PER_PAGE } from './config'
import { useGetAllRecruitmentProgressQuery } from './recruitmentProgressSlice'

RecruitementProgress.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function RecruitementProgress({ title, subheader, ...other }) {
  const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    useTable({ defaultRowsPerPage: DEFAULT_ROWS_PER_PAGE })
  const { currentRole } = useRole()
  const { data, isLoading, isFetching } = useGetAllRecruitmentProgressQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    currentRole,
  })

  const { list: listRecruitmentProgress = [], total: totalRecord = 0 } =
    data?.data || {}

  const tableRowComp = (row, index) => (
    <RecruitmentProgressTableRow key={row?.id || index} row={row} />
  )

  useEffect(() => {
    setPage(0)
  }, [setPage])

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <BasicTable
        columns={[]}
        page={page}
        rowsPerPage={rowsPerPage}
        dataSource={listRecruitmentProgress}
        isLoading={isLoading || isFetching}
        TableRowComp={tableRowComp}
        tableStyle={{
          marginTop: '10px',
          maxHeight: '370px',
          overflow: 'hidden',
        }}
      />

      <Pagination
        totalRecord={totalRecord}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Card>
  )
}
