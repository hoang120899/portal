import { useState } from 'react'

import { TableCell, TableRow, Typography, useTheme } from '@mui/material'

import PropTypes from 'prop-types'

import Label from '@/components/Label'
import { TableMoreMenu } from '@/components/table'
import useResponsive from '@/hooks/useResponsive'

// components

JobTaskTableRow.propTypes = {
  row: PropTypes.object,
}
export default function JobTaskTableRow({ row }) {
  const theme = useTheme()
  const [openMenu, setOpenMenuActions] = useState(null)
  const isMobile = useResponsive('down', 768, 'md')
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }
  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography variant='subtitle1'>{row.title}</Typography>
        <Typography
          sx={{ px: 1, paddingLeft: 0, color: '#b5b5c3', fontSize: 13 }}
          variant='subtitle2'
        >
          {row.type}
        </Typography>
      </TableCell>
      {isMobile ? (
        <TableMoreMenu
          open={openMenu}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          actions={
            <>
              <TableRow align='left' width={200}>
                <Typography variant='subtitle1'>{row?.salary}</Typography>
                <Typography
                  sx={{
                    marginLeft: 0,
                    px: 1,
                    paddingLeft: 0,
                    color: '#b5b5c3',
                    fontSize: 13,
                  }}
                  variant='subtitle2'
                >
                  Salary
                </Typography>
              </TableRow>
              <TableRow align='left' width={200}>
                <Typography variant='subtitle1'>Candidate</Typography>
                <Typography
                  variant='subtitle2'
                  sx={{ px: 1, paddingLeft: 0, color: '#b5b5c3', fontSize: 13 }}
                >
                  {row?.candidate}
                </Typography>
              </TableRow>
              <TableRow align='left'>
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={(status === 'banned' && 'error') || 'success'}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {row.jobStatus}
                </Label>
              </TableRow>
            </>
          }
         />
      ) : (
        <>
          <TableCell align='left' width={160}>
            <Typography variant='subtitle1'>{row?.salary}</Typography>
            <Typography
              variant='subtitle2'
              sx={{ px: 1, paddingLeft: 0, color: '#b5b5c3', fontSize: 13 }}
            >
              Salary
            </Typography>
          </TableCell>
          <TableCell align='left' width={160}>
            <Typography variant='subtitle1'>Candidate</Typography>
            <Typography
              variant='subtitle2'
              sx={{ px: 1, paddingLeft: 0, color: '#b5b5c3', fontSize: 13 }}
            >
              {row?.candidate}
            </Typography>
          </TableCell>
          <TableCell align='left'>
            <Label
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color={(status === 'banned' && 'error') || 'success'}
              sx={{ textTransform: 'capitalize' }}
            >
              {row.jobStatus}
            </Label>
          </TableCell>
        </>
      )}
    </TableRow>
  )
}
