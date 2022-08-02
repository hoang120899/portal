// @mui
import { Link, TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

// components
import Label from '@/components/Label'
import TextMaxLine from '@/components/TextMaxLine'
import palette from '@/theme/palette'

InterviewTableRow.propTypes = {
  row: PropTypes.object,
  onOpenInterviewDetail: PropTypes.func,
}

const TypographyRootStyle = styled('div')(() => ({
  '&:hover .MuiTypography-root': {
    color: `${palette.light.warning.main}`,
    textDecoration: 'underline',
  },
}))

export default function InterviewTableRow({ row = {}, onOpenInterviewDetail }) {
  const {
    linkZoom = '',
    timeInterviewStr = '',
    timeInterviewEndStr = '',
    candidateName = '',
    locationName = '',
  } = row

  const handleOpenInterviewDetail = () => {
    onOpenInterviewDetail(row)
  }

  return (
    <TableRow hover>
      <TableCell align='left' width='15%'>
        <TypographyRootStyle>
          <TextMaxLine
            line={1}
            variant='subtitle2'
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={handleOpenInterviewDetail}
          >
            {candidateName}
          </TextMaxLine>
        </TypographyRootStyle>
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
