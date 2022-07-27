// @mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import JobTaskTableMobileRow from './jobTaskTableMobileRow'

// ----------------------------------------------------------------------

export default function JobTableIsMobile({ dataSource }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((row, index) => (
            <JobTaskTableMobileRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
