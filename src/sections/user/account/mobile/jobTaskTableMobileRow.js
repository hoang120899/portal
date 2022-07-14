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

// components
import Iconify from '@/components/Iconify'
import Label from '@/components/Label'

export default function JobTaskTableRowMobile({ row }) {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  return (
    <>
      <TableRow>
        <TableRow sx={{ display: 'flex', marginTop: 2 }}>
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
          <TableRow>
            <Typography
              variant='inherit'
              sx={{
                cursor: 'pointer',
                fontWeight: 'bold',
                overflow: 'hidden',
                msTextOverflow: 'ellipsis',
              }}
            >
              {row.title}
            </Typography>
          </TableRow>
        </TableRow>
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
                        Salary
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
                        Candidate
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
                        Type
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
                        Job Status
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Label
                        variant={
                          theme.palette.mode === 'light' ? 'ghost' : 'filled'
                        }
                        color={(status === 'banned' && 'error') || 'success'}
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {row.jobStatus}
                      </Label>
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
                        View Detail
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
