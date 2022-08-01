import React, { memo } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

import BasicTable from '@/components/BasicTable'
import CopyClipboard from '@/components/CopyClipboard'
import useLocales from '@/hooks/useLocales'

JobDetailFollower.propTypes = {
  listFollower: PropTypes.array,
}

function JobDetailFollower({ listFollower }) {
  return (
    <Card sx={{ height: 'fit-content', marginTop: '1rem' }}>
      <CardHeader title='Follower' sx={{ textAlign: 'center' }} />
      {listFollower?.length > 0 && (
        <CardContent sx={{ padding: '0 0 24px' }}>
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
          <b>{translate('pages.jobDetail.click')}</b>
        </TableCell>
        <TableCell align='left' width='25%'>
          <b>{translate('pages.jobDetail.candidate')}</b>
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          '& p': {
            fontSize: '12px',
            color: '#B5B5C3',
          },
          '& td': {
            paddingY: 0,
          },
        }}
      >
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
      </TableRow>
    </>
  )
}
ListFollowerRow.propTypes = {
  row: PropTypes.object,
}
export default memo(JobDetailFollower)
