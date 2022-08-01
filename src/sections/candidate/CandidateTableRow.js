import { useCallback } from 'react'

// @mui
import { TableCell, TableRow, Typography, useTheme } from '@mui/material'

import PropTypes from 'prop-types'

import Label from '@/components/Label'

import {
  COLOR_DATA_COLUMN,
  COLOR_THEME_DARK,
  COLOR_THEME_LIGHT,
  HOVER_COLOR_DATA,
  THEME_DARK,
} from './config'

CandidateTableRow.propTypes = {
  row: PropTypes.object,
  handleGetCandidateDetail: PropTypes.func,
}

export default function CandidateTableRow({
  row = {},
  handleGetCandidateDetail,
}) {
  const theme = useTheme()
  const {
    name = '',
    phone = '',
    date = [],
    titleJob = [],
    source = [],
    lane = [],
    follower = [],
  } = row

  const renderData = useCallback(
    (listData) => {
      if (!listData.length && !Array.isArray(listData)) return
      return listData.map((data, id) => (
        <Typography
          variant='subtitle2'
          key={id}
          sx={{
            fontWeight: 'normal',
            color: `${
              theme.palette.mode === THEME_DARK
                ? COLOR_THEME_DARK
                : COLOR_THEME_LIGHT
            }`,
            fontSize: 14,
          }}
        >
          {data}
        </Typography>
      ))
    },
    [theme.palette.mode]
  )

  const renderDataColumn = useCallback((listData) => {
    if (!listData.length && !Array.isArray(listData)) return
    return listData.map((data, id) => (
      <Typography
        width={110}
        variant='subtitle2'
        key={id}
        noWrap
        sx={{
          backgroundColor: `${data.background}`,
          color: COLOR_DATA_COLUMN,
          py: 0.5,
          mb: 0.6,
          px: 0.5,
          borderRadius: 0.6,
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        {data.nameColumn}
      </Typography>
    ))
  }, [])
  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography
          onClick={handleGetCandidateDetail}
          variant='subtitle2'
          sx={{
            cursor: 'pointer',
            fontWeight: 'normal',
            color: `${
              theme.palette.mode === THEME_DARK
                ? COLOR_THEME_DARK
                : COLOR_THEME_LIGHT
            }`,
            '&:hover': {
              color: HOVER_COLOR_DATA,
            },
          }}
        >
          {name}
        </Typography>
      </TableCell>

      <TableCell align='left'>
        {phone && (
          <Label color='warning'>
            <Typography variant='subtitle2' sx={{ borderRadius: 0.6, px: 1 }}>
              {phone}
            </Typography>
          </Label>
        )}
      </TableCell>

      <TableCell align='left' sx={{ width: 180 }}>
        {renderData(date)}
      </TableCell>

      <TableCell align='left'>{renderData(titleJob)}</TableCell>

      <TableCell align='left'>{renderData(source)}</TableCell>

      <TableCell align='center'>{renderDataColumn(lane)}</TableCell>

      <TableCell align='left'>{renderData(follower)}</TableCell>
    </TableRow>
  )
}
