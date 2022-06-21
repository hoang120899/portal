// @mui
import { InputAdornment } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'

import RHFTextField from './RHFTextField'

RHFSearchTextField.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
}

export default function RHFSearchTextField({ name, placeholder, ...other }) {
  return (
    <RHFTextField
      name={name}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Iconify
              icon={'eva:search-fill'}
              sx={{ color: 'text.disabled', width: 20, height: 20 }}
            />
          </InputAdornment>
        ),
      }}
      {...other}
    />
  )
}
