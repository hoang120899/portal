import React from 'react'

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const TotalExpenseTable = ({ data }) => (
    <Paper>
      <TableContainer sx={{ paddingTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>GROSS Salary</TableCell>
              <TableCell align='right'>VND: {data.gross}(SGD: 7)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Social insurance (17.5%)
              </TableCell>
              <TableCell align='right'>
                VND: {data.companyBhxh}(SGD: 7)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Health Insurance (3%)
              </TableCell>
              <TableCell align='right'>
                VND: {data.companyBhyt}(SGD: 7)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                UnEmployment Insurance (1 %)
              </TableCell>
              <TableCell align='right'>VND: {data.bhtn}(SGD: 7)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Pvi care</TableCell>
              <TableCell align='right'>VND: {data.pvi}(SGD: 7)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Union tax</TableCell>
              <TableCell align='right'>VND: {data.unionTax}(SGD: 7)</TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Total expense</TableCell>
              <TableCell align='right'>VND: {data.total}(SGD: 7)</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  )

export default TotalExpenseTable
