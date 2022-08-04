import React, { useMemo } from 'react'

import Link from 'next/link'

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import Assignee from '@/components/Assignee'
import CopyClipboard from '@/components/CopyClipboard'
import Iconify from '@/components/Iconify'
import Markdown from '@/components/Markdown'
import { DOMAIN_SERVER_API } from '@/config'
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import { API_DOWNLOAD_JOB } from '@/routes/api'

import { JOB_DETAIL_HEAD_COLOR } from './config'
import { useGetShortLinkQuery } from './jobDetailSlice'

JobDetailDescription.propTypes = {
  job: PropTypes.object,
  assignmentJob: PropTypes.array,
  assignListUser: PropTypes.object,
  handleOpenJobForm: PropTypes.func,
  onToggleAssignee: PropTypes.func,
  hasPermission: PropTypes.bool,
}

const BoxContentCard = styled(CardContent)(
  ({ theme, ownerState: { isLight = false } = {} }) => ({
    backgroundColor: isLight
      ? theme.palette.grey[100]
      : theme.palette.grey[500_8],
    margin: theme.spacing(-3, -3, 0),
    padding: theme.spacing(3, 3, 1.5),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  })
)

const JobDesSalaryStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  '& svg': {
    marginBottom: theme.spacing(-0.25),
  },
  marginBottom: theme.spacing(1),
}))

const JobDesTitleStyled = styled(Box)(
  ({ theme, ownerState: { smDown } = {} }) => ({
    display: 'flex',
    flexDirection: smDown ? 'column' : 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  })
)

function JobDetailDescription({
  job,
  assignmentJob,
  assignListUser,
  handleOpenJobForm,
  onToggleAssignee,
  hasPermission,
}) {
  const theme = useTheme()

  const isLight = theme.palette.mode === 'light'
  const mdDown = useResponsive('down', 'md')
  const smUp = useResponsive('up', 'sm')
  const smDown = useResponsive('down', 'sm')

  const {
    location,
    salary,
    time,
    title,
    client,
    aboutFetch,
    responsibilities,
    requirement,
    niceToHave,
    benefit,
    token,
    id,
  } = job || {}
  const { name } = client || {}

  const getAbout = useMemo(
    () =>
      `${aboutFetch || ''}${
        client?.about || ''
      }${responsibilities}${requirement}${niceToHave}${benefit}`,
    [aboutFetch, client, responsibilities, requirement, niceToHave, benefit]
  )

  const { data: shortLink } = useGetShortLinkQuery({
    token: token,
  })
  const { translate } = useLocales()
  const urlDownLoadPDF = () => `${DOMAIN_SERVER_API}${API_DOWNLOAD_JOB}/${id}`

  const flexDirection = useMemo(
    () => (mdDown && smUp ? 'row' : 'column-reverse'),
    [mdDown, smUp]
  )

  return (
    <Card sx={{ height: 'fit-content' }}>
      <CardContent>
        <BoxContentCard ownerState={{ isLight }}>
          <JobDesTitleStyled ownerState={{ smDown }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant='h5'>{title}</Typography>

              <Typography
                variant='body1'
                sx={{
                  marginTop: 'auto',
                }}
              >
                {name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: flexDirection,
              }}
            >
              <CopyClipboard
                value={shortLink?.data?.url}
                placement='bottom-start'
                arrow
              >
                <Typography
                  variant='body1'
                  color='#1BC5BD'
                  sx={{
                    cursor: 'pointer',
                    marginRight: (theme) => theme.spacing(0.5),
                    marginTop: (theme) => theme.spacing(1),
                  }}
                >
                  {shortLink?.data?.url}
                </Typography>
              </CopyClipboard>

              <Stack direction='row'>
                {hasPermission && (
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={handleOpenJobForm}
                    sx={{
                      height: 'fit-content',
                      marginRight: (theme) => theme.spacing(0.5),
                    }}
                  >
                    {translate('common.edit')}
                  </Button>
                )}

                <Button
                  color='primary'
                  variant='contained'
                  sx={{
                    '& a': { textDecoration: 'none', color: 'inherit' },
                    height: 'fit-content',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Link href={urlDownLoadPDF()}>
                    <a>{translate('pages.jobs.downloadAsPdf')}</a>
                  </Link>
                </Button>
              </Stack>
            </Box>
          </JobDesTitleStyled>

          <JobDesSalaryStyled>
            <Typography variant='body1' color={JOB_DETAIL_HEAD_COLOR.SALARY}>
              <Iconify icon='carbon:currency-dollar' />
              {salary}
            </Typography>

            <Typography variant='body1' color={JOB_DETAIL_HEAD_COLOR.LOCATION}>
              <Iconify icon='entypo:location-pin' /> {location}
            </Typography>

            <Typography variant='body1' color={JOB_DETAIL_HEAD_COLOR.TIME}>
              <Iconify icon='bxs:time-five' /> {time}
            </Typography>
          </JobDesSalaryStyled>
        </BoxContentCard>

        <Stack
          direction='column'
          spacing={2}
          sx={{
            marginTop: (theme) => theme.spacing(1.5),
            textAlign: 'justify',
          }}
        >
          <Assignee
            assignee={assignmentJob}
            hasAddAssignee={hasPermission}
            listContacts={assignListUser?.user}
            onToggleAssignee={onToggleAssignee}
          />
          <Markdown components={{}} children={getAbout} />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default JobDetailDescription
