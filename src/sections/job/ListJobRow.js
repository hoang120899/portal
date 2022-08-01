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

ListJobRow.propTypes = {
  row: PropTypes.object,
  handleEditClient: PropTypes.func,
}

function ListJobRow({ row, handleEditClient }) {
  const { Client, jobStatus, title, salary, type, time, id } = row

  return (
    <TableRow hover>
      <TableCell align='left' width='20%'>
        <Link href={PATH_DASHBOARD.jobDetail.view(id)} passHref>
          <LinkRootStyle>
            <TextMaxLine sx={{ fontSize: '0.875rem' }} asLink line={1}>
              {title}
            </TextMaxLine>
          </LinkRootStyle>
        </Link>
      </TableCell>

      <TableCell align='left' width='15%'>
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

      <TableCell align='left'>{time}</TableCell>

      <TableCell align='left'>{salary}</TableCell>

      <TableCell align='left'>
        <Label color='info' variant='filled'>
          {type.replace(/ /g, '-')}
        </Label>
      </TableCell>

      <TableCell align='left'>
        <CustomLabel
          sx={{
            padding: 0,
            color: JOB_STATUS_COLORS[jobStatus.toLowerCase()],
            fontSize: '0.875rem',
          }}
        >
          {jobStatus}
        </CustomLabel>
      </TableCell>

      <TableCell>
        <Tooltip title='View details'>
          <IconButtonAnimate sx={{ padding: '8px 9px 3px' }}>
            <Link href={PATH_DASHBOARD.jobDetail.view(id)} passHref>
              <LinkRootStyle>
                <TextMaxLine asLink line={1}>
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
