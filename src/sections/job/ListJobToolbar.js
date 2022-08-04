// @mui
import { memo } from 'react'

import { Stack } from '@mui/material'

import Iconify from '@/components/Iconify'
import { RHFBasicSelect, RHFTextField } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import palette from '@/theme/palette'

import { JOB_ALL_STATUS, JOB_STATUS_OPTIONS } from './config'

function ListJobToolbar() {
  const { translate } = useLocales()
  const isSmall = useResponsive('down', 'sm')
  return (
    <Stack
      direction={isSmall ? 'column' : 'row'}
      p={3}
      spacing={3}
      maxWidth={isSmall ? '100%' : '70%'}
    >
      <RHFTextField
        name='title'
        label={translate('pages.jobs.title')}
        InputProps={{
          placeholder: translate('pages.jobs.search'),
          startAdornment: (
            <Iconify
              icon='ant-design:search-outlined'
              sx={{ width: 24, height: 24, color: palette.light.grey[500] }}
            />
          ),
        }}
      />

      <RHFBasicSelect
        name='status'
        label={translate('pages.jobs.status')}
        options={[JOB_ALL_STATUS, ...JOB_STATUS_OPTIONS]}
      />
    </Stack>
  )
}

export default memo(ListJobToolbar)
