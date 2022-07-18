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

import PropTypes from 'prop-types'

const TotalExpenseTable = ({ data, rateInput }) => {
  const { gross, companyBhxh, companyBhyt, bhtn, pvi, unionTax, total } =
    data || {}

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
                VND: {gross}(SGD: {convertVNDToSGD(gross)})
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Social insurance (17.5%)
              </TableCell>
              <TableCell align='right'>
                VND: {companyBhxh}(SGD: {convertVNDToSGD(companyBhxh)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Health Insurance (3%)
              </TableCell>
              <TableCell align='right'>
                VND: {companyBhyt}(SGD: {convertVNDToSGD(companyBhyt)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                UnEmployment Insurance (1 %)
              </TableCell>
              <TableCell align='right'>
                VND: {bhtn}(SGD: {convertVNDToSGD(bhtn)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Pvi care</TableCell>
              <TableCell align='right'>
                VND: {pvi}(SGD: {convertVNDToSGD(pvi)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Union tax</TableCell>
              <TableCell align='right'>
                VND: {unionTax}(SGD: {convertVNDToSGD(unionTax)})
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Total expense</TableCell>
              <TableCell align='right'>
                VND: {total}(SGD: {convertVNDToSGD(total)})
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  )
}

TotalExpenseTable.propTypes = {
  rateInput: PropTypes.number,
  data: PropTypes.object,
}

export default TotalExpenseTable
