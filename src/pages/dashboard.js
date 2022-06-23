import React from 'react'

import { Container } from '@mui/material'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
// hooks
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default function Dashboard() {
  const { themeStretch } = useSettings()

  return (
    <Page title='Dashboard'>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs heading='Dashboard' />
      </Container>
    </Page>
  )
}
