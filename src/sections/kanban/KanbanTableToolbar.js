import React, { forwardRef, useMemo, useState } from 'react'

// @mui
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'

// @date-fns
import { format } from 'date-fns'
import PropTypes from 'prop-types'
// @react-hooks-form
import { useForm } from 'react-hook-form'

import {
  FormProvider,
  RHFAutocomplete,
  RHFBasicSelect,
  RHFDatePicker,
} from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'
// redux
import { useDispatch } from '@/redux/store'

import {
  getBoard,
  useGetClientQuery,
  useGetJobQuery,
  useGetLabelQuery,
  useGetMemberQuery,
  useSearchCardsQuery,
} from './kanbanSlice'

const KanbanTableToolbar = forwardRef(({ onOpenUpdateTask }, ref) => {
  const dispatch = useDispatch()
  const defaultValues = {
    search: '',
    label: '',
    clientId: '',
    userId: '',
    jobId: '',
    startDate: null,
    endDate: null,
  }

  const methods = useForm({
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      const queries = Object.keys(data)
        .filter((key) => key !== 'search' && data[key])
        .reduce((obj, key) => {
          const getValue = (key) => {
            if (['startDate', 'endDate'].includes(key))
              return format(data[key], 'yyyy-MM-dd')
            return data[key]
          }
          return {
            ...obj,
            [key]: getValue(key),
          }
        }, {})

      dispatch(getBoard(queries))
    } catch (error) {
      // TODO
    }
  }
  const { data: listLabels } = useGetLabelQuery()
  const { data: listClients } = useGetClientQuery()
  const { data: listJobs } = useGetJobQuery()
  const { data: listMembers } = useGetMemberQuery()

  const labelOptions = useMemo(() => {
    if (!listLabels) return []

    const { data: { list = [] } = {} } = listLabels
    return list.map(({ title }) => ({
      value: title,
      label: title,
    }))
  }, [listLabels])

  const clientOptions = useMemo(() => {
    if (!listClients) return []

    const { data: { clients = [] } = {} } = listClients
    return clients.map(({ id, name }) => ({
      value: id,
      label: name,
    }))
  }, [listClients])

  const jobOptions = useMemo(() => {
    if (!listJobs) return []

    const { data: { listJob = [] } = {} } = listJobs
    return listJob.map(({ id, title }) => ({
      value: id,
      label: title,
    }))
  }, [listJobs])

  const memberOptions = useMemo(() => {
    if (!listMembers) return []

    const { data: { list = [] } = {} } = listMembers
    return list.map(({ id, name }) => ({
      value: id,
      label: name,
    }))
  }, [listMembers])

  const [keySearch, setKeySearch] = useState('')
  const search = useDebounce(keySearch, 1000)

  const { data: cardOptions, isFetching: isCardFetching } = useSearchCardsQuery(
    {
      search,
    }
  )

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'grid',
            pb: 2,
            gap: 2,
            gridTemplateColumns: {
              md: 'repeat(4, 1fr)',
              sm: 'repeat(3, 1fr)',
            },
          }}
          ref={ref}
        >
          <RHFAutocomplete
            AutocompleteProps={{
              freeSolo: true,
              size: 'small',
              loading: isCardFetching,
              renderOption: (props, option) => (
                <Box
                  key={option.key}
                  component='li'
                  {...props}
                  onClick={() => onOpenUpdateTask(option.id)}
                >
                  {option.value}
                </Box>
              ),
            }}
            name='search'
            label='search'
            options={cardOptions}
            onChange={(e) => setKeySearch(e.target.value)}
          />
          <RHFBasicSelect
            hasBlankOption
            label='Choose label'
            name='label'
            options={labelOptions}
          />
          <RHFBasicSelect
            hasBlankOption
            label='Choose client'
            name='clientId'
            options={clientOptions}
          />
          <RHFBasicSelect
            hasBlankOption
            label='Choose member'
            name='userId'
            options={memberOptions}
          />
          <RHFBasicSelect
            hasBlankOption
            label='Choose job'
            name='jobId'
            options={jobOptions}
          />
          <RHFDatePicker name='startDate' />
          <RHFDatePicker name='endDate' />
          <LoadingButton
            fullWidth
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            Search
          </LoadingButton>
        </Box>
      </FormProvider>
    </>
  )
})

KanbanTableToolbar.propTypes = {
  onOpenUpdateTask: PropTypes.func,
}

export default KanbanTableToolbar
