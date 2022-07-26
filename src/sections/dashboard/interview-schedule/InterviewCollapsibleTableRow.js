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

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
// hooks
import useLocales from '@/hooks/useLocales'

InterviewCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
}

export default function InterviewCollapsibleTableRow({ row }) {
  const { translate } = useLocales()
  const {
    linkZoom = '',
    timeInterviewStr = '',
    timeInterviewEndStr = '',
    candidateName = '',
    locationName = '',
  } = row

  const [open, setOpen] = useState(true)

  return (
    <>
      <TableRow>
        <TableCell sx={{ display: 'flex' }}>
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
          <Typography
            variant='subtitle2'
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {candidateName}
          </Typography>
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
                    <TableCell>{translate('Link zoom')}</TableCell>
                    <TableCell>{linkZoom}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{translate('Location')}</TableCell>
                    <TableCell>{locationName}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{translate('Time start')}</TableCell>
                    <TableCell>{timeInterviewStr}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{translate('Time end')}</TableCell>
                    <TableCell>{timeInterviewEndStr}</TableCell>
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
