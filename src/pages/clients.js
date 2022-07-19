import React, { useCallback, useRef } from 'react'

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
// sections
import ClientList from '@/sections/client/list'
// utils
import { getRolesByPage } from '@/utils/role'

Clients.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Clients),
    },
  }
}

export default function Clients() {
  const { themeStretch } = useSettings()
  const { translate } = useLocales()
  const clientListRef = useRef()

  const handleAddNewClient = useCallback(() => {
    clientListRef.current.handleAddNewClient()
  }, [])

  return (
    <Page title={translate('nav.clients')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={translate('pages.clients.heading')}
          links={[
            {
              name: translate('nav.dashboard'),
              href: PATH_DASHBOARD.dashboard,
            },
            { name: translate('pages.clients.heading') },
          ]}
          action={
            <Button
              variant='contained'
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleAddNewClient}
            >
              New Client
            </Button>
          }
        />
        <ClientList ref={clientListRef} />
      </Container>
    </Page>
  )
}
