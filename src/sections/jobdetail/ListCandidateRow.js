import React, { memo, useState } from 'react'

import {
  Box,
  Button,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import Iconify from '@/components/Iconify'
import useLocales from '@/hooks/useLocales'
import { pxToRem } from '@/utils/getFontValue'

ListCandidateRow.propTypes = {
  row: PropTypes.object,
  handleClick: PropTypes.func,
  smDown: PropTypes.bool,
}

const ActionButtonStyle = styled(Button)(
  ({ ownerState: { colorColumn = '' } = {} }) => ({
    width: '80px',
    fontSize: pxToRem(11),
    boxShadow: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'inline-block',
    ...(colorColumn && {
      background: colorColumn,
      '&:hover': {
        backgroundColor: colorColumn,
      },
    }),
    ...(!colorColumn && {
      paddingX: 0,
    }),
  })
)

const FollowerRowStyle = styled(Box)(({ theme }) => ({
  marginLeft: `${theme.spacing(2)} !important`,
  lineHeight: 'initial',
  '& p:not(:last-child)': {
    marginBottom: theme.spacing(2),
  },
}))

function ListCandidateRow({ row, handleClick, smDown }) {
  const { translate } = useLocales()
  const [isOpen, setIsOpen] = useState(false)
  const { name, follower, nameColumn, colorColumn } = row || {}

  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <TableRow
        hover
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.grey[300]}`,
          cursor: 'pointer',
        }}
        onClick={() => handleClick(row?.id)}
      >
        {smDown && (
          <TableCell>
            <IconButton
              size='small'
              color={'default'}
              onClick={(e) => {
                e.stopPropagation()
                handleToggleDropdown()
              }}
            >
              <Iconify
                icon={
                  isOpen
                    ? 'eva:arrow-ios-upward-fill'
                    : 'eva:arrow-ios-downward-fill'
                }
              />
            </IconButton>
          </TableCell>
        )}

        <TableCell
          align='left'
          width='50%'
          sx={{
            paddingLeft: '0 !important',
          }}
        >
          {name}
        </TableCell>

        {!smDown && (
          <TableCell
            align='left'
            width='40%'
            sx={{
              lineHeight: 'initial',
              paddingX: 0,
              '& p:not(:last-child)': {
                marginBottom: (theme) => theme.spacing(2),
              },
            }}
          >
            {follower?.map((item, i) => (
              <Typography variant='body2' key={`${item}-${i}`}>
                {item}
              </Typography>
            ))}
          </TableCell>
        )}

        <TableCell align='right' width='30%'>
          {nameColumn ? (
            <ActionButtonStyle
              size='small'
              variant='contained'
              ownerState={{ colorColumn }}
            >
              {nameColumn}
            </ActionButtonStyle>
          ) : (
            <ActionButtonStyle variant='contained'>
              {translate('pages.jobs.addToBoard')}
            </ActionButtonStyle>
          )}
        </TableCell>
      </TableRow>

      {isOpen && smDown && !!follower.length && (
        <TableRow
          sx={{
            borderRadius: 1.5,
            boxShadow: (theme) => theme.customShadows.z8,
          }}
        >
          <TableCell align='left' width='50%' colSpan={3}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Typography fontWeight='bold' sx={{ opacity: '0.5' }}>
                {translate('pages.jobs.followers')}:
              </Typography>

              <FollowerRowStyle>
                {follower?.map((item, i) => (
                  <Typography variant='body2' key={`${item}-${i}`}>
                    {item}
                  </Typography>
                ))}
              </FollowerRowStyle>
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export default memo(ListCandidateRow)
