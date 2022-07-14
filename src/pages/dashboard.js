import React from 'react'

import { Container, Grid } from '@mui/material'

import '@fullcalendar/react/dist/vdom'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'
// sections
import DashboardActiveJob from '@/sections/dashboard/active-job'
import Applicants from '@/sections/dashboard/applicants'
import InterviewSchedule from '@/sections/dashboard/interview-schedule'
import MemberActivities from '@/sections/dashboard/member-activities'
import Performance from '@/sections/dashboard/performance'
import RecruitementProgress from '@/sections/dashboard/recruitement-progress'
import WeeklyTask from '@/sections/dashboard/weekly-task'
// utils
import { getRolesByPage } from '@/utils/role'

Dashboard.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Dashboard),
    },
  }
}

export default function Dashboard() {
  const { themeStretch } = useSettings()
  const { translate } = useLocales()
  const { isDirectorRole, isLeaderRole } = useRole()

  const dashboardConfigs = [
    {
      render: () => {
        if (isDirectorRole) return <Performance title='Performance' />
        return <InterviewSchedule title='Interview Schedule' />
      },
    },
    {
      render: () => <WeeklyTask title='Weekly Task' />,
    },
    {
      render: () => {
        if (isDirectorRole) return <Applicants title='New Applicants' />
        if (isLeaderRole) return <Performance title='Performance' />
        return <RecruitementProgress title='Recruitment progress' />
      },
    },
    {
      render: () => {
        if (isDirectorRole)
          return <MemberActivities title='Member Activities' />
        return <Applicants title='New Applicants' />
      },
    },
  ]

  return (
    <Page title={translate('nav.dashboard')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs heading={translate('nav.dashboard')} />
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <DashboardActiveJob title='Active Jobs' />
          </Grid>
          {dashboardConfigs.map((config, key) => (
            <Grid item xs={4} key={key} sx={{ height: '560px ' }}>
              {config.render()}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  )
}
