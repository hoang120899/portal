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

const TotalExpenseTable = ({ data, rateInput }) => {
  const convertVNDToSGD = (money) => {
    const convert = Number(money?.replaceAll(',', '')) / rateInput
    return convert.toFixed(0)
  }
  return (
    <Paper>
      <TableContainer sx={{ paddingTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>GROSS Salary</TableCell>
              <TableCell align='right'>
                VND: {data.gross}(SGD: {convertVNDToSGD(data.gross)})
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Social insurance (17.5%)
              </TableCell>
              <TableCell align='right'>
                VND: {data.companyBhxh}(SGD: {convertVNDToSGD(data.companyBhxh)}
                )
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Health Insurance (3%)
              </TableCell>
              <TableCell align='right'>
                VND: {data.companyBhyt}(SGD: {convertVNDToSGD(data.companyBhyt)}
                )
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                UnEmployment Insurance (1 %)
              </TableCell>
              <TableCell align='right'>
                VND: {data.bhtn}(SGD: {convertVNDToSGD(data.bhtn)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Pvi care</TableCell>
              <TableCell align='right'>
                VND: {data.pvi}(SGD: {convertVNDToSGD(data.pvi)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Union tax</TableCell>
              <TableCell align='right'>
                VND: {data.unionTax}(SGD: {convertVNDToSGD(data.unionTax)})
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Total expense</TableCell>
              <TableCell align='right'>
                VND: {data.total}(SGD: {convertVNDToSGD(data.total)})
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TotalExpenseTable
