import React, { Fragment, memo, useState } from 'react'

import Link from 'next/link'

import {
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import CustomLabel from '@/components/CustomLabel'
// component
import Iconify from '@/components/Iconify'
import Label from '@/components/Label'
import TextMaxLine from '@/components/TextMaxLine'
import { IconButtonAnimate } from '@/components/animate'
import { PATH_DASHBOARD } from '@/routes/paths'
import palette from '@/theme/palette'

import { JOB_STATUS_COLORS } from './config'

const LinkRootStyle = styled('div')(() => ({
  '&:hover .MuiLink-root': {
    color: `${palette.light.warning.main} !important`,
    cursor: 'pointer',
  },
}))

const TypographyRootStyle = styled('div')(() => ({
  '&:hover .MuiTypography-root': {
    color: `${palette.light.warning.main}`,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

ListJobRowMobile.propTypes = {
  row: PropTypes.object,
  handleEditClient: PropTypes.func,
}

function ListJobRowMobile({ row, handleEditClient }) {
  const { Client, jobStatus, title, salary, type, time, id } = row
  const [isOpen, setIsOpen] = useState(true)

  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <Fragment>
      <TableRow>
        <TableCell sx={{ padding: '8px 0' }}>
          <IconButton
            size='small'
            color={'default'}
            onClick={handleToggleDropdown}
          >
            <Iconify
              icon={
                isOpen
                  ? 'eva:arrow-ios-upward-fill'
                  : 'eva:arrow-ios-downward-fill'
              }
            />
          </IconButton>
        </TableCell>
        <TableCell width='65%'>
          <Link href={PATH_DASHBOARD.jobDetail.view(id)} passHref>
            <LinkRootStyle>
              <TextMaxLine
                sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}
                asLink
                line={1}
              >
                {title}
              </TextMaxLine>
            </LinkRootStyle>
          </Link>
        </TableCell>
        <TableCell width='35%'>
          <TypographyRootStyle>
            <TextMaxLine
              sx={{ fontSize: '0.875rem' }}
              line={1}
              onClick={handleEditClient.bind(null, Client)}
            >
              {Client?.name || ''}
            </TextMaxLine>
          </TypographyRootStyle>
        </TableCell>
      </TableRow>

      {isOpen && (
        <Fragment>
          <TableRow
            sx={{
              borderRadius: 1.5,
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <TableCell />
            <TableCell>
              <Stack>
                <TextMaxLine line={1} mb={2} sx={{ fontSize: '0.75rem' }}>
                  {time}
                </TextMaxLine>
                <TextMaxLine line={1} mb={2} sx={{ fontSize: '0.75rem' }}>
                  {salary}
                </TextMaxLine>
                <Typography sx={{ fontSize: '0.75rem' }}>Action</Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Stack sx={{ fontSize: '0.75rem' }} alignItems='flex-start'>
                <Label
                  color='info'
                  variant='filled'
                  sx={{ marginBottom: '16px' }}
                >
                  {type.replace(/ /g, '-')}
                </Label>
                <CustomLabel
                  mb={2}
                  sx={{ color: JOB_STATUS_COLORS[jobStatus.toLowerCase()] }}
                >
                  {jobStatus}
                </CustomLabel>
                <Tooltip title='View details'>
                  <IconButtonAnimate sx={{ padding: '8px 10px 4px' }}>
                    <Link href={PATH_DASHBOARD.jobDetail.view(id)} passHref>
                      <LinkRootStyle>
                        <TextMaxLine asLink line={1}>
                          <Iconify
                            icon={'eva:eye-fill'}
                            width={16}
                            height={16}
                          />
                        </TextMaxLine>
                      </LinkRootStyle>
                    </Link>
                  </IconButtonAnimate>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        </Fragment>
      )}
    </Fragment>
  )
}

export default memo(ListJobRowMobile)
