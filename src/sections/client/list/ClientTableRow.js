// @mui
import { Link, TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import Label from '@/components/Label'
import TextMaxLine from '@/components/TextMaxLine'
import { IconButtonAnimate } from '@/components/animate'
// utils
import { fDate } from '@/utils/formatTime'

ClientTableRow.propTypes = {
  row: PropTypes.object,
  handleGetDetailClient: PropTypes.func,
  handleEditClient: PropTypes.func,
  handleDeleteClient: PropTypes.func,
}

export default function ClientTableRow({
  row = {},
  handleGetDetailClient,
  handleEditClient,
  handleDeleteClient,
}) {
  const { name: clientName = '', website = '', createdAt } = row
  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography
          variant='subtitle2'
          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          onClick={handleGetDetailClient}
        >
          <TextMaxLine
            sx={{
              maxWidth: {
                sm: 170,
                md: 200,
                xl: 300,
              },
            }}
          >
            {clientName}
          </TextMaxLine>
        </Typography>
      </TableCell>

      <TableCell align='left'>
        {website && (
          <Link href={website} target='_blank' underline='none'>
            <Label
              color='warning'
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
                whiteSpace: 'inherit',
              }}
            >
              <TextMaxLine
                sx={{
                  maxWidth: {
                    sm: 170,
                    md: 200,
                    xl: 300,
                  },
                }}
                line={1}
              >
                {website}
              </TextMaxLine>
            </Label>
          </Link>
        )}
      </TableCell>

      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        {fDate(createdAt)}
      </TableCell>

      <TableCell align='left'>
        <Tooltip title='Edit' onClick={handleEditClient}>
          <IconButtonAnimate
            sx={{
              p: 1,
              ml: 0.5,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon={'eva:edit-fill'} width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>
        <Tooltip title='Delete' onClick={handleDeleteClient}>
          <IconButtonAnimate
            sx={{
              p: 1,
              ml: 0.5,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon={'eva:trash-fill'} width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}
