// @mui
import { TextField } from '@mui/material'

import PropTypes from 'prop-types'
// form
import { Controller, useFormContext } from 'react-hook-form'

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
}

export default function RHFSelect({ name, children, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  )
}
