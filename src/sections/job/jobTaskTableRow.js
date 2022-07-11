import { TableCell, TableRow, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import PropTypes from 'prop-types'

// components

JobTaskTableRow.propTypes = {
  row: PropTypes.object,
}
export default function JobTaskTableRow({ row }) {
  const useStyles = makeStyles(() => ({
    activeJob: {
      backgroundColor: '#83F2F2',
      color: '#119696',
      borderRadius: '6px',
      padding: '3px',
    },
  }))
  const classes = useStyles()
  return (
    <TableRow hover>
      <TableCell align='left'>
        <Typography variant='subtitle1'>{row.title}</Typography>
      </TableCell>
      <TableCell align='left' width={160}>
        <Typography variant='subtitle1'>{row?.salary}</Typography>
      </TableCell>
      <TableCell align='left' width={160}>
        <Typography variant='subtitle1'>{row?.candidate}</Typography>
      </TableCell>
      <TableCell align='center'>
        <p className={classes.activeJob}>{row.jobStatus}</p>
      </TableCell>
    </TableRow>
  )
}
