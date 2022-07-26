import React, { useCallback, useEffect, useReducer, useState } from 'react'

import { Card, Container } from '@mui/material'

import { useForm } from 'react-hook-form'

import BasicTable from '@/components/BasicTable'
// components
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Page from '@/components/Page'
import Pagination from '@/components/Pagination'
import { FormProvider } from '@/components/hook-form'
// config
import { PAGES } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
import useSettings from '@/hooks/useSettings'
import useTable from '@/hooks/useTable'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
import CandidateModalDetail from '@/sections/candidate/CandidateModalDetail'
import CandidateTableRow from '@/sections/candidate/CandidateTableRow'
// sections
import CandidateTableToolbar from '@/sections/candidate/CandidateTableToolbar'
import CandidatesCollapsibleTableRow from '@/sections/candidate/CandidatesCollapsibleTableRow'
import { useGetAdminSearchCandidateQuery } from '@/sections/candidate/candidateSlice'
import {
  SEARCH_FIELD,
  TABLE_DESKTOP_HEAD,
  TABLE_MOBILE_HEAD,
} from '@/sections/candidate/config'
// utils
import { getRolesByPage } from '@/utils/role'

Candidates.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}

export async function getStaticProps() {
  return {
    props: {
      roles: getRolesByPage(PAGES.Candidates),
    },
  }
}

const defaultValues = {
  [SEARCH_FIELD.EMAIL]: '',
  [SEARCH_FIELD.PHONE]: '',
  [SEARCH_FIELD.NAME]: '',
  [SEARCH_FIELD.TEXT]: '',
  [SEARCH_FIELD.JOB_ID]: null,
  [SEARCH_FIELD.SKILL]: [],
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

export default function Candidates() {
  const { themeStretch } = useSettings()
  const { translate } = useLocales()
  const { currentRole } = useRole()
  const isMobileScreen = useResponsive('down', 'md')
  const [isOpen, setIsOpen] = useState(false)
  const [detailCandidate, setDetailCandidate] = useState({})
  const { page, setPage, rowsPerPage, onChangePage, onChangeRowsPerPage } =
    useTable()
  const [searchFormValues, dispatch] = useReducer(reducer, defaultValues)

  const methods = useForm({
    defaultValues,
  })
  const { handleSubmit } = methods

  const columns = isMobileScreen ? TABLE_MOBILE_HEAD : TABLE_DESKTOP_HEAD

  const { data, isLoading, isFetching } = useGetAdminSearchCandidateQuery({
    ...searchFormValues.payload,
    pageSize: rowsPerPage,
    pageNumber: page + 1,
    currentRole,
  })
  const { list: listCandidates = [], total: totalRecord = 0 } = data?.data || {}

  useEffect(() => {
    setPage(0)
  }, [setPage, searchFormValues])

  const onSubmit = async (data) => {
    dispatch({
      type: 'search',
      payload: data,
    })
  }
  const handleGetCandidateDetail = useCallback(
    (row) => () => {
      setIsOpen(true)
      setDetailCandidate(row)
    },
    []
  )
  const handleCloseCandidateDetail = () => {
    setIsOpen(false)
  }
  const tableRowComp = useCallback(
    (row, index) => {
      if (isMobileScreen)
        return (
          <CandidatesCollapsibleTableRow key={row?.id || index} row={row} />
        )
      return (
        <CandidateTableRow
          key={row?.id || index}
          row={row}
          handleGetCandidateDetail={handleGetCandidateDetail(row)}
        />
      )
    },
    [isMobileScreen, handleGetCandidateDetail]
  )

  return (
    <Page title={translate('pages.candidates.heading')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={translate('pages.candidates.heading')}
          links={[
            {
              name: translate('nav.dashboard'),
              href: PATH_DASHBOARD.dashboard,
            },
            { name: translate('pages.candidates.heading') },
          ]}
        />

        <Card sx={{ py: 2 }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <CandidateTableToolbar />
          </FormProvider>

          <BasicTable
            columns={columns}
            page={page}
            rowsPerPage={rowsPerPage}
            dataSource={listCandidates}
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
          <CandidateModalDetail
            isOpen={isOpen}
            onClose={handleCloseCandidateDetail}
            disabled={isOpen}
            detailCandidate={detailCandidate}
          />
        </Card>
      </Container>
    </Page>
  )
}
