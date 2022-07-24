import {
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material'

import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'

import WeeklyTaskCollapsibleTableRow from './WeeklyTaskCollapsibleTableRow'

WeeklyTaskCollapsibleTable.propTypes = {
  dataSource: PropTypes.array,
  handleGetDetailWeeklyTask: PropTypes.func,
  isLoading: PropTypes.bool,
}

export default function WeeklyTaskCollapsibleTable({
  dataSource = [],
  handleGetDetailWeeklyTask = {},
  isLoading = false,
}) {
  return (
    <Scrollbar sx={{ maxHeight: { lg: '400px', sm: '420px', xs: '500px' } }}>
      {isLoading ? (
        <Stack
          direction='column'
          alignItems='center'
          justifyContent='space-around'
        >
          <Skeleton animation='wave' sx={{ height: 64, width: '85%' }} />
          <Skeleton animation='wave' sx={{ height: 64, width: '85%' }} />
          <Skeleton animation='wave' sx={{ height: 64, width: '85%' }} />
          <Skeleton animation='wave' sx={{ height: 64, width: '85%' }} />
        </Stack>
      ) : (
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
      )}
    </Scrollbar>
  )
}
