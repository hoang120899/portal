import { useEffect, useRef, useState } from 'react'

// @mui
import { Card, CardHeader } from '@mui/material'

import { endOfWeek, startOfWeek } from 'date-fns'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import EmptyContent from '@/components/EmptyContent'
import { FormProvider } from '@/components/hook-form'
// hooks
import useLocales from '@/hooks/useLocales'
import useTable from '@/hooks/useTable'

import WeeklyTaskDetailModal from './WeeklyTaskDetailModal'
import WeeklyTaskDetails from './WeeklyTaskDetails'
import WeeklyTaskEditModal from './WeeklyTaskEditModal'
import WeeklyTaskTableToolbar from './WeeklyTaskTableToolbar'
import { useGetAllWeeklyTasksMutation } from './weeklyTaskSlice'

WeeklyTask.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

const defaultValues = {
  startDate: startOfWeek(new Date()),
  endDate: endOfWeek(new Date()),
}

const HANDLE_TYPE = {
  DETAIL: 'detail',
  EDIT: 'edit',
  ADD: 'add',
}

export default function WeeklyTask({ title, subheader, ...other }) {
  const [list, setList] = useState([])
  const { translate } = useLocales()
  const { page, rowsPerPage, setPage } = useTable()

  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [handleType, setHandleType] = useState('')
  const [chosenTask, setChosenTask] = useState({})
  const [isOpenEdit, setIsOpenEdit] = useState(false)

  const handleGetDetailWeeklyTask = (row) => {
    setIsOpenDetail(true)
    setHandleType(HANDLE_TYPE.DETAIL)
    setChosenTask(row)
  }

  const handleCloseDetailModal = () => {
    setIsOpenDetail(false)
  }

  const handleOpenEditModal = () => {
    setIsOpenEdit(true)
    setIsOpenDetail(false)
  }

  const handleCloseEditModal = () => {
    setIsOpenEdit(false)
  }

  useEffect(() => {
    setPage(0)
  }, [setPage])

  const payload = useRef({
    queries: {
      pageSize: rowsPerPage,
      pageNumber: page + 1,
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
  }, [getAllWeeklyTasks, payload, chosenTask])

  const methods = useForm({
    defaultValues,
  })

  const {
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      payload.current = {
        ...payload.current,
        body: {
          startDate: data
            ? new Date(data?.startDate).toISOString()
            : defaultValues.startDate,
          endDate: data
            ? new Date(data?.endDate).toISOString()
            : defaultValues.endDate,
        },
      }
      const res = await getAllWeeklyTasks(payload.current).unwrap()
      const { data: dataTasks } = res
      setList(dataTasks?.tasks)
    } catch (error) {
      // TODO
    }
  }

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WeeklyTaskTableToolbar />
      </FormProvider>
      {list.length > 0 ? (
        <WeeklyTaskDetails
          list={list}
          isLoading={isLoading}
          handleGetDetailWeeklyTask={handleGetDetailWeeklyTask}
        />
      ) : (
        <EmptyContent
          title={translate('No Data')}
          sx={{
            height: 'auto',
            '& span.MuiBox-root': { height: 'auto' },
          }}
        />
      )}
      <WeeklyTaskDetailModal
        isOpen={isOpenDetail}
        handleType={handleType}
        onClose={handleCloseDetailModal}
        task={chosenTask}
        handleOpenEdit={handleOpenEditModal}
      />
      {isOpenEdit && (
        <WeeklyTaskEditModal
          isOpen={isOpenEdit}
          onClose={handleCloseEditModal}
          task={chosenTask}
          setChosenTask={setChosenTask}
        />
      )}
    </Card>
  )
}
