import React from 'react'

import { Container, Grid } from '@mui/material'

import '@fullcalendar/react/dist/vdom'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
// config
import { DASHBOARD_TABLE_HEIGHT, PAGES } from '@/config'
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

  const gridItemHeight = { sm: DASHBOARD_TABLE_HEIGHT }

  const dashboardConfigs = [
    {
      sx: {
        height: isDirectorRole ? gridItemHeight : DASHBOARD_TABLE_HEIGHT,
      },
      render: () => {
        if (isDirectorRole)
          return (
            <Performance
              title={translate('pages.dashboard.performance.title')}
            />
          )
        return (
          <InterviewSchedule
            title={translate('pages.dashboard.interviewSchedule.title')}
          />
        )
      },
    },
    {
      sx: { height: gridItemHeight },
      render: () => (
        <WeeklyTask title={translate('pages.dashboard.weeklyTask.title')} />
      ),
    },
    {
      sx: { height: gridItemHeight },
      render: () => {
        if (isDirectorRole)
          return (
            <Applicants title={translate('pages.dashboard.applicants.title')} />
          )
        if (isLeaderRole)
          return (
            <Performance
              title={translate('pages.dashboard.performance.title')}
            />
          )
        return (
          <RecruitementProgress
            title={translate('pages.dashboard.recruitmentProgress.title')}
          />
        )
      },
    },
    {
      sx: { height: gridItemHeight },
      render: () => {
        if (isDirectorRole)
          return (
            <MemberActivities
              title={translate('pages.dashboard.memberActivities.title')}
            />
          )
        return (
          <Applicants title={translate('pages.dashboard.applicants.title')} />
        )
      },
    },
  ]

  return (
    <Page title={translate('nav.dashboard')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs heading={translate('nav.dashboard')} />
        <Grid container rowGap={2} columnSpacing={2}>
          <Grid
            item
            xs={12}
            lg={8}
            sx={{ height: { sm: DASHBOARD_TABLE_HEIGHT } }}
          >
            <DashboardActiveJob
              title={translate('pages.dashboard.activeJobs.title')}
            />
          </Grid>
          {dashboardConfigs.map((config, key) => (
            <Grid item xs={12} md={6} lg={4} key={key} sx={config.sx}>
              {config.render()}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  )
}
