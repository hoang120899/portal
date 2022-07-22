// @mui
import { Card, CardHeader } from '@mui/material'

import { format, subMonths } from 'date-fns'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import { FormProvider } from '@/components/hook-form'

import PerformanceDetails from './PerformanceDetails'
import PerformanceTableToolbar from './PerformanceTableToolbar'
import { useGetDataPerformanceQuery } from './performanceSlice'

Performance.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function Performance({ title, subheader, ...other }) {
  const methods = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  })
  const DEFAULT_DATE_START = format(subMonths(Date.now(), 3), 'yyyy-MM-dd')
  const DEFAULT_DATE_END = format(Date.now(), 'yyyy-MM-dd')

  const date = JSON.stringify({
    startDate: DEFAULT_DATE_START,
    endDate: DEFAULT_DATE_END,
  })
  const { handleSubmit } = methods
  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-console
      console.log('data', data)
    } catch (error) {
      // TODO
    }
  }
  const { data } = useGetDataPerformanceQuery(date)
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
