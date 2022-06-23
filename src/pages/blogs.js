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

Blogs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default function Blogs() {
  const { themeStretch } = useSettings()

  return (
    <Page title='Blogs'>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='List blog'
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.dashboard.root,
            },
            { name: 'List blog' },
          ]}
        />
      </Container>
    </Page>
  )
}
