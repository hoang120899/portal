import React, { useCallback, useEffect, useReducer, useState } from 'react'

import {
  Card,
  ClickAwayListener,
  Container,
  Slide,
  Tooltip,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { useForm } from 'react-hook-form'

// components
import BasicTable from '@/components/BasicTable'
import HeaderBreadcrumbs from '@/components/HeaderBreadcrumbs'
import Iconify from '@/components/Iconify'
import Page from '@/components/Page'
import Pagination from '@/components/Pagination'
import { IconButtonAnimate } from '@/components/animate'
import { FormProvider } from '@/components/hook-form'
// config
import { HEADER, NAVBAR, PAGES } from '@/config'
// hooks
import useCollapseDrawer from '@/hooks/useCollapseDrawer'
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import useRole from '@/hooks/useRole'
import useSettings from '@/hooks/useSettings'
import useTable from '@/hooks/useTable'
// layouts
import Layout from '@/layouts'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'
// sections
import CandidateModalDetail from '@/sections/candidate/CandidateModalDetail'
import CandidateTableRow from '@/sections/candidate/CandidateTableRow'
import CandidateTableToolbar from '@/sections/candidate/CandidateTableToolbar'
import CandidatesCollapsibleTableRow from '@/sections/candidate/CandidatesCollapsibleTableRow'
import { useGetAdminSearchCandidateQuery } from '@/sections/candidate/candidateSlice'
import {
  SEARCH_FIELD,
  TABLE_DESKTOP_HEAD,
  TABLE_MOBILE_HEAD,
} from '@/sections/candidate/config'
// utils
import cssStyles from '@/utils/cssStyles'
import { getRolesByPage } from '@/utils/role'

Candidates.getLayout = function getLayout({ roles = [] }, page) {
  return <Layout roles={roles}>{page}</Layout>
}
const SearchIconStyle = styled('div')(({ theme, ownerState }) => {
  const { isCollapse = false } = ownerState
  const left = isCollapse
    ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
    : NAVBAR.DASHBOARD_WIDTH
  const paddingLeft =
    (window.innerWidth - theme.breakpoints.values['xl'] - left) / 2

  return {
    top: HEADER.MOBILE_HEIGHT / 4,
    left: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    zIndex: 1101,
    position: 'fixed',
    [theme.breakpoints.up('lg')]: {
      top: HEADER.DASHBOARD_DESKTOP_HEIGHT / 4,
      left,
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: paddingLeft + parseInt(theme.spacing(2)),
    },
  }
})

const SearchbarStyle = styled('div')(({ theme, ownerState }) => {
  const { isCollapse = false } = ownerState
  const collapseWidth = isCollapse
    ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
    : NAVBAR.DASHBOARD_WIDTH

  return {
    ...cssStyles(theme).bgBlur(),
    top: 0,
    left: 0,
    zIndex: 1102,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    padding: theme.spacing(3),
    boxShadow: theme.customShadows.z8,
    '& form': {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      left: collapseWidth,
      width: `calc(100% - ${collapseWidth}px)`,
    },
  }
})

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
  const { isCollapse } = useCollapseDrawer()
  const { themeStretch } = useSettings()
  const { translate } = useLocales()
  const { currentRole } = useRole()
  const isMobileScreen = useResponsive('down', 'md')
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSearchForm, setOpenSearchForm] = useState(false)
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
    setOpenSearchForm(false)
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
          <CandidatesCollapsibleTableRow
            key={row?.id || index}
            row={row}
            handleGetCandidateDetail={handleGetCandidateDetail(row)}
          />
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

  const handleOpenSearchForm = useCallback(() => {
    setOpenSearchForm((prev) => !prev)
  }, [])

  const handleCloseSearchForm = useCallback(() => {
    setOpenSearchForm(false)
  }, [])

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
        <ClickAwayListener
          onClickAway={handleCloseSearchForm}
          mouseEvent='onMouseDown'
          touchEvent='onTouchStart'
        >
          <div>
            <SearchIconStyle ownerState={{ isCollapse }}>
              <Tooltip
                title={translate('Search')}
                sx={{ visibility: !isOpenSearchForm ? 'visible' : 'hidden' }}
              >
                <IconButtonAnimate onClick={handleOpenSearchForm}>
                  <Iconify icon={'eva:search-fill'} width={20} height={20} />
                </IconButtonAnimate>
              </Tooltip>
            </SearchIconStyle>

            <Slide
              direction='down'
              in={isOpenSearchForm}
              mountOnEnter
              unmountOnExit
            >
              <SearchbarStyle ownerState={{ isCollapse }}>
                <FormProvider
                  methods={methods}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CandidateTableToolbar />
                </FormProvider>
              </SearchbarStyle>
            </Slide>
          </div>
        </ClickAwayListener>

        <Card sx={{ py: 2 }}>
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
          {isOpen && (
            <CandidateModalDetail
              isOpen
              onClose={handleCloseCandidateDetail}
              disabled
              detailCandidate={detailCandidate}
            />
          )}
        </Card>
      </Container>
    </Page>
  )
}
