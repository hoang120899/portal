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

const NetSalaryTable = ({ data, rateInput }) => {
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
                VND: {data.gross}(SGD:{convertVNDToSGD(data.gross)} )
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Social insurance (8 %)
              </TableCell>
              <TableCell align='right'>
                VND: {data.bhxh}(SGD: {convertVNDToSGD(data.bhxh)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Health Insurance (1.5 %)
              </TableCell>
              <TableCell align='right'>
                VND: {data.bhyt}(SGD: {convertVNDToSGD(data.bhyt)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                UnEmployment Insurance (1 %)
              </TableCell>
              <TableCell align='right'>
                VND: {data.companyBhtn}(SGD: {convertVNDToSGD(data.companyBhtn)}
                )
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Taxable Income</TableCell>
              <TableCell align='right'>
                VND: {data.tnct}(SGD: {convertVNDToSGD(data.tnct)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Personal income tax
              </TableCell>
              <TableCell align='right'>
                VND: {data.tncn}(SGD: {convertVNDToSGD(data.tncn)})
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Net salary</TableCell>
              <TableCell align='right'>
                VND: {data.net}(SGD: {convertVNDToSGD(data.net)})
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default NetSalaryTable
