import React from 'react'

import Link from 'next/link'

import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import PropTypes from 'prop-types'

import Assignee from '@/components/Assignee'
import CopyClipboard from '@/components/CopyClipboard'
import Iconify from '@/components/Iconify'
import useLocales from '@/hooks/useLocales'
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
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
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

  const getAbout = () => {
    let about = aboutFetch || ''
    if (client) {
      about += client.about
    }
    return about + responsibilities + requirement + niceToHave + benefit
  }

  const { data: shortLink } = useGetShortLinkQuery({
    token: token,
  })
  const { translate } = useLocales()
  const urlDownLoadPDF = () => {
    const domain = process.env.NEXT_PUBLIC_HOST_API_KEY
    return `${domain}${API_DOWNLOAD_JOB}/${id}`
  }

  return (
    <Card sx={{ height: 'fit-content' }}>
      <CardContent>
        <Box
          sx={{
            backgroundColor: isLight ? '#f8f8f8' : '#213142',
            margin: '-24px -24px 0',
            padding: '24px 24px 12px',
            borderBottom: '1px solid #d8d8d8',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: smDown ? 'column' : 'row',
              justifyContent: 'space-between',
              marginBottom: '8px',
            }}
          >
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
                flexDirection: mdDown && smUp ? 'row' : 'column-reverse',
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
                    marginRight: '4px',
                    marginTop: '8px',
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
                    sx={{ height: 'fit-content', marginRight: '4px' }}
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
                    <a>{translate('pages.jobDetail.downloadAsPdf')}</a>
                  </Link>
                </Button>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              '& svg': {
                marginBottom: '-2px',
              },
              marginBottom: '8px',
            }}
          >
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
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '12px',
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
              marginTop: '1rem',
            }}
            dangerouslySetInnerHTML={{ __html: getAbout() }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default JobDetailDescription
