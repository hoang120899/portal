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
// sections
import DashboardActiveJob from '@/sections/dashboard/active-job'
// utils
import { getRolesByPage } from '@/utils/role'

Dashboard.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Dashboard),
    },
  }
}

export default function Dashboard() {
  const { themeStretch } = useSettings()

  return (
    <Page title={PAGES.Dashboard}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs heading={PAGES.Dashboard} />
        <DashboardActiveJob />
      </Container>
    </Page>
  )
}
