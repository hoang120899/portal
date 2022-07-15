// @mui
import { Table, TableBody, TableContainer } from '@mui/material'

import JobsMobileRow from './JobsMobileRow'

// ----------------------------------------------------------------------

export default function ActiveJobMobile({ dataSource }) {
  return (
    <TableContainer sx={{ mx: 0.5 }}>
      <Table>
        <TableBody>
          {dataSource.map((row, index) => (
            <JobsMobileRow key={`${row?.id}-${index}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
