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

import useLocales from '@/hooks/useLocales'

const NetSalaryTable = forwardRef(({ data }, ref) => {
  const tableRef = useRef()
  const { translate } = useLocales()
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
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.gross_salary')}
              </TableCell>
              <TableCell align='right'>
                VND: {gross}(SGD:{gross_VNDToSGD} )
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.social_insurance')} (8 %)
              </TableCell>
              <TableCell align='right'>
                VND: {bhxh}(SGD: {bhxh_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.health_insurance')} (1.5 %)
              </TableCell>
              <TableCell align='right'>
                VND: {bhyt}(SGD: {bhyt_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.unemployment_insurance')} (1 %)
              </TableCell>
              <TableCell align='right'>
                VND: {companyBhtn}(SGD: {companyBhtn_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.taxable_income')}
              </TableCell>
              <TableCell align='right'>
                VND: {tnct}(SGD: {tnct_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.personal_income_tax')}
              </TableCell>
              <TableCell align='right'>
                VND: {tncn}(SGD: {tncn_VNDToSGD})
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.net_salary')}
              </TableCell>
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
