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

const TotalExpenseTable = forwardRef(({ data }, ref) => {
  const { translate } = useLocales()
  const tableRef = useRef()
  const {
    gross,
    gross_VNDToSGD,
    companyBhxh,
    companyBhxh_VNDToSGD,
    companyBhyt,
    companyBhyt_VNDToSGD,
    bhtn,
    bhtn_VNDToSGD,
    pvi,
    pvi_VNDToSGD,
    unionTax,
    unionTax_VNDToSGD,
    total,
    total_VNDToSGD,
  } = data || {}
  useImperativeHandle(ref, () => tableRef.current)
  return (
    <Paper>
      <TableContainer sx={{ paddingTop: 3 }}>
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.gross_salary') || 'GROSS Salary'}
              </TableCell>
              <TableCell align='right'>
                VND: {gross}(SGD:{gross_VNDToSGD})
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.social_insurance') ||
                  'Social insurance'}{' '}
                (17.5%)
              </TableCell>
              <TableCell align='right'>
                VND: {companyBhxh}(SGD: {companyBhxh_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.health_insurance') ||
                  'Health Insurance'}{' '}
                (3%)
              </TableCell>
              <TableCell align='right'>
                VND: {companyBhyt}(SGD: {companyBhyt_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.unemployment_insurance') ||
                  'UnEmployment Insurance'}{' '}
                (1 %)
              </TableCell>
              <TableCell align='right'>
                VND: {bhtn}(SGD: {bhtn_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.pvi_care') || 'Pvi care'}
              </TableCell>
              <TableCell align='right'>
                VND: {pvi}(SGD: {pvi_VNDToSGD})
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.union_tax') || 'Union tax'}
              </TableCell>
              <TableCell align='right'>
                VND: {unionTax}(SGD: {unionTax_VNDToSGD})
              </TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>
                {translate('pages.calculator.total_expense') || 'Total expense'}
              </TableCell>
              <TableCell align='right'>
                VND: {total}(SGD: {total_VNDToSGD})
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Paper>
  )
})

TotalExpenseTable.propTypes = {
  rateInput: PropTypes.number,
  data: PropTypes.object,
}

export default TotalExpenseTable
