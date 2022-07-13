import { useEffect, useReducer } from 'react'

// @mui
import { Card } from '@mui/material'

import { useForm } from 'react-hook-form'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import { FormProvider } from '@/components/hook-form'
import useResponsive from '@/hooks/useResponsive'
// hooks
import useTable from '@/hooks/useTable'

//
import NotificationTableRow from './NotificationTableRow'
import NotificationTableToolbar from './NotificationTableToolbar'
import { TABLE_HEAD } from './config'
import NotificationTableMobile from './mobile/index'
import { useGetAdminAllNotifyQuery } from './notificationSlice'

const defaultValues = {
  userId: '',
  type: '',
  timeStart: null,
  timeEnd: null,
}

function reducer(state, action) {
  const { type, payload = {} } = action
  switch (type) {
    case 'search':
      return {
        ...state,
        payload,
      }
    default:
      throw new Error()
  }
}

export default function NotificationList() {
  const isSmall = useResponsive('down', 'md')
  const [searchFormValues, dispatch] = useReducer(reducer, defaultValues)
  const methods = useForm({
    defaultValues,
  })
  const { watch } = methods
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable()

  useEffect(() => {
    const subscription = watch((value) =>
      dispatch({
        type: 'search',
        payload: value,
      })
    )
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    setPage(0)
  }, [setPage, searchFormValues])

  const { data, isLoading, isFetching } = useGetAdminAllNotifyQuery({
    ...searchFormValues.payload,
    pageSize: rowsPerPage,
    pageNumber: page + 1,
  })
  const { list: listNotifications = [], total: totalRecord = 0 } =
    data?.data || {}

  return (
    <Card>
      <FormProvider methods={methods}>
        <NotificationTableToolbar />
      </FormProvider>
      {isSmall ? (
        <NotificationTableMobile dataSource={listNotifications} />
      ) : (
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
      )}

      <Pagination
        totalRecord={totalRecord}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Card>
  )
}
