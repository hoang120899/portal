import React, { forwardRef, useImperativeHandle, useRef } from 'react'

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

const NetSalaryTable = forwardRef(({ data }, ref) => {
  const tableRef = useRef()
  const {
    gross,
    gross_VNDToSGD,
    bhxh,
    bhxh_VNDToSGD,
    bhyt,
    bhyt_VNDToSGD,
    companyBhtn,
    companyBhtn_VNDToSGD,
    tnct,
    tnct_VNDToSGD,
    tncn,
    tncn_VNDToSGD,
    net,
    net_VNDToSGD,
  } = data || {}

  useImperativeHandle(ref, () => tableRef.current)
  return (
    <Paper>
      <TableContainer sx={{ paddingTop: 3 }}>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>GROSS Salary</TableCell>
              <TableCell align='right'>
                VND: {gross}(SGD:{gross_VNDToSGD} )
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Social insurance (8 %)
              </TableCell>
              <TableCell align='right'>
                VND: {bhxh}(SGD: {bhxh_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Health Insurance (1.5 %)
              </TableCell>
              <TableCell align='right'>
                VND: {bhyt}(SGD: {bhyt_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                UnEmployment Insurance (1 %)
              </TableCell>
              <TableCell align='right'>
                VND: {companyBhtn}(SGD: {companyBhtn_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Taxable Income</TableCell>
              <TableCell align='right'>
                VND: {tnct}(SGD: {tnct_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                Personal income tax
              </TableCell>
              <TableCell align='right'>
                VND: {tncn}(SGD: {tncn_VNDToSGD})
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Net salary</TableCell>
              <TableCell align='right'>
                VND: {net}(SGD: {net_VNDToSGD})
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  )
})

NetSalaryTable.propTypes = {
  rateInput: PropTypes.number,
  data: PropTypes.object,
}

export default NetSalaryTable
