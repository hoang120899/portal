import React, { useCallback, useState } from 'react'

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
import useRole from '@/hooks/useRole'
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
import ListJobTable from '@/sections/job/ListJobTable'
import JobModal from '@/sections/job/jobform/JobModal'
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
  const [isOpen, setIsOpen] = useState(false)
  const { isDirectorRole, isLeaderRole, isMemberRole } = useRole()

  const hasPermission = isDirectorRole || isLeaderRole || isMemberRole

  const handleOpenJobForm = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleCloseJobForm = useCallback(() => {
    setIsOpen(false)
  }, [])

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
            <Button
              variant='contained'
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleOpenJobForm}
            >
              {translate('pages.jobs.newJob')}
            </Button>
          }
        />

        {hasPermission && (
          <>
            <ListJobTable />
            <JobModal isOpen={isOpen} onClose={handleCloseJobForm} />
          </>
        )}
      </Container>
    </Page>
  )
}
