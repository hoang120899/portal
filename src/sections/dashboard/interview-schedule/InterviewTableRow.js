// @mui
import { Link, TableCell, TableRow, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Label from '@/components/Label'
import TextMaxLine from '@/components/TextMaxLine'

InterviewTableRow.propTypes = {
  row: PropTypes.object,
}

export default function InterviewTableRow({ row = {} }) {
  const {
    linkZoom = '',
    timeInterviewStr = '',
    timeInterviewEndStr = '',
    candidateName = '',
    locationName = '',
  } = row

  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography
          variant='subtitle2'
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
        >
          <TextMaxLine>{candidateName}</TextMaxLine>
        </Typography>
      </TableCell>

      <TableCell align='left'>
        {linkZoom && (
          <Link href={linkZoom} target='_blank' underline='none'>
            <Label
              color='warning'
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
                whiteSpace: 'inherit',
              }}
            >
              <TextMaxLine line={1}>{linkZoom}</TextMaxLine>
            </Label>
          </Link>
        )}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {locationName}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {timeInterviewStr}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {timeInterviewEndStr}
      </TableCell>
    </TableRow>
  )
}
