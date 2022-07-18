import { useEffect, useRef, useState } from 'react'

// @mui
import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import { FormProvider } from '@/components/hook-form'
// hooks
// import useLocales from '@/hooks/useLocales'
import useTable from '@/hooks/useTable'

// import { API_WEEKLY_TASKS } from '@/routes/api'
import WeeklyTaskDetails from './WeeklyTaskDetails'
import WeeklyTaskTableToolbar from './WeeklyTaskTableToolbar'
import { useGetAllWeeklyTasksMutation } from './weeklyTaskSlice'

WeeklyTask.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function WeeklyTask({ title, subheader, ...other }) {
  const [list, setList] = useState([])
  // const { translate } = useLocales()
  const { page, rowsPerPage, setPage } = useTable()

  useEffect(() => {
    setPage(0)
  }, [setPage])

  const test = useRef({
    queries: {
      pageSize: rowsPerPage,
      pageNumber: page + 1,
    },
    body: {
      startDate: '2021-05-31T17:00:00.000Z',
      endDate: '2022-07-19T16:59:59.999Z',
    },
  })

  const [getAllWeeklyTasks, { isLoading }] = useGetAllWeeklyTasksMutation()

  useEffect(() => {
    const getAllTasks = async (test) => {
      const res = await getAllWeeklyTasks(test.current).unwrap()
      const { data } = res
      setList(data?.tasks)
    }
    getAllTasks(test)
  }, [getAllWeeklyTasks, test])

  // console.log(list)

  const methods = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  })
  const {
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = methods
  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-console
      console.log('data', data)
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
      <WeeklyTaskDetails list={list} isLoading={isLoading} />
    </Card>
  )
}
