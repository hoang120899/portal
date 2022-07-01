import { useState } from 'react'

// @mui
import { MenuItem, TableCell, TableRow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import Label from '@/components/Label'
import { TableMoreMenu } from '@/components/table'

UserTableRow.propTypes = {
  row: PropTypes.object,
}

export default function UserTableRow({ row }) {
  const theme = useTheme()

  const { name, company, role, status } = row

  const [openMenu, setOpenMenuActions] = useState(null)

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  return (
    <TableRow hover>
      <TableCell>
        <Typography variant='subtitle2' noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align='left'>{company}</TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {role}
      </TableCell>

      <TableCell align='left'>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'banned' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align='right'>
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  handleCloseMenu()
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu()
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  )
}
