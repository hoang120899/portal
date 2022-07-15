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

const FIRST_ROW_HEIGHT_TABLE = 640
const SECOND_ROW_HEIGHT_TABLE = 600

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
        if (isDirectorRole)
          return (
            <Performance
              title='Performance'
              sx={{
                height: {
                  xs: 'auto',
                  sm: SECOND_ROW_HEIGHT_TABLE,
                  lg: FIRST_ROW_HEIGHT_TABLE,
                },
              }}
            />
          )
        return (
          <InterviewSchedule
            title='Interview Schedule'
            sx={{
              height: {
                xs: 'auto',
                sm: SECOND_ROW_HEIGHT_TABLE,
                lg: FIRST_ROW_HEIGHT_TABLE,
              },
            }}
          />
        )
      },
    },
    {
      render: () => (
        <WeeklyTask
          title='Weekly Task'
          sx={{ height: { xs: 'auto', sm: SECOND_ROW_HEIGHT_TABLE } }}
        />
      ),
    },
    {
      render: () => {
        if (isDirectorRole)
          return (
            <Applicants
              title='New Applicants'
              sx={{ height: { xs: 'auto', sm: SECOND_ROW_HEIGHT_TABLE } }}
            />
          )
        if (isLeaderRole)
          return (
            <Performance
              title='Performance'
              sx={{ height: { xs: 'auto', sm: SECOND_ROW_HEIGHT_TABLE } }}
            />
          )
        return (
          <RecruitementProgress
            title='Recruitment progress'
            sx={{ height: { xs: 'auto', sm: SECOND_ROW_HEIGHT_TABLE } }}
          />
        )
      },
    },
    {
      render: () => {
        if (isDirectorRole)
          return (
            <MemberActivities
              title='Member Activities'
              sx={{ height: { xs: 'auto', sm: SECOND_ROW_HEIGHT_TABLE } }}
            />
          )
        return (
          <Applicants
            title='New Applicants'
            sx={{ height: { xs: 'auto', sm: SECOND_ROW_HEIGHT_TABLE } }}
          />
        )
      },
    },
  ]

  return (
    <Page title={translate('nav.dashboard')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs heading={translate('nav.dashboard')} />
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <DashboardActiveJob title='Active Jobs' />
          </Grid>
          {dashboardConfigs.map((config, key) => (
            <Grid item xs={12} sm={6} lg={4} key={key}>
              {config.render()}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  )
}
