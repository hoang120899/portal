import React from 'react'

// @mui
import { Table, TableBody, TableContainer } from '@mui/material'
import { styled } from '@mui/material/styles'

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

const TableContainerStyle = styled(TableContainer)(({ theme, ownerState }) => ({
  position: 'relative',
  padding: `0 ${theme.spacing(2)}`,
  ...ownerState,
}))

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
    () => (isLoading ? [...Array(rowsPerPage)] : dataSource),
    [isLoading, rowsPerPage, dataSource]
  )
  return (
    <Scrollbar>
      <TableContainerStyle ownerState={tableStyle}>
        <Table>
          {columns.length > 0 && <TableHeadCustom headLabel={columns} />}
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
      </TableContainerStyle>
    </Scrollbar>
  )
}
