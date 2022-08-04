import { Box, Stack, TableCell, TableRow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

import TextMaxLine from '@/components/TextMaxLine'
import useLocales from '@/hooks/useLocales'
import { fDate } from '@/utils/formatTime'

import { APPLICANT_TABLE_ROW_HEIGHT } from './config'

ApplicantsTableRow.propTypes = {
  row: PropTypes.object,
  handleOpenDetail: PropTypes.func,
}

export default function ApplicantsTableRow({ row, handleOpenDetail }) {
  const {
    Candidate: { name: candidateName = '' },
    Job: { title: jobTitle = '' },
    createdAt = '',
  } = row || {}

  const theme = useTheme()
  const { translate } = useLocales()

  return (
    <TableRow hover sx={{ height: `${APPLICANT_TABLE_ROW_HEIGHT}px` }}>
      <TableCell align='left' sx={{ py: '2px', width: '100%' }}>
        <Box>
          <Box>
            <TextMaxLine
              variant='subtitle2'
              onClick={() => handleOpenDetail(row)}
              sx={{
                cursor: 'pointer',
                maxWidth: '100%',
                transition: 'all 0.4s',
                '&:hover': { color: theme.palette.primary.main },
              }}
              line={1}
            >
              {candidateName}
            </TextMaxLine>
          </Box>

          <Stack direction='row' alignItems='flex-start'>
            <Typography
              variant='body2'
              sx={{
                color: 'text.secondary',
                mr: 0.5,
                minWidth: '73px',
              }}
            >
              {translate('pages.dashboard.applicants.applyFor')}
            </Typography>

            <TextMaxLine
              variant='subtitle2'
              sx={{ color: 'text.primary', maxWidth: '100%' }}
              line={1}
            >
              {jobTitle}
            </TextMaxLine>
          </Stack>
        </Box>
      </TableCell>

      <TableCell align='left' sx={{ py: '2px', width: '45%' }}>
        <TextMaxLine
          variant='subtitle2'
          sx={{ mt: '6px', ml: '4px', maxWidth: '100%' }}
          line={2}
        >
          {fDate(createdAt)}
        </TextMaxLine>
      </TableCell>
    </TableRow>
  )
}
