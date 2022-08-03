import { memo, useCallback, useEffect, useReducer, useState } from 'react'

// @mui
import { Card } from '@mui/material'

import ldDebounce from 'lodash.debounce'
import { useForm } from 'react-hook-form'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import { FormProvider } from '@/components/hook-form'
// hooks
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
import useTable from '@/hooks/useTable'
import ClientModal from '@/sections/client/ClientModal'
import { HANDLE_TYPE } from '@/sections/client/list/config'

import ListJobRow from './ListJobRow'
import ListJobRowMobile from './ListJobRowMobile'
import ListJobToolbar from './ListJobToolbar'
import { JOB_ALL_STATUS, TABLE_HEAD, TABLE_HEAD_MOBILE } from './config'
import { useGetListJobsQuery, useUpdateJobClientMutation } from './jobSlice'

const defaultValues = {
  title: '',
  status: JOB_ALL_STATUS,
}

function reducer(state, action) {
  const { type, payload = {} } = action
  switch (type) {
    case 'search':
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error()
  }
}

function ListJobTable() {
  const { translate } = useLocales()
  const isMobileScreen = useResponsive('down', 'sm')
  const { currentRole } = useRole()
  const [searchFormValues, dispatch] = useReducer(reducer, defaultValues)
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable()
  const [isOpen, setIsOpen] = useState(false)
  const [handleType, setHandleType] = useState('')
  const [chosenClient, setChosenClient] = useState({})

  const [updateClient] = useUpdateJobClientMutation()

  const handleEditClient = useCallback((client) => {
    setIsOpen(true)
    setHandleType(HANDLE_TYPE.EDIT)
    setChosenClient(client)
  }, [])

  const handleCloseClientForm = useCallback(() => {
    setIsOpen(false)
    setHandleType('')
    setChosenClient({})
  }, [])

  const methods = useForm({
    defaultValues,
  })

  const { watch } = methods
  const watchTitle = watch('title')
  const watchStatus = watch('status')

  useEffect(() => {
    const timmer = ldDebounce(() => {
      dispatch({
        type: 'search',
        payload: { title: watchTitle, status: watchStatus },
      })
    }, 500)
    timmer()
    return () => timmer.cancel()
  }, [watchTitle, watchStatus])

  const { data, isLoading, isFetching } = useGetListJobsQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    ...searchFormValues,
    currentRole,
  })

  const { list: listJobs = [], total: totalRecord = 0 } = data?.data || {}
  const columns = isMobileScreen
    ? TABLE_HEAD_MOBILE({ translate })
    : TABLE_HEAD({ translate })

  const tableRowComp = useCallback(
    (row, index) => {
      if (isMobileScreen)
        return (
          <ListJobRowMobile
            key={row?.id || index}
            row={row}
            handleEditClient={handleEditClient}
          />
        )
      return (
        <ListJobRow
          key={row?.id || index}
          row={row}
          handleEditClient={handleEditClient}
        />
      )
    },
    [isMobileScreen, handleEditClient]
  )

  return (
    <Card>
      <FormProvider methods={methods}>
        <ListJobToolbar />
      </FormProvider>

      <BasicTable
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        dataSource={listJobs}
        isLoading={isLoading || isFetching}
        TableRowComp={tableRowComp}
      />

      <Pagination
        totalRecord={totalRecord}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />

      <ClientModal
        isOpen={isOpen}
        handleType={handleType}
        client={chosenClient}
        updateClient={updateClient}
        onClose={handleCloseClientForm}
      />
    </Card>
  )
}

export default memo(ListJobTable)
