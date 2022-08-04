import React from 'react'

import {
  Avatar,
  Box,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

WeeklyTaskTableRow.propTypes = {
  row: PropTypes.object,
}

export default function WeeklyTaskTableRow({ row }) {
  const {
    user: { linkAvatar, name, nameTeam },
    startDate,
    endDate,
    content,
  } = row
  return (
    <TableRow hover>
      <TableCell>
        <Stack direction='row' alignItems='center'>
          <Avatar src={linkAvatar} sx={{ width: 48, height: 48 }} />
          <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
              {name}
            </Typography>

            <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
              {nameTeam}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
          {startDate} - {endDate}
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
          {content
            .reduce((acc, cur) => acc + cur.content + ', ', '')
            .slice(0, -2)}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
