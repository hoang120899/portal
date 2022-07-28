// @mui
import { useState } from 'react'

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
import TextMaxLine from '@/components/TextMaxLine'
import useLocales from '@/hooks/useLocales'
import {
  DEFAULT_STATUS_COLOR,
  STATUS_COLOR,
} from '@/sections/dashboard/active-job/config'

JobTaskCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
}

export default function JobTaskCollapsibleTableRow({ row }) {
  const theme = useTheme()
  const { translate } = useLocales()
  const color = STATUS_COLOR[row?.jobStatus] || DEFAULT_STATUS_COLOR
  const [open, setOpen] = useState(true)
  return (
    <>
      <TableRow>
        <TableCell
          sx={{ display: 'flex', marginTop: 2, px: 2, alignItems: 'center' }}
        >
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

          <TextMaxLine variant='subtitle2' line={2}>
            {row.title}
          </TextMaxLine>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
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
                    <TableCell>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate('Salary')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='subtitle1'>{row?.salary}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow align='left'>
                    <TableCell>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate('Candidate')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='subtitle1'>
                        {row?.candidate}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow align='left'>
                    <TableCell>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate('Type')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='subtitle1'>{row?.type}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow align='left'>
                    <TableCell>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate('Job Status')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant={
                          theme.palette.mode === 'light' ? 'ghost' : 'filled'
                        }
                        color={color}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {row.jobStatus}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow align='left'>
                    <TableCell>
                      <Typography
                        sx={{
                          marginLeft: 0,
                          px: 1,
                          paddingLeft: 0,
                          color: '#b5b5c3',
                        }}
                        variant='subtitle1'
                      >
                        {translate('View Detail')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton size='small'>
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
