import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import CollapsibleTableRow from './CollapsibleTableRow'

export default function CollapsibleTable({ dataSource }) {
  return (
    <TableContainer sx={{ mx: 0.5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((row, index) => (
            <CollapsibleTableRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
