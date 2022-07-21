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
import Label from '@/components/Label'
import TextMaxLine from '@/components/TextMaxLine'
import useLocales from '@/hooks/useLocales'

CandidatesCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
}

export default function CandidatesCollapsibleTableRow({ row }) {
  const { translate } = useLocales()
  const { name = '', phone = '', date = [], titleJob = [] } = row

  const [open, setOpen] = useState(true)
  const renderData = (listData) => (
      <>
        {listData?.map((data, id) => (
          <Typography variant='subtitle2' key={id}>
            <TextMaxLine line={1} key={id} sx={{ maxWidth: 160 }}>
              {data}
            </TextMaxLine>
          </Typography>
        ))}
      </>
    )
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
          <Typography variant='subtitle2'>{name}</Typography>
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
                      {translate('pages.candidates.jobApply')}
                    </TableCell>
                    <TableCell>{renderData(titleJob)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.candidates.timeApply')}
                    </TableCell>
                    <TableCell>{renderData(date)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{translate('pages.candidates.phone')}</TableCell>
                    <TableCell>
                      <Label color='warning'>
                        <Typography
                          variant='subtitle2'
                          align='left'
                          sx={{
                            borderRadius: 0.6,
                            px: 1,
                          }}
                        >
                          {phone}
                        </Typography>
                      </Label>
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
