import { useState } from 'react'

// @mui
import {
  Collapse,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import Label from '@/components/Label'
import TextMaxLine from '@/components/TextMaxLine'
import { IconButtonAnimate } from '@/components/animate'
// hooks
import useLocales from '@/hooks/useLocales'

ClientCollapsibleTableRow.propTypes = {
  row: PropTypes.object,
  handleGetDetailClient: PropTypes.func,
  handleEditClient: PropTypes.func,
  handleDeleteClient: PropTypes.func,
}

export default function ClientCollapsibleTableRow({
  row,
  handleGetDetailClient,
  handleEditClient,
  handleDeleteClient,
}) {
  const { translate } = useLocales()
  const { name: clientName = '', website = '' } = row

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
            onClick={handleGetDetailClient}
            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
          >
            {clientName}
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
                    <TableCell>{translate('Website')}</TableCell>
                    <TableCell>
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
                            <TextMaxLine sx={{ maxWidth: 130 }} line={1}>
                              {website}
                            </TextMaxLine>
                          </Label>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>{translate('Action')}</TableCell>
                    <TableCell>
                      <>
                        <Tooltip
                          title={translate('Edit')}
                          onClick={handleEditClient}
                        >
                          <IconButtonAnimate
                            sx={{
                              p: 1,
                              ml: 0.5,
                              border: (theme) =>
                                `dashed 1px ${theme.palette.divider}`,
                            }}
                          >
                            <Iconify
                              icon={'eva:edit-fill'}
                              width={20}
                              height={20}
                            />
                          </IconButtonAnimate>
                        </Tooltip>
                        <Tooltip
                          title={translate('Delete')}
                          onClick={handleDeleteClient}
                        >
                          <IconButtonAnimate
                            sx={{
                              p: 1,
                              ml: 0.5,
                              border: (theme) =>
                                `dashed 1px ${theme.palette.divider}`,
                            }}
                          >
                            <Iconify
                              icon={'eva:trash-fill'}
                              width={20}
                              height={20}
                            />
                          </IconButtonAnimate>
                        </Tooltip>
                      </>
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
