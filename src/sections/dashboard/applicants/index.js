import { useCallback, useEffect, useState } from 'react'

// @mui
import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'

import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
import useTable from '@/hooks/useTable'

import ApplicantDetailModal from './ApplicantDetailModal'
import ApplicantsCollapsibleTableRow from './ApplicantsCollapsibleTableRow'
import ApplicantsTableRow from './ApplicantsTableRow'
import { useGetAllNewApplicantsQuery } from './applicantsSlice'
import {
  APPLICANT_TABLE_HEIGHT,
  DEFAULT_ROWS_PER_PAGE,
  TABLE_DESKTOP_HEAD,
  TABLE_MOBILE_HEAD,
} from './config'

Applicants.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function Applicants({ title, subheader, ...other }) {
  const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    useTable({ defaultRowsPerPage: DEFAULT_ROWS_PER_PAGE })

  const { currentRole } = useRole()
  const isMobileScreen = useResponsive('down', 'sm')
  const [isOpen, setIsOpen] = useState(false)
  const [chosenApplicant, setChosenApplicant] = useState({})

  const { data, isLoading, isFetching } = useGetAllNewApplicantsQuery({
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    currentRole,
  })
  const { list: listNewApplicants = [], total: totalRecord = 0 } =
    data?.data || {}

  const columns = isMobileScreen ? TABLE_MOBILE_HEAD : TABLE_DESKTOP_HEAD

  const tableRowComp = useCallback(
    (row, index) => {
      if (isMobileScreen)
        return (
          <ApplicantsCollapsibleTableRow
            key={row?.id || index}
            row={row}
            handleOpenDetail={handleOpenDetail}
          />
        )
      return (
        <ApplicantsTableRow
          key={row?.id || index}
          row={row}
          handleOpenDetail={handleOpenDetail}
        />
      )
    },
    [isMobileScreen, handleOpenDetail]
  )

  const handleOpenDetail = useCallback((row) => {
    setIsOpen(true)
    setChosenApplicant(row)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    setPage(0)
  }, [setPage])

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <BasicTable
        columns={columns}
        page={page}
        rowsPerPage={rowsPerPage}
        dataSource={listNewApplicants}
        isLoading={isLoading || isFetching}
        TableRowComp={tableRowComp}
        tableStyle={{
          height: isMobileScreen ? 'auto' : `${APPLICANT_TABLE_HEIGHT}px`,
          overflow: 'hidden',
          padding: '0 8px',
        }}
        heightEmptyRow={0}
      />

      <Pagination
        totalRecord={totalRecord}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        rowsPerPageOptions={[]}
      />

      {isOpen && (
        <ApplicantDetailModal
          isOpen={isOpen}
          onClose={handleCloseDetail}
          row={chosenApplicant}
        />
      )}
    </Card>
  )
}
