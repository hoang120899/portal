import { useState } from 'react'

// @mui
import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'

import { useTheme } from '@emotion/react'
import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import useLocales from '@/hooks/useLocales'

import { DEFAULT_STATUS_COLOR, STATUS_COLOR } from './config'

ActiveJobCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
}

export default function ActiveJobCollapsibleTableRow({ row }) {
  const theme = useTheme()
  const { translate } = useLocales()
  const [open, setOpen] = useState(true)
  const { title, salary, jobStatus, numberCandidate, follower, type } =
    row || {}
  const color = STATUS_COLOR[jobStatus] || DEFAULT_STATUS_COLOR

  return (
    <>
      <TableRow sx={{ display: 'flex', marginTop: 2 }}>
        <TableCell align='left'>
          <IconButton
            size='small'
            color={open ? 'primary' : 'default'}
            onClick={() => setOpen(!open)}
          >
            <Iconify
              icon={
                open
                  ? 'eva:arrow-ios-upward-fill'
                  : 'eva:arrow-ios-downward-fill'
              }
            />
          </IconButton>
        </TableCell>

        <TableCell align='left'>
          <Typography
            variant='inherit'
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              overflow: 'hidden',
              msTextOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6} align='left'>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Paper
              sx={{
                px: 1,
                py: 2,
                marginTop: 2,
                borderRadius: 1.5,
                boxShadow: (theme) => theme.customShadows.z8,
              }}
            >
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  <TableRow align='left'>
                    <TableCell align='left' sx={{ width: '50%' }}>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate(`pages.dashboard.activeJobs.salary`)}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant='subtitle1'>{salary}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow align='left'>
                    <TableCell align='left'>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate(`pages.dashboard.activeJobs.candidate`)}
                      </Typography>
                    </TableCell>

                    <TableCell align='left'>
                      <Typography variant='subtitle1'>
                        {numberCandidate}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow align='left'>
                    <TableCell align='left'>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate(`pages.dashboard.activeJobs.type`)}
                      </Typography>
                    </TableCell>

                    <TableCell align='left'>
                      <Typography variant='subtitle1'>{type}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow align='left'>
                    <TableCell align='left'>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate(`pages.dashboard.activeJobs.status`)}
                      </Typography>
                    </TableCell>

                    <TableCell align='left'>
                      <Typography
                        variant={
                          theme.palette.mode === 'light' ? 'ghost' : 'filled'
                        }
                        color={color}
                        sx={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
                      >
                        {jobStatus}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow align='left'>
                    <TableCell align='left'>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate(`pages.dashboard.activeJobs.follower`)}
                      </Typography>
                    </TableCell>

                    <TableCell align='left'>
                      <Typography variant='subtitle1'>{follower}</Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow align='left'>
                    <TableCell align='left'>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate(`pages.dashboard.activeJobs.viewDetail`)}
                      </Typography>
                    </TableCell>

                    <TableCell align='left'>
                      <IconButton size='small' sx={{ padding: 0 }}>
                        <Iconify icon={'ant-design:eye-twotone'} />
                      </IconButton>
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
