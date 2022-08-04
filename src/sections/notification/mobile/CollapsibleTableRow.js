import React, { useState } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/router'

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
import { PATH_DASHBOARD } from '@/routes/paths'
// utils
import { fDate } from '@/utils/formatTime'
import getColorPresets from '@/utils/getColorPresets'

CollapsibleTableRow.propTypes = {
  row: PropTypes.object,
}
function CollapsibleTableRow({ row }) {
  const { User, content, createdAt } = row
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
      ml: 0.5,
      border: (theme) => `dashed 1px ${theme.palette.divider}`,
      transition: 'all 0.15s',
      '&:hover': {
        color: `${getColorPresets('yellow').main}`,
      },
    },
  }

  const router = useRouter()
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
            {User?.name}
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
                    <TableCell>{translate('Message')}</TableCell>
                    <TableCell sx={{ width: 644 }}>
                      <Typography
                        variant='body2'
                        sx={styles.message}
                        onClick={() =>
                          router.push(PATH_DASHBOARD.board.view(content?.id))
                        }
                      >
                        {content?.message} <strong>{content?.title}</strong>
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{translate('Time')}</TableCell>
                    <TableCell>{fDate(createdAt)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>{translate('View Detail')}</TableCell>
                    <TableCell>
                      <Tooltip title='Detail'>
                        <IconButtonAnimate sx={styles.buttonDetail}>
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

export default CollapsibleTableRow
