// @mui
import { Card, Divider, Tab, Tabs } from '@mui/material'

// components
import BasicTable from '@/components/BasicTable'
// hooks
import useTabs from '@/hooks/useTabs'

//
import ActiveJobTableRow from './ActiveJobTableRow'
import ActiveJobTableToolbar from './ActiveJobTableToolbar'
import { DATASOURCE, STATUS_OPTIONS, TABLE_HEAD } from './config'

const DashboardActiveJob = () => {
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } =
    useTabs('active')

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

      <ActiveJobTableToolbar />

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
