// @mui
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'

import PropTypes from 'prop-types'
// form
import { Controller, useFormContext } from 'react-hook-form'

RHFCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
}

export function RHFCheckbox({ name, ...other }) {
  const { control } = useFormContext()

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
      }
      {...other}
    />
  )
}

RHFMultiCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}

export function RHFMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const values = []
          .concat(field?.value)
          .filter((val) => val || val === 0 || typeof value === 'boolean')
        const onSelected = (option) =>
          values.includes(option)
            ? values.filter((value) => value !== option)
            : [...values, option]

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={values.includes(option.value)}
                    onChange={() => field.onChange(onSelected(option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>
        )
      }}
    />
  )
}
