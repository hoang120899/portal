import { useState } from 'react'

// @mui
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
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
// hooks
import useLocales from '@/hooks/useLocales'
import palette from '@/theme/palette'

const TypographyRootStyle = styled('div')(() => ({
  '&:hover .MuiTypography-root': {
    color: `${palette.light.warning.main}`,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}))

InterviewCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
  onOpenInterviewDetail: PropTypes.func,
}

export default function InterviewCollapsibleTableRow({
  row,
  onOpenInterviewDetail,
}) {
  const { translate } = useLocales()
  const {
    linkZoom = '',
    timeInterviewStr = '',
    timeInterviewEndStr = '',
    candidateName = '',
    locationName = '',
  } = row

  const [open, setOpen] = useState(true)

  const handleOpenInterviewDetail = () => {
    onOpenInterviewDetail(row)
  }

  return (
    <>
      <TableRow>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
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

          <TypographyRootStyle>
            <Typography
              variant='subtitle2'
              sx={{ cursor: 'pointer', fontWeight: 'bold' }}
              onClick={handleOpenInterviewDetail}
            >
              {candidateName}
            </Typography>
          </TypographyRootStyle>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Paper
              sx={{
                px: 1,
                py: 2,
                borderRadius: 1.5,
                boxShadow: (theme) => theme.customShadows.z8,
              }}
            >
              <Table size='small' aria-label='purchases'>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.interviewSchedule.linkZoom')}
                    </TableCell>
                    <TableCell>{linkZoom}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.interviewSchedule.location')}
                    </TableCell>
                    <TableCell>{locationName}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.interviewSchedule.timeStart')}
                    </TableCell>
                    <TableCell>{timeInterviewStr}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.interviewSchedule.timeEnd')}
                    </TableCell>
                    <TableCell>{timeInterviewEndStr}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate(
                        'pages.dashboard.interviewSchedule.viewDetail'
                      )}
                    </TableCell>

                    <TableCell>
                      <IconButtonAnimate onClick={handleOpenInterviewDetail}>
                        <Iconify
                          icon={'eva:eye-outline'}
                          width={20}
                          height={20}
                        />
                      </IconButtonAnimate>
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
