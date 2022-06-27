import React from 'react'

import { Container } from '@mui/material'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
// config
import { PAGES } from '@/config'
// hooks
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
// section
import NotificationList from '@/sections/notification'
// utils
import { getRolesByPage } from '@/utils/role'

Notification.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Notification),
    },
  }
}

export default function Notification() {
  const { themeStretch } = useSettings()

  return (
    <Page title={PAGES.Notification}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='List notification'
          links={[
            {
              name: PAGES.Dashboard,
              href: PATH_DASHBOARD.dashboard,
            },
            { name: 'List notification' },
          ]}
        />
        <NotificationList />
      </Container>
    </Page>
  )
}
