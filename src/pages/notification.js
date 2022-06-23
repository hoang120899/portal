import React from 'react'

import { Container } from '@mui/material'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
// hooks
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'

Notification.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default function Notification() {
  const { themeStretch } = useSettings()

  return (
    <Page title='Notification'>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='List notification'
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.dashboard.root,
            },
            { name: 'List notification' },
          ]}
        />
      </Container>
    </Page>
  )
}
