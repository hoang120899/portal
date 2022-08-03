import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

// @mui
import { Box, Button, Container, Grid } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import { useSnackbar } from 'notistack'

// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Iconify from '@/components/Iconify'
import LoadingScreen from '@/components/LoadingScreen'
import Page from '@/components/Page'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
import useSettings from '@/hooks/useSettings'
import useToggle from '@/hooks/useToggle'
// layouts
import Layout from '@/layouts'
import Page404 from '@/pages/404'
import { useDispatch, useSelector } from '@/redux/store'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
import JobModal from '@/sections/job/jobform/JobModal'
import JobDetailActivityDialog from '@/sections/jobdetail/JobDetailActivityDialog'
import JobDetailDescription from '@/sections/jobdetail/JobDetailDescription'
import JobDetailFollower from '@/sections/jobdetail/JobDetailFollower'
import JobDetailListCandidate from '@/sections/jobdetail/JobDetailListCandidate'
import JobDetailNote from '@/sections/jobdetail/JobDetailNote'
import {
  addAssignUser,
  getAssignUser,
  getJobDetail,
  removeAssignUser,
  updateJobDetail,
  useGetAssignListUserQuery,
  useGetCandidateJobQuery,
  useGetJobActivityQuery,
} from '@/sections/jobdetail/jobDetailSlice'
// utils
import { pxToRem } from '@/utils/getFontValue'
import { getRolesByPage } from '@/utils/role'

JobDetail.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getServerSideProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Jobs),
    },
  }
}

const ButtonStyle = styled(Button)(({ theme }) => ({
  fontSize: pxToRem(12),
  padding: theme.spacing(4, 2),
  borderRadius: '50%',
}))

function JobDetail() {
  const { themeStretch } = useSettings()
  const { translate } = useLocales()
  const router = useRouter()
  const jobId = router.query.slug

  const { isDirectorRole, isLeaderRole } = useRole()

  const hasPermission = isDirectorRole || isLeaderRole

  const [isOpen, setIsOpen] = useState(false)
  const handleOpenJobForm = () => {
    setIsOpen(true)
  }

  const handleCloseJobForm = () => {
    setIsOpen(false)
  }

  const { currentRole } = useRole()

  const stateJob = useSelector((state) => state.jobs)
  const { assignUser, jobDetail } = stateJob
  const { data: job, isLoading } = jobDetail
  const { data: assignmentJob } = assignUser
  const dispatch = useDispatch()
  const smDown = useResponsive('down', 'sm')
  const theme = useTheme()

  useEffect(() => {
    dispatch(getJobDetail({ jobId }))
    dispatch(getAssignUser({ jobId }))
  }, [dispatch, jobId])

  const { data: candidateJob } = useGetCandidateJobQuery({
    jobId,
    currentRole,
  })

  const { data: jobActivity } = useGetJobActivityQuery({
    idJob: jobId,
    currentRole,
  })

  const { data: assignListUser } = useGetAssignListUserQuery({ currentRole })

  const onToggleAssignee = async (checked, userId) => {
    if (checked) {
      dispatch(
        removeAssignUser({
          jobId: jobId,
          userId: userId,
          assignUser: assignmentJob,
        })
      )
      return
    }

    const assign = assignListUser?.data?.user.find((item) => item.id === userId)

    dispatch(
      addAssignUser({
        jobId: jobId,
        userId: userId,
        assignUser: assignmentJob,
        assign: assign,
      })
    )
  }

  const {
    toggle: openDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useToggle()

  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = async (values) => {
    values.tags = values.tags.map((item) => item.value)
    const response = await dispatch(updateJobDetail({ jobId, data: values }))

    if (response?.meta?.requestStatus === 'rejected') {
      enqueueSnackbar(translate('pages.jobs.updateJobFailed'), {
        variant: 'error',
      })
      return
    }

    await dispatch(getJobDetail({ jobId }))

    handleCloseJobForm()
    enqueueSnackbar(translate('pages.jobs.updateJobSuccess'), {
      variant: 'success',
    })
  }

  if (isLoading) return <LoadingScreen />

  if (!job) return <Page404 />

  return (
    <Page title={translate('nav.jobDetail')}>
      <Container
        maxWidth={themeStretch ? false : 'xl'}
        sx={{ ...(smDown && { padding: 0 }) }}
      >
        <HeaderBreadcrumbs
          heading=''
          links={[
            {
              name: translate('nav.dashboard'),
              href: PATH_DASHBOARD.dashboard,
            },
            {
              name: translate('pages.jobs.heading'),
              href: PATH_DASHBOARD.jobs.root,
            },
            {
              name: translate('nav.jobDetail'),
            },
          ]}
          sx={{
            px: theme.spacing(2),
          }}
        />

        <Grid container spacing={2} mb={8}>
          <Grid item xs={12} md={7}>
            <JobDetailDescription
              job={job}
              assignmentJob={assignmentJob}
              assignListUser={assignListUser?.data}
              handleOpenJobForm={handleOpenJobForm}
              onToggleAssignee={onToggleAssignee}
              hasPermission={hasPermission}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <JobDetailListCandidate
              listCandidate={candidateJob?.data?.list}
              assignListUser={assignListUser?.data?.user}
            />

            {assignmentJob?.length > 0 && (
              <JobDetailFollower listFollower={assignmentJob} theme={theme} />
            )}

            <JobDetailNote job={job} />
          </Grid>
        </Grid>

        <Box
          sx={{
            position: 'fixed',
            right: theme.spacing(5),
            bottom: theme.spacing(5),
          }}
        >
          <ButtonStyle size='large' variant='contained' onClick={onOpenDialog}>
            <Iconify icon={'bx:calendar'} width={24} height={24} />
          </ButtonStyle>
        </Box>

        <JobModal
          isOpen={isOpen}
          isEdit
          onClose={handleCloseJobForm}
          job={job}
          onSubmit={handleSubmit}
        />

        <JobDetailActivityDialog
          open={openDialog}
          onClose={onCloseDialog}
          jobActivity={jobActivity?.data?.historyJob}
        />
      </Container>
    </Page>
  )
}

export default JobDetail
