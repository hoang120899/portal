import React, { memo } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import BasicTable from '@/components/BasicTable'
import CopyClipboard from '@/components/CopyClipboard'
import useLocales from '@/hooks/useLocales'
import { pxToRem } from '@/utils/getFontValue'

JobDetailFollower.propTypes = {
  listFollower: PropTypes.array,
  theme: PropTypes.object,
}

const TableRowStyled = styled(TableRow)(({ theme }) => ({
  '& p': {
    fontSize: pxToRem(12),
    color: theme.palette.grey[500],
  },
  '& td': {
    paddingY: 0,
  },
}))

function JobDetailFollower({ listFollower, theme }) {
  return (
    <Card sx={{ height: 'fit-content', marginTop: theme.spacing(2) }}>
      <CardHeader title='Follower' sx={{ textAlign: 'center' }} />
      {!!listFollower?.length && (
        <CardContent sx={{ padding: theme.spacing(0, 0, 3) }}>
          <BasicTable
            dataSource={listFollower}
            columns={[]}
            TableRowComp={(row, index) => (
              <ListFollowerRow key={`${row?.id}-${index}`} row={row} />
            )}
          />
        </CardContent>
      )}
    </Card>
  )
}

const ListFollowerRow = ({ row }) => {
  const { User, urlShort, totalClick, numberCandidate } = row || {}
  const { translate } = useLocales()

  return (
    <>
      <TableRow>
        <TableCell align='left' width='40%'>
          <b>{User?.name}</b>
        </TableCell>

        <TableCell align='left' width='25%'>
          <b>{translate('pages.jobs.click')}</b>
        </TableCell>

        <TableCell align='left' width='25%'>
          <b>{translate('pages.jobs.candidate')}</b>
        </TableCell>
      </TableRow>

      <TableRowStyled>
        <TableCell align='left' width='40%'>
          <CopyClipboard value={urlShort} placement='bottom-start' arrow>
            <Typography variant='body1' sx={{ cursor: 'pointer' }}>
              {urlShort}
            </Typography>
          </CopyClipboard>
        </TableCell>

        <TableCell align='left' width='25%'>
          <Typography variant='body1'>{totalClick}</Typography>
        </TableCell>

        <TableCell align='left' width='25%'>
          <Typography variant='body1'>{numberCandidate}</Typography>
        </TableCell>
      </TableRowStyled>
    </>
  )
}

ListFollowerRow.propTypes = {
  row: PropTypes.object,
}
export default memo(JobDetailFollower)
