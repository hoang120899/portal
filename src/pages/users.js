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

export default function Users() {
  const { themeStretch } = useSettings()

  return (
    <Page title={PAGES.Users}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='List users'
          links={[
            {
              name: PAGES.Dashboard,
              href: PATH_DASHBOARD.dashboard.root,
            },
            { name: 'List users' },
          ]}
        />
      </Container>
    </Page>
  )
}
