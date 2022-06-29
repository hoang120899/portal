import React from 'react'

import { Container } from '@mui/material'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
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
  const { translate } = useLocales()

  return (
    <Page title={translate('nav.dashboard')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs heading={translate('nav.dashboard')} />
        <DashboardActiveJob />
      </Container>
    </Page>
  )
}
