import React from 'react'

// next
import NextLink from 'next/link'

// @mui
import { Button, Container } from '@mui/material'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Iconify from '@/components/Iconify'
import Page from '@/components/Page'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
import JobList from '@/sections/job'
// utils
import { getRolesByPage } from '@/utils/role'

Jobs.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Jobs),
    },
  }
}

export default function Jobs() {
  const { themeStretch } = useSettings()
  const { translate } = useLocales()

  return (
    <Page title={translate('nav.jobs')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={translate('pages.jobs.heading')}
          links={[
            {
              name: translate('nav.dashboard'),
              href: PATH_DASHBOARD.dashboard,
            },
            { name: translate('pages.jobs.heading') },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.jobs.new} passHref>
              <Button
                variant='contained'
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                New Job
              </Button>
            </NextLink>
          }
        />
        <JobList />
      </Container>
    </Page>
  )
}
