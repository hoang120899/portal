// @mui
import { useEffect } from 'react'

import { Card, CardHeader, Divider, Tab, Tabs } from '@mui/material'

import PropTypes from 'prop-types'

// import { useForm } from 'react-hook-form'
// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
// import { FormProvider } from '@/components/hook-form'
import { PAGINATION } from '@/config'
import useResponsive from '@/hooks/useResponsive'
// hooks
import useTable from '@/hooks/useTable'
import useTabs from '@/hooks/useTabs'

//
import ActiveJobTableRow from './ActiveJobTableRow'
import { STATUS_OPTIONS, TABLE_HEAD } from './config'
// import ActiveJobTableToolbar from './ActiveJobTableToolbar'
import { useGetJobsQuery } from './jobsApiSlice'
import ActiveJobMobile from './mobile'

const DashboardActiveJob = ({ subheader, ...other }) => {
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs('active')
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable({
      defaultRowsPerPage: PAGINATION[0],
    })
  const isDesktop = useResponsive('down', 768, 'sm')
  useEffect(() => {
    setPage(0)
  }, [setPage])
  useEffect(() => {
    setPage(0)
  }, [filterStatus, setPage])
  const titleJobs = STATUS_OPTIONS.find(
    (obj) => obj.value === filterStatus
  ).label
  const { data, isLoading, isFetching } = useGetJobsQuery({
    pageSize: rowsPerPage,
    pageNumberJob: page + 1,
    statusJob: titleJobs,
  })
  const { list: dataJobs = [], total: totalRecord = 0 } = data?.data || {}

  return (
    <Card {...other}>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader
          title={`${titleJobs} Jobs`}
          subheader={subheader}
          sx={{ padding: 2 }}
        />
        <Tabs
          allowScrollButtonsMobile
          variant='scrollable'
          scrollButtons='auto'
          value={filterStatus}
          onChange={onChangeFilterStatus}
          sx={{ px: 2 }}
        >
          {STATUS_OPTIONS.map(({ label, value }) => (
            <Tab disableRipple key={value} label={label} value={value} />
          ))}
        </Tabs>
      </div>
      {isDesktop ? (
        <ActiveJobMobile dataSource={dataJobs} />
      ) : (
        <>
          <Divider />
          <BasicTable
            columns={TABLE_HEAD}
            dataSource={dataJobs}
            page={page}
            rowsPerPage={rowsPerPage}
            isLoading={isLoading || isFetching}
            tableStyle={{
              paddingTop: 4,
              paddingBottom: 4,
            }}
            style={{
              height: 'fit-content',
            }}
            TableRowComp={(row, index) => (
              <ActiveJobTableRow key={`${row?.id}-${index}`} row={row} />
            )}
          />
        </>
      )}

      {totalRecord >= 5 ? (
        <Pagination
          totalRecord={totalRecord}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          rowsPerPageOptions={[]}
        />
      ) : null}
    </Card>
  )
}

DashboardActiveJob.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default DashboardActiveJob
