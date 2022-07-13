// @mui
import { TextField } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'

import PropTypes from 'prop-types'
// form
import { Controller, useFormContext } from 'react-hook-form'

// config
import { DATETIME_FORMAT_AMPM } from '@/config'

RHFDateTimePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  DateTimePickerProps: PropTypes.object,
}

export default function RHFDateTimePicker({
  name,
  label,
  DateTimePickerProps,
  ...other
}) {
  const { control } = useFormContext()
  const props = {
    inputFormat: DATETIME_FORMAT_AMPM,
    componentsProps: {
      actionBar: { actions: ['clear', 'today'] },
    },
    ...DateTimePickerProps,
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          error={!!error}
          label={label}
          {...props}
          helperText={error?.message}
          renderInput={(params) => (
            <TextField {...params} fullWidth {...other} />
          )}
        />
      )}
    />
  )
}
