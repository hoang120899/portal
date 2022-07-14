// @mui
import { Card, CardHeader, Divider, Tab, Tabs } from '@mui/material'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import { FormProvider } from '@/components/hook-form'
import { PAGINATION } from '@/config'
// hooks
import useTable from '@/hooks/useTable'
import useTabs from '@/hooks/useTabs'

//
import ActiveJobTableRow from './ActiveJobTableRow'
import ActiveJobTableToolbar from './ActiveJobTableToolbar'
import { DATASOURCE, STATUS_OPTIONS, TABLE_HEAD } from './config'

const DashboardActiveJob = ({ title, subheader, ...other }) => {
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs('active')
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable({
    defaultRowsPerPage: PAGINATION[0],
  })
  const methods = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  })
  const {
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = methods
  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-console
      console.log('data', data)
    } catch (error) {
      // TODO
    }
  }

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Tabs
        allowScrollButtonsMobile
        variant='scrollable'
        scrollButtons='auto'
        value={filterStatus}
        onChange={onChangeFilterStatus}
        sx={{ px: 2, bgcolor: 'background.neutral' }}
      >
        {STATUS_OPTIONS.map(({ label, value }) => (
          <Tab disableRipple key={value} label={label} value={value} />
        ))}
      </Tabs>

      <Divider />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ActiveJobTableToolbar />
      </FormProvider>

      <BasicTable
        columns={TABLE_HEAD}
        dataSource={DATASOURCE.splice(0, 5)}
        page={page}
        rowsPerPage={rowsPerPage}
        tableStyle={{ height: '395px', overflow: 'hidden' }}
        TableRowComp={(row, index) => (
          <ActiveJobTableRow key={row?.id || index} row={row} />
        )}
      />
      <Pagination
        totalRecord={DATASOURCE.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        rowsPerPageOptions={[]}
      />
    </Card>
  )
}

DashboardActiveJob.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default DashboardActiveJob
