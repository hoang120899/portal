import { Box, Container, Tab, Tabs } from '@mui/material'

import { capitalCase } from 'change-case'

import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Iconify from '@/components/Iconify'
import Page from '@/components/Page'
import { PAGES } from '@/config'
import useSettings from '@/hooks/useSettings'
import useTabs from '@/hooks/useTabs'
import Layout from '@/layouts'
import { PATH_DASHBOARD } from '@/routes/paths'
import { AccountGeneral } from '@/sections/user/account'

Profile.getLayout = function getLayout(data, page) {
  return <Layout>{page}</Layout>
}
const ACCOUNT_TABS = [
  {
    value: 'general',
    icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
    component: <AccountGeneral />,
  },
  // {
  //   value: 'change_password',
  //   icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
  //   component: <AccountChangePassword />,
  // },
]
function Profile() {
  const { themeStretch } = useSettings()
  const { currentTab, onChangeTab } = useTabs('general')
  return (
    <Page title={PAGES.Profile}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='Profile'
          links={[
            {
              name: PAGES.Dashboard,
              href: PATH_DASHBOARD.dashboard,
            },
            { name: 'Profile' },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant='scrollable'
          scrollButtons='auto'
          value={currentTab}
          onChange={onChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab
          return isMatched && <Box key={tab.value}>{tab.component}</Box>
        })}
      </Container>
    </Page>
  )
}
export default Profile
