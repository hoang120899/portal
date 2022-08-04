// @mui
import { Autocomplete, Chip, TextField } from '@mui/material'

import PropTypes from 'prop-types'
// form
import { Controller, useFormContext } from 'react-hook-form'

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  AutocompleteProps: PropTypes.object,
}

export default function RHFAutocomplete({
  name,
  options = [],
  AutocompleteProps,
  ...other
}) {
  const { control } = useFormContext()
  const props = {
    onChange: (field) => (event, newValue) => field.onChange(newValue),
    renderTags: (value, getTagProps) =>
      value.map((option, index) => (
        <Chip
          {...getTagProps({ index })}
          key={option}
          size='small'
          label={option}
        />
      )),
    renderInput: (field, error) => (params) =>
      (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          {...params}
        />
      ),
    ...AutocompleteProps,
  }
  // eslint-disable-next-line react/prop-types
  const { onChange, renderTags, renderInput, ...rest } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          fullWidth
          onChange={onChange(field)}
          options={options}
          renderTags={renderTags}
          renderInput={renderInput(field, error)}
          {...rest}
        />
      )}
    />
  )
}
