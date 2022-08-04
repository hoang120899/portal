import React, { useState } from 'react'
import { useEffect } from 'react'

import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

// component
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
// hooks
import useLocales from '@/hooks/useLocales'
// utils
import getColorPresets from '@/utils/getColorPresets'

WeeklyTaskCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
  handleGetDetail: PropTypes.func,
}

function WeeklyTaskCollapsibleTableRow({ row, handleGetDetail }) {
  const { user, content, startDate, endDate } = row
  const { translate } = useLocales()
  const [isOpenDropdown, setIsOpenDropdown] = useState(true)

  const styles = {
    message: {
      fontWeight: 300,
      transition: 'all 0.3s',
      '&:hover': {
        color: `${getColorPresets('yellow').main}`,
      },
    },
    buttonDetail: {
      p: 1,
      border: (theme) => `dashed 1px ${theme.palette.divider}`,
      transition: 'all 0.15s',
      '&:hover': {
        color: `${getColorPresets('yellow').main}`,
      },
    },
  }

  const handleToggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }

  useEffect(() => {
    setIsOpenDropdown(true)
  }, [row])

  return (
    <>
      <TableRow>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size='small'
            color={'default'}
            onClick={handleToggleDropdown}
          >
            <Iconify
              icon={
                isOpenDropdown
                  ? 'eva:arrow-ios-upward-fill'
                  : 'eva:arrow-ios-downward-fill'
              }
            />
          </IconButton>

          <Typography
            variant='subtitle2'
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {user?.name}
          </Typography>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ pl: '16px !important' }}>
          <Collapse in={isOpenDropdown} timeout='auto' unmountOnExit>
            <Paper
              sx={{
                px: 0.5,
                py: 1,
                borderRadius: 1.5,
                boxShadow: (theme) => theme.customShadows.z8,
              }}
            >
              <Table size='small'>
                <TableBody>
                  <TableRow sx={{ verticalAlign: 'top' }}>
                    <TableCell>
                      {translate('pages.dashboard.weeklyTask.team')}
                    </TableCell>
                    <TableCell>
                      <Typography variant='subtitle2'>
                        {user?.nameTeam}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.weeklyTask.time')}
                    </TableCell>
                    <TableCell>{`${startDate} - ${endDate}`}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.weeklyTask.content')}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        noWrap
                        sx={{ width: '150px' }}
                      >
                        {content
                          .reduce((acc, cur) => acc + cur.content + ', ', '')
                          .slice(0, -2)}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      {translate('pages.dashboard.weeklyTask.viewDetail')}
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={translate(
                          'pages.dashboard.weeklyTask.viewDetail'
                        )}
                      >
                        <IconButtonAnimate
                          sx={styles.buttonDetail}
                          onClick={() => handleGetDetail(row)}
                        >
                          <Iconify
                            icon={'eva:eye-fill'}
                            width={20}
                            height={20}
                          />
                        </IconButtonAnimate>
                      </Tooltip>
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

export default WeeklyTaskCollapsibleTableRow
