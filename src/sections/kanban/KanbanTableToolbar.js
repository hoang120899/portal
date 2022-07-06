import React, { forwardRef, useMemo, useState } from 'react'

// @mui
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'

// @date-fns
import { format } from 'date-fns'
// @prop-types
import propTypes from 'prop-types'
import qs from 'query-string'
// @react-hooks-form
import { useForm } from 'react-hook-form'

import {
  FormProvider,
  RHFAutocomplete,
  RHFBasicSelect,
  RHFDatePicker,
} from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'
import { API_LIST_CARD } from '@/routes/api'
// @api
import { _getApi } from '@/utils/axios'

import KanbanTaskDetails from './KanbanTaskDetails'
import {
  useGetClientQuery,
  useGetJobQuery,
  useGetLabelQuery,
  useGetMemberQuery,
  useSearchCardsQuery,
} from './kanbanSlice'

const KanbanTableToolbar = forwardRef((props, ref) => {
  const { setColumns } = props
  const defaultValues = {
    search: '',
    labelId: '',
    clientId: '',
    memberId: '',
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

  const [openDetails, setOpenDetails] = useState(false)
  const handleOpenDetails = () => {
    setOpenDetails(true)
  }

  const handleCloseDetails = () => {
    setOpenDetails(false)
  }

  const filterNonNull = (obj) =>
    // eslint-disable-next-line no-unused-vars
    Object.fromEntries(Object.entries(obj).filter(([k, v]) => v))
  const onSubmit = async (data) => {
    try {
      // eslint-disable-next-line no-unused-vars
      let { search, ...rest } = data
      if (rest.startDate) {
        rest.startDate = format(rest.startDate, 'yyyy-MM-dd')
      }
      if (rest.endDate) {
        rest.endDate = format(rest.endDate, 'yyyy-MM-dd')
      }
      let url = API_LIST_CARD
      let params = qs.stringify(filterNonNull(rest))
      if (params) {
        url += `?${params}`
      }
      const res = await _getApi(url, rest)
      setColumns(res.data.list)
    } catch (error) {
      // console.log(error)
    }
  }
  const { data: labelData } = useGetLabelQuery()
  const { data: clientData } = useGetClientQuery()
  const { data: jobData } = useGetJobQuery()
  const { data: memberData } = useGetMemberQuery()
  const labelOptions = useMemo(() => {
    if (labelData) {
      return labelData.data.list.map((label) => ({
        value: label.title,
        label: label.title,
      }))
    }
    return []
  }, [labelData])
  const clientOptions = useMemo(() => {
    if (clientData) {
      return clientData.data.clients.map((client) => ({
        value: client.id,
        label: client.name,
      }))
    }
    return []
  }, [clientData])
  const jobOptions = useMemo(() => {
    if (jobData) {
      return jobData.data.listJob.map((job) => ({
        value: job.id,
        label: job.title,
      }))
    }
    return []
  }, [jobData])
  const memberOptions = useMemo(() => {
    if (memberData) {
      return memberData.data.list.map((member) => ({
        value: member.id,
        label: member.name,
      }))
    }
    return []
  }, [memberData])
  const [keySearch, setKeySearch] = useState('')
  const search = useDebounce(keySearch, 1000)

  const { data: cardData, isFetching: isCardFetching } = useSearchCardsQuery({
    search,
  })
  const cardOptions = useMemo(() => {
    if (cardData || cardData?.data?.list.length > 0) {
      return cardData.data.list.map((card, i) => ({
        value: card.Candidate.name,
        label: `${card.Candidate.name}-${i}`,
      }))
    }
    return []
  }, [cardData])
  const handle = () => {
    handleOpenDetails()
  }
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
                  onClick={() => handle(option.value)}
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
      <KanbanTaskDetails isOpen={openDetails} onClose={handleCloseDetails} />
    </>
  )
})

KanbanTableToolbar.propTypes = {
  setColumns: propTypes.func,
}

export default KanbanTableToolbar
