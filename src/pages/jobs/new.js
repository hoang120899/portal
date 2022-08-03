// @mui
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

UserCreate.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Jobs),
    },
  }
}

export default function UserCreate() {
  const { themeStretch } = useSettings()

  return (
    <Page title='Jobs: Create a new job'>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading='Create a new Job'
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.dashboard },
            { name: 'Jobs', href: PATH_DASHBOARD.jobs.root },
            { name: 'New job' },
          ]}
        />
      </Container>
    </Page>
  )
}
