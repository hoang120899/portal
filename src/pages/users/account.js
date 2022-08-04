import React from 'react'

import { Box, Container, Tab, Tabs } from '@mui/material'

import { capitalCase } from 'change-case'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Iconify from '@/components/Iconify'
import Page from '@/components/Page'
// config
import { PAGES } from '@/config'
// hooks
import useSettings from '@/hooks/useSettings'
import useTabs from '@/hooks/useTabs'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
// sections
import { AccountGeneral } from '@/sections/user/account'

Account.getLayout = function getLayout(data, page) {
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

export default function Account() {
  const { themeStretch } = useSettings()
  const { currentTab, onChangeTab } = useTabs('general')

  return (
    <Page title={PAGES.Account}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='Account'
          links={[
            {
              name: PAGES.Dashboard,
              href: PATH_DASHBOARD.dashboard,
            },
            {
              name: PAGES.Users,
              href: PATH_DASHBOARD.users.root,
            },
            { name: 'Account Settings' },
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
