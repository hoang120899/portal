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
import useLocales from '@/hooks/useLocales'
import useSettings from '@/hooks/useSettings'
import useTabs from '@/hooks/useTabs'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
// sections
import TeamManagement from '@/sections/user/team-management'
import UserManagement from '@/sections/user/user-management'
// utils
import { getRolesByPage } from '@/utils/role'

Users.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Users),
    },
  }
}

const ACCOUNT_TABS = [
  {
    value: 'user',
    icon: <Iconify icon={'ic:baseline-group'} width={20} height={20} />,
    component: <UserManagement />,
  },
  {
    value: 'team',
    icon: <Iconify icon={'ic:baseline-groups'} width={20} height={20} />,
    component: <TeamManagement />,
  },
]

export default function Users() {
  const { themeStretch } = useSettings()
  const { translate } = useLocales()
  const { currentTab, onChangeTab } = useTabs('user')

  return (
    <Page title={translate('nav.users')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={translate('pages.users.heading')}
          links={[
            {
              name: translate('nav.dashboard'),
              href: PATH_DASHBOARD.dashboard,
            },
            { name: translate('pages.users.heading') },
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

        <Box
          sx={{
            mb: {
              xs: 2,
              lg: 3,
            },
          }}
        />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab
          return isMatched && <Box key={tab.value}>{tab.component}</Box>
        })}
      </Container>
    </Page>
  )
}
