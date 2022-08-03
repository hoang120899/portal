import { memo } from 'react'

import Link from 'next/link'

// @mui
import { TableCell, TableRow, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

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

ListJobRow.propTypes = {
  row: PropTypes.object,
  handleEditClient: PropTypes.func,
}

const styledFontsize = {
  fontSize: pxToRem(14),
}

function ListJobRow({ row, handleEditClient }) {
  const { translate } = useLocales()
  const { Client, jobStatus, title, salary, type, time, id } = row
  const { name = '' } = Client || {}

  const editClient = () => {
    handleEditClient(Client)
  }

  return (
    <TableRow hover>
      <TableCell align='left' width='20%'>
        <Link href={PATH_DASHBOARD.jobDetail.view(id)} passHref>
          <LinkRootStyle>
            <TextMaxLine sx={styledFontsize} asLink line={1}>
              {title}
            </TextMaxLine>
          </LinkRootStyle>
        </Link>
      </TableCell>

      <TableCell align='left' width='15%'>
        <TypographyRootStyle>
          <TextMaxLine sx={styledFontsize} line={1} onClick={editClient}>
            {name}
          </TextMaxLine>
        </TypographyRootStyle>
      </TableCell>

      <TableCell align='left'>{time}</TableCell>

      <TableCell align='left'>{salary}</TableCell>

      <TableCell align='left'>
        <Label color='info' variant='filled'>
          {REPLACE_LABEL_TYPE(type)}
        </Label>
      </TableCell>

      <TableCell align='left'>
        <CustomLabel
          sx={{
            padding: 0,
            color: JOB_STATUS_COLORS[jobStatus.toLowerCase()],
            ...styledFontsize,
          }}
        >
          {jobStatus}
        </CustomLabel>
      </TableCell>

      <TableCell>
        <Tooltip title={translate('pages.jobs.viewDetail')}>
          <IconButtonAnimate sx={{ padding: '8px 9px 3px' }}>
            <Link href={PATH_DASHBOARD.jobDetail.view(id)} passHref>
              <LinkRootStyle>
                <TextMaxLine asLink>
                  <Iconify icon={'eva:eye-fill'} width={20} height={20} />
                </TextMaxLine>
              </LinkRootStyle>
            </Link>
          </IconButtonAnimate>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default memo(ListJobRow)
