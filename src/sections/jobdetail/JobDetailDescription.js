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
import { DOMAIN_SERVER_API } from '@/config'
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import { API_DOWNLOAD_JOB } from '@/routes/api'

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
  ({ ownerState: { isLight = false } = {} }) => ({
    backgroundColor: isLight ? '#f8f8f8' : '#213142',
    margin: '-24px -24px 0',
    padding: '24px 24px 12px',
    borderBottom: '1px solid #d8d8d8',
  })
)

const JobDesSalaryStyled = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  '& svg': {
    marginBottom: '-2px',
  },
  marginBottom: (theme) => theme.spacing(1),
}))

const JobDesTitleStyled = styled(Box)(({ ownerState: { smDown } = {} }) => ({
  display: 'flex',
  flexDirection: smDown ? 'column' : 'row',
  justifyContent: 'space-between',
  marginBottom: '8px',
}))

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
            <Typography variant='body1' color='#ffa800'>
              <Iconify icon='carbon:currency-dollar' />
              {salary}
            </Typography>

            <Typography variant='body1' color='#f64e60'>
              <Iconify icon='entypo:location-pin' /> {location}
            </Typography>

            <Typography variant='body1' color='#3699ff'>
              <Iconify icon='bxs:time-five' /> {time}
            </Typography>
          </JobDesSalaryStyled>
        </BoxContentCard>

        <Box
          sx={{
            marginTop: (theme) => theme.spacing(1.5),
          }}
        >
          <Assignee
            assignee={assignmentJob}
            hasAddAssignee={hasPermission}
            listContacts={assignListUser?.user}
            onToggleAssignee={onToggleAssignee}
          />
          <Box
            sx={{
              textAlign: 'justify',
              marginTop: (theme) => theme.spacing(2),
            }}
            dangerouslySetInnerHTML={{ __html: getAbout }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobDetailDescription
