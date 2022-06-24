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

Caculator.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Caculator),
    },
  }
}

export default function Caculator() {
  const { themeStretch } = useSettings()

  return (
    <Page title={PAGES.Caculator}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading='Caculator Salary'
          links={[
            {
              name: PAGES.Dashboard,
              href: PATH_DASHBOARD.dashboard.root,
            },
            { name: 'Caculator Salary' },
          ]}
        />
      </Container>
    </Page>
  )
}
