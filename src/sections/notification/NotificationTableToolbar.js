import { useMemo } from 'react'

// @mui
import { Stack } from '@mui/material'

// components
import { RHFBasicSelect, RHFDatePicker } from '@/components/hook-form'
// config
import { ROLE } from '@/config'
// redux
import { useGetAdminUserListQuery } from '@/redux/api/apiSlice'

import { NOTIFICATION_TYPE } from './config'

const INPUT_WIDTH = 250

export default function NotificationTableToolbar() {
  const { data: { data: { user: adminUserList = [] } = {} } = {} } =
    useGetAdminUserListQuery()

  const users = useMemo(
    () =>
      adminUserList
        .filter((user) => [ROLE.LEADER, ROLE.MEMBER].includes(user.Role.name))
        .map(({ id: userId, name: displayName }) => ({
          value: userId,
          label: displayName,
        })),
    [adminUserList]
  )

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ py: 2.5, px: 3 }}
    >
      <RHFBasicSelect
        label='User'
        name='userId'
        options={users}
        hasBlankOption
      />
      <RHFBasicSelect
        label='Type'
        name='type'
        options={NOTIFICATION_TYPE}
        hasBlankOption
      />
      <RHFDatePicker
        name='timeStart'
        label='Time start Card'
        sx={{
          maxWidth: { md: INPUT_WIDTH },
        }}
      />
      <RHFDatePicker
        name='timeEnd'
        label='Time end Card'
        sx={{
          maxWidth: { md: INPUT_WIDTH },
        }}
      />
    </Stack>
  )
}
