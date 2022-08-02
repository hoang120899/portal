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

import PropTypes from 'prop-types'

import Iconify from '@/components/Iconify'
import useLocales from '@/hooks/useLocales'

ListCandidateRow.propTypes = {
  row: PropTypes.object,
  handleClick: PropTypes.func,
  smDown: PropTypes.bool,
}

function ListCandidateRow({ row, handleClick, smDown }) {
  const { name, follower, nameColumn, colorColumn } = row || {}
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleDropdown = () => {
    setIsOpen((prevState) => !prevState)
  }
  const { translate } = useLocales()

  return (
    <>
      <TableRow
        hover
        sx={{
          borderBottom: '1px solid #ebedf3',
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
                marginBottom: '16px',
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
            <Button
              size='small'
              variant='contained'
              sx={{
                width: '80px',
                fontSize: '11px',
                background: colorColumn,
                boxShadow: 'none',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: 'inline-block',
                '&:hover': {
                  backgroundColor: colorColumn,
                },
              }}
            >
              {nameColumn}
            </Button>
          ) : (
            <Button
              variant='contained'
              sx={{
                width: '80px',
                fontSize: '11px',
                boxShadow: 'none',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                display: 'inline-block',
                paddingX: '0px',
              }}
            >
              {translate('pages.jobs.addToBoard')}
            </Button>
          )}
        </TableCell>
      </TableRow>
      {isOpen && smDown && follower.length > 0 && (
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
              <Box
                sx={{
                  marginLeft: '16px !important',
                  lineHeight: 'initial',
                  '& p:not(:last-child)': {
                    marginBottom: '16px',
                  },
                }}
              >
                {follower?.map((item, i) => (
                  <Typography variant='body2' key={`${item}-${i}`}>
                    {item}
                  </Typography>
                ))}
              </Box>
            </Stack>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

export default memo(ListCandidateRow)
