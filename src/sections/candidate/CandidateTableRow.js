// @mui
import { TableCell, TableRow, Typography, useTheme } from '@mui/material'

import PropTypes from 'prop-types'

import Label from '@/components/Label'

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
  const renderData = (listData) => (
    <>
      {listData?.map((data, id) => (
        <Typography
          variant='subtitle2'
          sx={{
            fontWeight: 'normal',
            color: `${theme.palette.mode === 'dark' ? '#cccccc' : '#505050'}`,
          }}
          key={id}
        >
          {data}
        </Typography>
      ))}
    </>
  )
  const renderDataColumn = (listData) => (
    <>
      {listData?.map((data, id) => (
        <Typography
          width={110}
          variant='subtitle2'
          key={id}
          noWrap
          sx={{
            backgroundColor: `${data.background}`,
            color: '#fff',
            py: 0.5,
            px: 0.5,
            mb: 0.6,
            borderRadius: 0.6,
            cursor: 'pointer',
          }}
        >
          {data.nameColumn}
        </Typography>
      ))}
    </>
  )
  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography
          onClick={handleGetCandidateDetail}
          variant='subtitle2'
          sx={{
            cursor: 'pointer',
            fontWeight: 'normal',
            color: `${theme.palette.mode === 'dark' ? '#cccccc' : '#505050'}`,
            '&:hover': {
              color: '#ffe16a',
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
