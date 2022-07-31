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
  useTheme,
} from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import Label from '@/components/Label'
import TextMaxLine from '@/components/TextMaxLine'
import useLocales from '@/hooks/useLocales'

import {
  COLOR_DATA_COLUMN,
  COLOR_THEME_DARK,
  COLOR_THEME_LIGHT,
  HOVER_COLOR_DATA,
  THEME_DARK,
} from './config'

CandidatesCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
  handleGetCandidateDetail: PropTypes.func,
}

export default function CandidatesCollapsibleTableRow({
  row,
  handleGetCandidateDetail,
}) {
  const { translate } = useLocales()
  const {
    name = '',
    phone = '',
    date = [],
    titleJob = [],
    source = [],
    lane = [],
    follower = [],
  } = row

  const [open, setOpen] = useState(true)
  const theme = useTheme()

  const renderData = (listData) => (
    <>
      {listData?.map((data, id) => (
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
          <TextMaxLine
            line={1}
            key={id}
            sx={{ width: 160, fontWeight: 'normal', fontSize: 14 }}
          >
            {data}
          </TextMaxLine>
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

          <Typography
            onClick={handleGetCandidateDetail}
            variant='subtitle1'
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: HOVER_COLOR_DATA,
              },
              fontSize: 16,
            }}
          >
            {name}
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

                  <TableRow>
                    <TableCell>
                      {translate('pages.candidates.source')}
                    </TableCell>
                    <TableCell>{renderData(source)}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.candidates.column')}
                    </TableCell>
                    <TableCell>{renderDataColumn(lane)}</TableCell>
                  </TableRow>

                  {follower.length !== 0 && (
                    <TableRow>
                      <TableCell>
                        {translate('pages.candidates.follower')}
                      </TableCell>
                      <TableCell>{renderData(follower)}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
