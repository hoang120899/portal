// @mui
import { FormControlLabel, Switch } from '@mui/material'

import PropTypes from 'prop-types'
// form
import { Controller, useFormContext } from 'react-hook-form'

RHFSwitch.propTypes = {
  name: PropTypes.string,
}

export default function RHFSwitch({ name, disabled = false, ...other }) {
  const { control } = useFormContext()

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Switch disabled={disabled} {...field} checked={field.value} />
          )}
        />
      }
      {...other}
    />
  )
}
