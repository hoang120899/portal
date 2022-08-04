import React, { Fragment, memo, useState } from 'react'

import Link from 'next/link'

import { IconButton, Stack, TableCell, TableRow, Tooltip } from '@mui/material'
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

const fontSizeStyled = {
  fontSize: pxToRem(14),
}

const styledLabel = {
  ...fontSizeStyled,
  marginBottom: (theme) => theme.spacing(2),
}

const TextMaxLineRootStyle = styled(TextMaxLine)(({ theme }) => ({
  ...fontSizeStyled,
  marginBottom: theme.spacing(2),
}))

ListJobRowMobile.propTypes = {
  row: PropTypes.object,
  handleEditClient: PropTypes.func,
}

function ListJobRowMobile({ row, handleEditClient }) {
  const { translate } = useLocales()
  const [isOpen, setIsOpen] = useState(true)

  const { Client, jobStatus, title, salary, type, time, id } = row
  const { name = '' } = Client || {}

  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState)
  }

  const editClient = () => {
    handleEditClient(Client)
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
                line={1}
                asLink
                sx={{ fontWeight: 'bold', ...fontSizeStyled }}
              >
                {title}
              </TextMaxLine>
            </LinkRootStyle>
          </Link>
        </TableCell>

        <TableCell width='35%'>
          <TypographyRootStyle>
            <TextMaxLine line={1} onClick={editClient} sx={fontSizeStyled}>
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
                <TextMaxLineRootStyle line={1}>{time}</TextMaxLineRootStyle>
                <TextMaxLineRootStyle line={1}>{salary}</TextMaxLineRootStyle>
                <TextMaxLineRootStyle>
                  {translate('pages.jobs.actions')}
                </TextMaxLineRootStyle>
              </Stack>
            </TableCell>

            <TableCell>
              <Stack alignItems='flex-start'>
                <Label color='info' variant='filled' sx={styledLabel}>
                  {REPLACE_LABEL_TYPE(type)}
                </Label>

                <CustomLabel
                  sx={{
                    ...styledLabel,
                    color: JOB_STATUS_COLORS[jobStatus.toLowerCase()],
                  }}
                >
                  {jobStatus}
                </CustomLabel>

                <Link href={PATH_DASHBOARD.jobDetail.view(id)} passHref>
                  <LinkRootStyle>
                    <TextMaxLineRootStyle asLink>
                      <Tooltip title={translate('pages.jobs.viewDetail')}>
                        <IconButtonAnimate>
                          <Iconify
                            icon={'eva:eye-fill'}
                            width={16}
                            height={16}
                          />
                        </IconButtonAnimate>
                      </Tooltip>
                    </TextMaxLineRootStyle>
                  </LinkRootStyle>
                </Link>
              </Stack>
            </TableCell>
          </TableRow>
        </Fragment>
      )}
    </Fragment>
  )
}

export default memo(ListJobRowMobile)
