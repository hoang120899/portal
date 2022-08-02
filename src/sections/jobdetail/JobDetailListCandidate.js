import React, { useEffect, useMemo, useState } from 'react'

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import BasicTable from '@/components/BasicTable'
import Pagination from '@/components/Pagination'
import { FormProvider, RHFBasicSelect } from '@/components/hook-form'
import useTable from '@/hooks/useTable'

import CandidateModalDetail from './CandidateModalDetail'
import ListCandidateRow from './ListCandidateRow'
import { TABLE_DESKTOP, TABLE_MOBILE } from './config'
import { useGetLaneQuery, useUpdateCandidateMutation } from './jobDetailSlice'

JobDetailListCandidate.propTypes = {
  listCandidate: PropTypes.array,
  assignListUser: PropTypes.array,
}

function JobDetailListCandidate({ listCandidate, assignListUser }) {
  const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    useTable()
  const [data, setData] = useState([])
  const [candidateSelected, setCandidateSelected] = useState({})
  const [isOpenCandidateDetail, setIsOpenCandidateDetail] = useState(false)
  const handleCloseCandidateDetail = () => {
    setIsOpenCandidateDetail(false)
  }

  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const { data: laneData } = useGetLaneQuery()

  const laneSelected = useMemo(
    () =>
      (laneData?.data?.lane || []).map((item) => ({
        value: item.id,
        label: item.nameColumn,
      })),
    [laneData]
  )

  const defaultValues = {
    status: '',
  }

  const methods = useForm({
    defaultValues,
  })

  const { watch } = methods
  const watchStatus = watch('status')
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (!watchStatus) {
      setData(listCandidate)
      return
    }
    const columnName = laneData?.data?.lane?.find(
      (item) => item.id === watchStatus
    )?.nameColumn
    let rs = listCandidate.filter((item) => columnName === item.nameColumn)
    setData(rs)
  }, [watchStatus, listCandidate, laneData?.data?.lane])

  useEffect(() => {
    setPage(0)
  }, [setPage])

  const [updateCard] = useUpdateCandidateMutation()
  useEffect(() => {
    setData(listCandidate)
  }, [listCandidate])

  const handleClick = (id) => {
    const candidate = data?.find((item) => item.id === id)
    setCandidateSelected(candidate)
    setIsOpenCandidateDetail(true)
  }

  const handleUpdateCandidate = async (data) => {
    try {
      await updateCard({ ...data })
      setIsOpenCandidateDetail(false)
      enqueueSnackbar('Update candidate success', {
        variant: 'success',
      })
    } catch (err) {
      enqueueSnackbar('Update candidate fail', {
        variant: 'error',
      })
    }
  }
  return (
    <Card
      sx={{
        height: 'fit-content',
        '& .MuiTableContainer-root': { padding: 0 },
      }}
    >
      <CardHeader title='Candidate' sx={{ textAlign: 'center' }} />
      <CardContent>
        <Box
          sx={{
            marginBottom: '1rem',
          }}
        >
          <FormProvider methods={methods}>
            <RHFBasicSelect
              hasBlankOption
              label='Select status'
              name='status'
              options={laneSelected}
            />
          </FormProvider>
        </Box>

        {data && (
          <BasicTable
            columns={smDown ? TABLE_MOBILE : TABLE_DESKTOP}
            page={page}
            rowsPerPage={rowsPerPage}
            dataSource={data?.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )}
            TableRowComp={(row, index) => (
              <ListCandidateRow
                key={`${row?.id}-${index}`}
                row={row}
                handleClick={handleClick}
                smDown={smDown}
              />
            )}
          />
        )}

        <Pagination
          totalRecord={data?.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />

        {candidateSelected && (
          <CandidateModalDetail
            isOpen={isOpenCandidateDetail}
            onClose={handleCloseCandidateDetail}
            disabled={isOpenCandidateDetail}
            detailCandidate={candidateSelected}
            assignListUser={assignListUser}
            laneSelected={laneSelected}
            handleUpdateCandidate={handleUpdateCandidate}
            smDown={smDown}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default JobDetailListCandidate
