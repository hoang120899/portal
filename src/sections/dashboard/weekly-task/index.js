import { useEffect, useRef, useState } from 'react'

// @mui
import { Box, Button, Card, CardHeader, Stack } from '@mui/material'

import { endOfWeek, startOfWeek } from 'date-fns'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import EmptyContent from '@/components/EmptyContent'
import { FormProvider } from '@/components/hook-form'
import { DASHBOARD_TABLE_HEIGHT } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
import useTable from '@/hooks/useTable'

import WeeklyTaskCollapsibleTable from './WeeklyTaskCollapsibleTable'
import WeeklyTaskDetailModal from './WeeklyTaskDetailModal'
import WeeklyTaskDetails from './WeeklyTaskDetails'
import WeeklyTaskModal from './WeeklyTaskModal'
import WeeklyTaskTableToolbar from './WeeklyTaskTableToolbar'
import { HANDLE_TYPE } from './config'
import { useGetAllWeeklyTasksMutation } from './weeklyTaskSlice'

WeeklyTask.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

const defaultValues = {
  startDate: startOfWeek(new Date()),
  endDate: endOfWeek(new Date()),
}

export default function WeeklyTask({ title, subheader, ...other }) {
  const isMedium = useResponsive('down', 'md')
  const isLarge = useResponsive('between', '', 'lg', 'xl')
  const { enqueueSnackbar } = useSnackbar()
  const [list, setList] = useState([])
  const { translate } = useLocales()
  const { page, rowsPerPage, setPage } = useTable()
  const { currentRole, isLeaderRole } = useRole()

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [handleType, setHandleType] = useState('')
  const [chosenTask, setChosenTask] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [isReloading, setIsReloading] = useState(false)

  const headerRef = useRef(null)
  const tableToolbarRef = useRef(null)

  const handleGetDetailWeeklyTask = (row) => {
    setIsOpenDetail(true)
    setChosenTask(row)
  }

  const handleCloseDetailModal = () => {
    setIsOpenDetail(false)
  }

  const handleOpenEditModal = () => {
    setIsOpen(true)
    setHandleType(HANDLE_TYPE.EDIT)
    setIsOpenDetail(false)
  }

  const handleCloseEditModal = () => {
    setIsOpen(false)
  }

  const handleOpenAddModal = () => {
    setIsOpen(true)
    setHandleType(HANDLE_TYPE.ADD)
    setChosenTask({})
  }

  useEffect(() => {
    setPage(0)
  }, [setPage])

  const payload = useRef({
    queries: {
      pageSize: rowsPerPage,
      pageNumber: page + 1,
      currentRole,
    },
    body: defaultValues,
  })

  const [getAllWeeklyTasks, { isLoading }] = useGetAllWeeklyTasksMutation()

  useEffect(() => {
    const getAllTasks = async (payload) => {
      const res = await getAllWeeklyTasks(payload.current).unwrap()
      const { data } = res
      setList(data?.tasks)
    }
    getAllTasks(payload)
  }, [getAllWeeklyTasks, payload, isReloading])

  const methods = useForm({
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (data) => {
    try {
      const { startDate, endDate } = data
      payload.current = {
        ...payload.current,
        body: {
          startDate: data ? new Date(startDate) : defaultValues.startDate,
          endDate: data ? new Date(endDate) : defaultValues.endDate,
        },
      }
      const res = await getAllWeeklyTasks(payload.current).unwrap()
      const { data: dataTasks } = res
      setList(dataTasks?.tasks)
    } catch (error) {
      enqueueSnackbar(translate('Get weekly tasks failed!'), {
        variant: 'error',
      })
    }
  }

  const headerHeight = headerRef.current?.offsetHeight || 0
  const tableToolbarHeight = tableToolbarRef.current?.offsetHeight || 0
  const listTaskTableHeight =
    DASHBOARD_TABLE_HEIGHT - headerHeight - tableToolbarHeight - 20

  return (
    <Card {...other}>
      <Stack
        ref={headerRef}
        direction='row'
        alignItems='flex-end'
        justifyContent='space-between'
      >
        <Box>
          <CardHeader title={title} subheader={subheader} />
        </Box>

        {isLeaderRole && (
          <Box sx={{ pr: 3 }}>
            <Button
              type='submit'
              variant='contained'
              onClick={handleOpenAddModal}
            >
              {translate(`pages.dashboard.weeklyTask.newTask`)}
            </Button>
          </Box>
        )}
      </Stack>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WeeklyTaskTableToolbar ref={tableToolbarRef} />
      </FormProvider>

      {list.length > 0 ? (
        isMedium || isLarge ? (
          <WeeklyTaskCollapsibleTable
            dataSource={list}
            isLoading={isLoading}
            handleGetDetailWeeklyTask={handleGetDetailWeeklyTask}
            height={listTaskTableHeight}
          />
        ) : (
          <WeeklyTaskDetails
            list={list}
            isLoading={isLoading}
            handleGetDetailWeeklyTask={handleGetDetailWeeklyTask}
            height={listTaskTableHeight}
          />
        )
      ) : (
        <EmptyContent
          title={translate('pages.dashboard.weeklyTask.noData')}
          sx={{
            height: 'auto',
            '& span.MuiBox-root': { height: 'auto' },
          }}
        />
      )}

      <WeeklyTaskDetailModal
        isOpen={isOpenDetail}
        onClose={handleCloseDetailModal}
        task={chosenTask}
        handleOpenEdit={handleOpenEditModal}
      />

      {isOpen && (
        <WeeklyTaskModal
          isOpen={isOpen}
          handleType={handleType}
          onClose={handleCloseEditModal}
          task={chosenTask}
          setIsReloading={setIsReloading}
          isReloading={isReloading}
        />
      )}
    </Card>
  )
}
