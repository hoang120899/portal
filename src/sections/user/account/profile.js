import { useEffect } from 'react'

import { useRouter } from 'next/router'

// @mui
import { Card, CardHeader, Typography } from '@mui/material'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import useAuth from '@/hooks/useAuth'
import useResponsive from '@/hooks/useResponsive'
import useTable from '@/hooks/useTable'

import { useGetListJobQuery } from './jobSlice'
import JobTaskTableRow from './jobTaskTableRow'
import JobTableIsMobile from './mobile'

export default function JobList({ subheader, ...other }) {
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable()
  useEffect(() => {
    setPage(0)
  }, [setPage])

  const router = useRouter()
  const { user } = useAuth()
  const isGetNewUserProfileId = router.query.id !== user.userId

  const { data, isLoading, isFetching } = useGetListJobQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    idUser: isGetNewUserProfileId ? router?.query?.id : user.userId,
  })
  const isDesktop = useResponsive('down', 768, 'sm')
  const { jobs: listJob = [], total: totalRecord = 0 } = data?.data || {}
  return (
    <Card {...other}>
      {isDesktop ? (
        <>
          <CardHeader
            sx={{ px: 1, paddingLeft: 3 }}
            title='List Jobs'
            subheader={subheader}
          />
          <Typography
            sx={{ pb: 1, paddingLeft: 3, color: '#b5b5c3', fontSize: 13 }}
          >
            You are following {totalRecord} jobs
          </Typography>
          <JobTableIsMobile dataSource={listJob} />
        </>
      ) : (
        <>
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
            columns={[]}
            page={page}
            rowsPerPage={rowsPerPage}
            dataSource={listJob}
            isLoading={isLoading || isFetching}
            TableRowComp={(row, index) => (
              <JobTaskTableRow key={row?.id || index} row={row} />
            )}
          />
        </>
      )}

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
