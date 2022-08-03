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

// component
import CustomLabel from '@/components/CustomLabel'
import Iconify from '@/components/Iconify'
import Label from '@/components/Label'
import TextMaxLine from '@/components/TextMaxLine'
import { IconButtonAnimate } from '@/components/animate'
import useLocales from '@/hooks/useLocales'
import { PATH_DASHBOARD } from '@/routes/paths'
import palette from '@/theme/palette'
import { pxToRem } from '@/utils/getFontValue'

import { JOB_STATUS_COLORS, REPLACE_LABEL_TYPE } from './config'

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

const fontSizeStyled = {
  fontSize: pxToRem(12),
}

function ListJobRowMobile({ row, handleEditClient }) {
  const { translate } = useLocales()
  const [isOpen, setIsOpen] = useState(true)

  const { Client, jobStatus, title, salary, type, time, id } = row
  const { name } = Client || { name: '' }

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
                sx={{ fontWeight: 'bold', ...fontSizeStyled }}
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
              sx={fontSizeStyled}
              line={1}
              onClick={handleEditClient.bind(null, Client)}
            >
              {name}
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
                <TextMaxLine line={1} mb={2} sx={fontSizeStyled}>
                  {time}
                </TextMaxLine>
                <TextMaxLine line={1} mb={2} sx={fontSizeStyled}>
                  {salary}
                </TextMaxLine>
                <Typography sx={fontSizeStyled}>
                  {translate('pages.jobs.actions')}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell>
              <Stack sx={fontSizeStyled} alignItems='flex-start'>
                <Label
                  color='info'
                  variant='filled'
                  sx={{ marginBottom: '16px' }}
                >
                  {REPLACE_LABEL_TYPE(type)}
                </Label>

                <CustomLabel
                  mb={2}
                  sx={{ color: JOB_STATUS_COLORS[jobStatus.toLowerCase()] }}
                >
                  {jobStatus}
                </CustomLabel>

                <Tooltip title={translate('pages.jobs.viewDetail')}>
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
