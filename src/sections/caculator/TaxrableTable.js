import React, { forwardRef, useImperativeHandle, useRef } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

import useLocales from '@/hooks/useLocales'

const TaxrableTable = forwardRef(({ data }, ref) => {
  const tableTaxRef = useRef()
  const { translate } = useLocales()
  const {
    percent5,
    percent10,
    percent15,
    percent20,
    percent25,
    percent30,
    percent35,
  } = data || {}
  useImperativeHandle(ref, () => tableTaxRef.current)
  return (
    <TableContainer sx={{ paddingTop: 3 }}>
      <Table ref={tableTaxRef}>
        <TableHead>
          <TableCell>{translate('pages.calculator.taxable_rate')}</TableCell>
          <TableCell>{translate('pages.calculator.tax')}</TableCell>
          <TableCell>{translate('pages.calculator.money')}</TableCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>
                {translate('pages.calculator.detail_taxable_rate1')}
                Up to 5 million VND
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>5%</Typography>
            </TableCell>
            <TableCell>
              <Typography>{percent5}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                {translate('pages.calculator.detail_taxable_rate2')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>10%</Typography>
            </TableCell>
            <TableCell>
              <Typography>{percent10}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                {translate('pages.calculator.detail_taxable_rate3')}
                From over 10 million VND to 18 million VND
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>15%</Typography>
            </TableCell>
            <TableCell>
              <Typography>{percent15}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                {translate('pages.calculator.detail_taxable_rate4')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>20%</Typography>
            </TableCell>
            <TableCell>
              <Typography>{percent20}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                {translate('pages.calculator.detail_taxable_rate5')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>25%</Typography>
            </TableCell>
            <TableCell>
              <Typography>{percent25}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                {translate('pages.calculator.detail_taxable_rate6')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>30%</Typography>
            </TableCell>
            <TableCell>
              <Typography>{percent30}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>
                {translate('pages.calculator.detail_taxable_rate7')}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>35%</Typography>
            </TableCell>
            <TableCell>
              <Typography>{percent35}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
})

TaxrableTable.propTypes = {
  data: PropTypes.shape({
    percent5: PropTypes.string,
    percent10: PropTypes.any,
    percent15: PropTypes.string,
    percent20: PropTypes.string,
    percent25: PropTypes.string,
    percent30: PropTypes.string,
    percent35: PropTypes.string,
  }),
}

export default TaxrableTable
