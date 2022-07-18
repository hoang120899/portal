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

const NetSalaryTable = ({ data, rateInput }) => {
  const { gross, bhxh, bhyt, companyBhtn, tnct, tncn, net } = data || {}

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
                VND: {gross}(SGD:{convertVNDToSGD(gross)} )
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Social insurance (8 %)
              </TableCell>
              <TableCell align='right'>
                VND: {bhxh}(SGD: {convertVNDToSGD(bhxh)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Health Insurance (1.5 %)
              </TableCell>
              <TableCell align='right'>
                VND: {bhyt}(SGD: {convertVNDToSGD(bhyt)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                UnEmployment Insurance (1 %)
              </TableCell>
              <TableCell align='right'>
                VND: {companyBhtn}(SGD: {convertVNDToSGD(companyBhtn)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Taxable Income</TableCell>
              <TableCell align='right'>
                VND: {tnct}(SGD: {convertVNDToSGD(tnct)})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Personal income tax
              </TableCell>
              <TableCell align='right'>
                VND: {tncn}(SGD: {convertVNDToSGD(tncn)})
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Net salary</TableCell>
              <TableCell align='right'>
                VND: {net}(SGD: {convertVNDToSGD(net)})
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  )
}

NetSalaryTable.propTypes = {
  rateInput: PropTypes.number,
  data: PropTypes.object,
}

export default NetSalaryTable
