import { useEffect } from 'react'

// @mui
import { Card } from '@mui/material'

import { useForm } from 'react-hook-form'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import { FormProvider } from '@/components/hook-form'
// hooks
import useTable from '@/hooks/useTable'

//
import NotificationTableRow from './NotificationTableRow'
import NotificationTableToolbar from './NotificationTableToolbar'
import { TABLE_HEAD } from './config'
import { useGetAdminAllNotifyQuery } from './notificationSlice'

export default function NotificationList() {
  const methods = useForm({
    defaultValues: {
      userId: '',
      type: '',
      timeStart: null,
      timeEnd: null,
    },
  })
  const { watch } = methods
  const watchAllFields = watch()
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable()

  useEffect(() => {
    setPage(0)
  }, [watchAllFields, setPage])

  const { data, isLoading, isFetching } = useGetAdminAllNotifyQuery({
    ...watchAllFields,
    pageSize: rowsPerPage,
    pageNumber: page + 1,
  })
  const listNotifications = data?.data?.list || []

  return (
    <Card>
      <FormProvider methods={methods}>
        <NotificationTableToolbar />
      </FormProvider>
      <BasicTable
        columns={TABLE_HEAD}
        page={page}
        rowsPerPage={rowsPerPage}
        dataSource={listNotifications}
        isLoading={isLoading || isFetching}
        TableRowComp={(row, index) => (
          <NotificationTableRow key={row?.id || index} row={row} />
        )}
      />
      <Pagination
        dataSource={listNotifications}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Card>
  )
}
