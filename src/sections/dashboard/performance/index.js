// @mui
import { useState } from 'react'

import { Card, CardHeader } from '@mui/material'

import { format, parseISO } from 'date-fns'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import { FormProvider } from '@/components/hook-form'
import { ISO_DATE_CONDITION } from '@/config'
import useRole from '@/hooks/useRole'

import PerformanceDetails from './PerformanceDetails'
import PerformanceTableToolbar from './PerformanceTableToolbar'
import { DEFAULT_DATE_END, DEFAULT_DATE_START } from './config'
import { useGetDataPerformanceQuery } from './performanceSlice'

Performance.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function Performance({ title, subheader, ...other }) {
  const [date, setDate] = useState({
    startDate: DEFAULT_DATE_START,
    endDate: DEFAULT_DATE_END,
  })
  const { currentRole } = useRole()
  const methods = useForm({
    defaultValues: { ...date },
  })

  const { handleSubmit } = methods

  const onSubmit = async (data) => {
    if (ISO_DATE_CONDITION.test(data.startDate)) {
      data.startDate = parseISO(data.startDate)
    }
    if (ISO_DATE_CONDITION.test(data.endDate)) {
      data.endDate = parseISO(data.endDate)
    }
    try {
      const date = {
        startDate: format(data.startDate, 'yyyy-MM-dd'),
        endDate: format(data.endDate, 'yyyy-MM-dd'),
      }
      setDate({ ...date })
    } catch (error) {
      //
    }
  }

  const { data } = useGetDataPerformanceQuery({
    currentRole,
    body: { ...date },
  })
  const list = data?.data?.list

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <PerformanceTableToolbar />
      </FormProvider>
      {list && <PerformanceDetails list={list} />}
    </Card>
  )
}
