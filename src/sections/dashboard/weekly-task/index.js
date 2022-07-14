// @mui
import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import { FormProvider } from '@/components/hook-form'

import WeeklyTaskDetails from './WeeklyTaskDetails'
import WeeklyTaskTableToolbar from './WeeklyTaskTableToolbar'

WeeklyTask.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function WeeklyTask({ title, subheader, ...other }) {
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
  const list = [...Array(5).keys()].map((value, index) => ({
    avatar: `https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_${
      index + 1
    }.jpg`,
    name: `Name ${index + 1}`,
    email: `Email${index}@gmail.com`,
  }))

  return (
    <Card {...other} sx={{ height: 560 }}>
      <CardHeader title={title} subheader={subheader} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <WeeklyTaskTableToolbar />
      </FormProvider>
      <WeeklyTaskDetails list={list} />
    </Card>
  )
}
