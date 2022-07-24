// @mui
import { useState } from 'react'

import { Card, CardHeader } from '@mui/material'

import { format, parseISO } from 'date-fns'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import { FormProvider } from '@/components/hook-form'

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
  const methods = useForm({
    defaultValues: { ...date },
  })

  const { handleSubmit } = methods

  const onSubmit = async (data) => {
    if (/\d{4}-\d{2}-\d{2}/.test(data.startDate)) {
      data.startDate = parseISO(data.startDate)
    }
    if (/\d{4}-\d{2}-\d{2}/.test(data.endDate)) {
      data.endDate = parseISO(data.endDate)
    }
    try {
      const date = {
        startDate: format(data.startDate, 'yyyy-MM-dd'),
        endDate: format(data.endDate, 'yyyy-MM-dd'),
      }
      setDate({ ...date })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('catch ', data)
    }
  }

  const { data } = useGetDataPerformanceQuery({ ...date })

  const list = data?.data?.list

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <PerformanceTableToolbar />
      </FormProvider>
      {list ? <PerformanceDetails list={list} /> : null}
    </Card>
  )
}
