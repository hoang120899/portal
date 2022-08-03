import { useState } from 'react'

import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
import useLocales from '@/hooks/useLocales'
import { fDate } from '@/utils/formatTime'

ApplicantsCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
  handleOpenDetail: PropTypes.func,
}

export default function ApplicantsCollapsibleTableRow({
  row,
  handleOpenDetail,
}) {
  const {
    Candidate: { name: candidateName = '' },
    Job: { title: jobTitle = '' },
    createdAt = '',
  } = row || {}

  const { translate } = useLocales()
  const [isOpenDropdown, setIsOpenDropdown] = useState(true)

  const handleToggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }

  return (
    <>
      <TableRow>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            color={'default'}
            onClick={handleToggleDropdown}
          >
            <Iconify
              icon={
                isOpenDropdown
                  ? 'eva:arrow-ios-upward-fill'
                  : 'eva:arrow-ios-downward-fill'
              }
            />
          </IconButton>

          <Typography
            variant='subtitle2'
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {candidateName}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ pl: '16px !important' }}>
          <Collapse in={isOpenDropdown} timeout='auto' unmountOnExit>
            <Paper
              sx={{
                px: 0.5,
                py: 1,
                borderRadius: 1.5,
                boxShadow: (theme) => theme.customShadows.z8,
              }}
            >
              <Table size='small'>
                <TableBody>
                  <TableRow sx={{ verticalAlign: 'top' }}>
                    <TableCell sx={{ width: '30%' }}>
                      {translate('pages.dashboard.applicants.applyFor')}
                    </TableCell>

                    <TableCell sx={{ width: 644 }}>
                      <Typography variant='subtitle2'>{jobTitle}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.applicants.date')}
                    </TableCell>
                    <TableCell>{fDate(createdAt)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.applicants.viewDetail')}
                    </TableCell>

                    <TableCell>
                      <Tooltip
                        title={translate(
                          'pages.dashboard.applicants.viewDetail'
                        )}
                      >
                        <IconButtonAnimate
                          sx={{
                            border: (theme) =>
                              `dashed 1px ${theme.palette.divider}`,
                            transition: 'all 0.15s',
                            '&:hover': {
                              color: `primary.main`,
                            },
                          }}
                          onClick={() => handleOpenDetail(row)}
                        >
                          <Iconify
                            icon={'eva:eye-fill'}
                            width={20}
                            height={20}
                          />
                        </IconButtonAnimate>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
