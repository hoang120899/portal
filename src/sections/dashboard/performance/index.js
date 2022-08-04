import { useReducer } from 'react'

// @mui
import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import { FormProvider } from '@/components/hook-form'
import { DATE_YEAR_MONTH_DAY_FORMAT } from '@/config'
import useRole from '@/hooks/useRole'
import { fDate, fDateSubMonths } from '@/utils/formatTime'

import PerformanceDetails from './PerformanceDetails'
import PerformanceTableToolbar from './PerformanceTableToolbar'
import { FORM_FIELDS, SUB_MONTH_DEFAULT } from './config'
import { useGetDataPerformanceQuery } from './performanceSlice'

Performance.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

const defaultValues = {
  [FORM_FIELDS.START_DATE]: fDateSubMonths(new Date(), SUB_MONTH_DEFAULT),
  [FORM_FIELDS.END_DATE]: new Date(),
}

function reducer(state, action) {
  const { type, payload = {} } = action
  switch (type) {
    case 'search':
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error()
  }
}

export default function Performance({ title, subheader, ...other }) {
  const { currentRole } = useRole()
  const [searchFormValues, dispatch] = useReducer(reducer, defaultValues)
  const { startDate, endDate } = searchFormValues

  const methods = useForm({
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = async (data) => {
    try {
      dispatch({
        type: 'search',
        payload: data,
      })
    } catch (error) {
      // TODO
    }
  }

  const { data } = useGetDataPerformanceQuery({
    currentRole,
    body: {
      [FORM_FIELDS.START_DATE]: fDate(startDate, DATE_YEAR_MONTH_DAY_FORMAT),
      [FORM_FIELDS.END_DATE]: fDate(endDate, DATE_YEAR_MONTH_DAY_FORMAT),
    },
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
