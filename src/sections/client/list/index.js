import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

// @mui
import { Card, CardHeader } from '@mui/material'

// components
import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
// hooks
import useTable from '@/hooks/useTable'
import ClientConfirmDialog from '@/sections/client/ClientConfirmDialog'
import ClientModal from '@/sections/client/ClientModal'
import {
  useCreateClientMutation,
  useGetAdminClientListQuery,
  useUpdateClientMutation,
} from '@/sections/client/clientSlice'

import ClientCollapsibleTableRow from './ClientCollapsibleTableRow'
import ClientsTableRow from './ClientTableRow'
import { HANDLE_TYPE, TABLE_DESKTOP_HEAD, TABLE_MOBILE_HEAD } from './config'

function ClientList(props, ref) {
  const confirmDialogRef = useRef()
  const { currentRole } = useRole()
  const isMobileScreen = useResponsive('down', 'sm')
  const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    useTable()

  const [isOpen, setIsOpen] = useState(false)
  const [handleType, setHandleType] = useState('')
  const [chosenClient, setChosenClient] = useState({})
  const [createClient] = useCreateClientMutation()
  const [updateClient] = useUpdateClientMutation()

  const { data, isLoading, isFetching } = useGetAdminClientListQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    currentRole,
  })

  const { list: listClients = [], total: totalRecord = 0 } = data?.data || {}
  const columns = isMobileScreen ? TABLE_MOBILE_HEAD : TABLE_DESKTOP_HEAD

  useImperativeHandle(ref, () => ({
    handleAddNewClient: () => {
      setIsOpen(true)
      setHandleType(HANDLE_TYPE.ADD)
      setChosenClient({})
    },
  }))

  const tableRowComp = useCallback(
    (row, index) => {
      if (isMobileScreen)
        return (
          <ClientCollapsibleTableRow
            key={row?.id || index}
            row={row}
            handleGetDetailClient={handleGetDetailClient(row)}
            handleEditClient={handleEditClient(row)}
            handleDeleteClient={handleDeleteClient(row)}
          />
        )
      return (
        <ClientsTableRow
          key={row?.id || index}
          row={row}
          handleGetDetailClient={handleGetDetailClient(row)}
          handleEditClient={handleEditClient(row)}
          handleDeleteClient={handleDeleteClient(row)}
        />
      )
    },
    [
      isMobileScreen,
      handleGetDetailClient,
      handleEditClient,
      handleDeleteClient,
    ]
  )

  const handleGetDetailClient = useCallback(
    (row) => () => {
      setIsOpen(true)
      setHandleType(HANDLE_TYPE.DETAIL)
      setChosenClient(row)
    },
    []
  )

  const handleEditClient = useCallback(
    (row) => () => {
      setIsOpen(true)
      setHandleType(HANDLE_TYPE.EDIT)
      setChosenClient(row)
    },
    []
  )

  const handleDeleteClient = useCallback(
    (row) => () => {
      confirmDialogRef.current.handleToggleConfirmDialog(row)
    },
    []
  )

  const handleCloseClientForm = useCallback(() => {
    setIsOpen(false)
    setHandleType('')
    setChosenClient({})
  }, [])

  useEffect(() => {
    setPage(0)
  }, [setPage])

  return (
    <Card>
      <CardHeader />

      <BasicTable
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        dataSource={listClients}
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
        onClose={handleCloseClientForm}
        createClient={createClient}
        updateClient={updateClient}
      />

      <ClientConfirmDialog ref={confirmDialogRef} />
    </Card>
  )
}

export default forwardRef(ClientList)
