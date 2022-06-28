// @mui
import { Card, Divider, Tab, Tabs } from '@mui/material'

import { useForm } from 'react-hook-form'

// components
import BasicTable from '@/components/BasicTable'
import { FormProvider } from '@/components/hook-form'
// hooks
import useTabs from '@/hooks/useTabs'

//
import ActiveJobTableRow from './ActiveJobTableRow'
import ActiveJobTableToolbar from './ActiveJobTableToolbar'
import { DATASOURCE, STATUS_OPTIONS, TABLE_HEAD } from './config'

const DashboardActiveJob = () => {
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs('active')
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
    <Card>
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
        dataSource={DATASOURCE}
        TableRowComp={(row, index) => (
          <ActiveJobTableRow key={row?.id || index} row={row} />
        )}
      />
    </Card>
  )
}

export default DashboardActiveJob
