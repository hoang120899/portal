import React from 'react'

// @mui
import { Table, TableBody, TableContainer } from '@mui/material'

import PropTypes from 'prop-types'

// components
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from '@/components/table'
// config
import { defaultPagination } from '@/config'
// hooks
import { emptyRows } from '@/hooks/useTable'

import Scrollbar from './Scrollbar'

BasicTable.propTypes = {
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  isLoading: PropTypes.bool,
  heightEmptyRow: PropTypes.number,
  heightSkeletonRow: PropTypes.number,
  tableStyle: PropTypes.object,
  TableRowComp: PropTypes.func,
}

export default function BasicTable({
  columns = [],
  dataSource = [],
  page = 0,
  rowsPerPage = defaultPagination,
  isLoading = false,
  heightEmptyRow,
  heightSkeletonRow,
  tableStyle = {},
  TableRowComp,
}) {
  const isNotFound = !isLoading && !dataSource.length
  const tableData = React.useMemo(
    () =>
      (isLoading ? [...Array(rowsPerPage)] : dataSource).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [isLoading, rowsPerPage, page, dataSource]
  )

  return (
    <Scrollbar>
      <TableContainer sx={{ position: 'relative', ...tableStyle }}>
        <Table>
          <TableHeadCustom headLabel={columns} />
          <TableBody>
            {tableData.map((row, index) =>
              row && TableRowComp
                ? TableRowComp(row, index)
                : !isNotFound && (
                    <TableSkeleton
                      key={index}
                      columns={columns}
                      height={heightSkeletonRow}
                    />
                  )
            )}
            <TableEmptyRows
              emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              height={heightEmptyRow}
            />
            <TableNoData isNotFound={isNotFound} />
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  )
}
