import { Table, TableBody, TableContainer } from '@mui/material'

import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'

import WeeklyTaskCollapsibleTableRow from './WeeklyTaskCollapsibleTableRow'

WeeklyTaskCollapsibleTable.propTypes = {
  dataSource: PropTypes.array,
  handleGetDetailWeeklyTask: PropTypes.func,
}

export default function WeeklyTaskCollapsibleTable({
  dataSource = [],
  handleGetDetailWeeklyTask = {},
}) {
  return (
    <Scrollbar sx={{ maxHeight: { lg: '400px', sm: '420px', xs: '500px' } }}>
      <TableContainer>
        <Table>
          <TableBody>
            {dataSource?.map((row) => (
              <WeeklyTaskCollapsibleTableRow
                key={row?.id}
                row={row}
                handleGetDetail={handleGetDetailWeeklyTask}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  )
}
