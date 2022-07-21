// @mui
import { useCallback, useEffect, useMemo } from 'react'

import { Box, Card, CardHeader, Divider, Stack, Tab, Tabs } from '@mui/material'

import PropTypes from 'prop-types'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
// hooks
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
import useTable from '@/hooks/useTable'
import useTabs from '@/hooks/useTabs'

import ActiveJobCollapsibleTableRow from './ActiveJobCollapsibleTableRow'
//
import ActiveJobTableRow from './ActiveJobTableRow'
import { useGetJobsByStatusQuery } from './activeJobSlice'
import {
  DEFAULT_ROW_PER_PAGE,
  DEFAULT_STATUS,
  HEIGHT_TABLE_JOBS,
  STATUS_OPTIONS,
  TABLE_HEAD,
} from './config'

const DashboardActiveJob = ({ subheader, ...other }) => {
  const { currentRole } = useRole()
  const { translate } = useLocales()

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs(DEFAULT_STATUS)

  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable({
      defaultRowsPerPage: DEFAULT_ROW_PER_PAGE,
    })

  const isMobileScreen = useResponsive('down', 'sm')

  useEffect(() => {
    setPage(0)
  }, [filterStatus, setPage])

  const { data, isLoading, isFetching } = useGetJobsByStatusQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    status: filterStatus,
    currentRole,
  })
  const { list: dataJobs = [], total: totalRecord = 0 } = data?.data || {}

  const tabContainerStyle = useMemo(() => {
    if (isMobileScreen)
      return {
        alignItems: 'center',
      }
    return {
      direction: 'row',
      justifyContent: 'space-between',
    }
  }, [isMobileScreen])

  const tableRowComp = useCallback(
    (row, index) => {
      if (isMobileScreen)
        return (
          <ActiveJobCollapsibleTableRow key={`${row?.id}-${index}`} row={row} />
        )
      return <ActiveJobTableRow key={`${row?.id}-${index}`} row={row} />
    },
    [isMobileScreen]
  )

  const columns = useMemo(() => {
    if (isMobileScreen) return []
    return TABLE_HEAD({ translate })
  }, [isMobileScreen, translate])

  return (
    <Card {...other}>
      <Stack {...tabContainerStyle}>
        <CardHeader
          title={translate(
            `pages.dashboard.activeJobs.${filterStatus.toLowerCase()}Jobs`
          )}
          subheader={subheader}
          sx={{
            padding: {
              sm: 2,
            },
            pt: {
              xs: 2,
            },
          }}
        />

        <Tabs
          value={filterStatus}
          onChange={onChangeFilterStatus}
          sx={{ px: 2, alignItems: 'center' }}
        >
          {STATUS_OPTIONS.map((value) => (
            <Tab
              disableRipple
              key={value}
              label={translate(
                `pages.dashboard.activeJobs.${value.toLowerCase()}`
              )}
              value={value}
            />
          ))}
        </Tabs>
      </Stack>

      <Box sx={{ mb: 2 }}>{!isMobileScreen && <Divider />}</Box>

      <BasicTable
        columns={columns}
        dataSource={dataJobs}
        page={page}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading || isFetching}
        TableRowComp={tableRowComp}
        tableStyle={{
          height: { HEIGHT_TABLE_JOBS },
        }}
      />

      {totalRecord >= DEFAULT_ROW_PER_PAGE && (
        <Pagination
          totalRecord={totalRecord}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          rowsPerPageOptions={[]}
        />
      )}
    </Card>
  )
}

DashboardActiveJob.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default DashboardActiveJob
