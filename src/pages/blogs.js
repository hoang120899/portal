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
// utils
import { getRolesByPage } from '@/utils/role'

Blogs.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Blogs),
    },
  }
}

export default function Blogs() {
  const { themeStretch } = useSettings()

  return (
    <Page title={PAGES.Blogs}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='List blog'
          links={[
            {
              name: PAGES.Dashboard,
              href: PATH_DASHBOARD.dashboard.root,
            },
            { name: 'List blog' },
          ]}
        />
      </Container>
    </Page>
  )
}
