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
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import useLocales from '@/hooks/useLocales'

const TableCellStyle = styled(TableCell)(({ isBoldWeight = false }) => ({
  fontWeight: isBoldWeight ? 'bold' : 'normal',
  verticalAlign: 'top',
}))

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
              <TableCellStyle isBoldWeight>
                {translate('pages.calculator.gross_salary')}
              </TableCellStyle>
              <TableCellStyle align='right'>
                VND: {gross}(SGD:{gross_VNDToSGD})
              </TableCellStyle>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCellStyle isBoldWeight>
                {translate('pages.calculator.social_insurance')} (17.5%)
              </TableCellStyle>
              <TableCellStyle align='right'>
                VND: {companyBhxh}(SGD: {companyBhxh_VNDToSGD})
              </TableCellStyle>
            </TableRow>

            <TableRow>
              <TableCellStyle isBoldWeight>
                {translate('pages.calculator.health_insurance')} (3%)
              </TableCellStyle>
              <TableCellStyle align='right'>
                VND: {companyBhyt}(SGD: {companyBhyt_VNDToSGD})
              </TableCellStyle>
            </TableRow>

            <TableRow>
              <TableCellStyle isBoldWeight>
                {translate('pages.calculator.unemployment_insurance')} (1 %)
              </TableCellStyle>
              <TableCellStyle align='right'>
                VND: {bhtn}(SGD: {bhtn_VNDToSGD})
              </TableCellStyle>
            </TableRow>

            <TableRow>
              <TableCellStyle isBoldWeight>
                {translate('pages.calculator.pvi_care')}
              </TableCellStyle>
              <TableCellStyle align='right'>
                VND: {pvi}(SGD: {pvi_VNDToSGD})
              </TableCellStyle>
            </TableRow>

            <TableRow>
              <TableCellStyle isBoldWeight>
                {translate('pages.calculator.union_tax')}
              </TableCellStyle>
              <TableCellStyle align='right'>
                VND: {unionTax}(SGD: {unionTax_VNDToSGD})
              </TableCellStyle>
            </TableRow>
          </TableBody>

          <TableHead>
            <TableRow>
              <TableCellStyle isBoldWeight>
                {translate('pages.calculator.total_expense')}
              </TableCellStyle>
              <TableCellStyle align='right'>
                VND: {total}(SGD: {total_VNDToSGD})
              </TableCellStyle>
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
