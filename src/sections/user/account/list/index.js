import { useCallback, useEffect } from 'react'

import { useRouter } from 'next/router'

// @mui
import { Card, CardHeader, Typography } from '@mui/material'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import useAuth from '@/hooks/useAuth'
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useTable from '@/hooks/useTable'

import { useGetListJobQuery } from '../jobSlice'
import JobTaskTableRow from './JobTableRow'
import JobTaskCollapsibleTableRow from './JobTaskCollapsibleTableRow'
import { TABLE_DESKTOP_HEAD, TABLE_MOBILE_HEAD } from './config'

export default function JobList({ ...other }) {
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable()
  useEffect(() => {
    setPage(0)
  }, [setPage])

  const router = useRouter()
  const { user } = useAuth()
  const { translate } = useLocales()
  const isGetNewUserProfileId = router.query.id !== user.userId

  const { data, isLoading, isFetching } = useGetListJobQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    idUser: isGetNewUserProfileId ? router?.query?.id : user.userId,
  })
  const { jobs: listJob = [], total: totalRecord = 0 } = data?.data || {}

  const isMobileScreen = useResponsive('down', 'sm')
  const columns = isMobileScreen ? TABLE_MOBILE_HEAD : TABLE_DESKTOP_HEAD

  const tableRowComp = useCallback(
    (row, index) => {
      if (isMobileScreen)
        return <JobTaskCollapsibleTableRow key={row?.id || index} row={row} />
      return <JobTaskTableRow key={row?.id || index} row={row} />
    },
    [isMobileScreen]
  )

  return (
    <Card {...other}>
      <CardHeader
        sx={{ px: 1, paddingLeft: 3 }}
        title={translate('List Jobs')}
      />

      <Typography
        sx={{ px: 1, paddingLeft: 3, color: '#b5b5c3', fontSize: 13, mb: 0.5 }}
      >
        {translate(`You are following ${totalRecord} jobs`)}
      </Typography>

      <BasicTable
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        dataSource={listJob}
        isLoading={isLoading || isFetching}
        TableRowComp={tableRowComp}
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
