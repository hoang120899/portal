import React, { forwardRef, useCallback, useEffect, useState } from 'react'

// @mui
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'

// @date-fns
import { format } from 'date-fns'
// @lodash
import debounce from 'lodash.debounce'
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
import {
  API_ADMIN_LIST_JOB,
  API_LIST_CARD,
  API_LIST_CLIENT,
  API_LIST_LABEL,
  API_LIST_MEMBER,
  API_SEARCH_CARD,
} from '@/routes/api'
// @api
import { _getApi } from '@/utils/axios'

const KanbanTableToolbar = forwardRef((props, ref) => {
  const { setColumns } = props
  // const
  const defaultValues = {
    search: '',
    labelId: '',
    clientId: '',
    memberId: '',
    jobId: '',
    startDate: null,
    endDate: null,
  }
  const [clients, setClients] = useState([])
  const [labels, setLabels] = useState([])
  const [members, setMembers] = useState([])
  const [jobs, setJobs] = useState([])
  const [cards, setCards] = useState([])

  const methods = useForm({
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

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
  const searchCards = async (search) => {
    try {
      let url = API_SEARCH_CARD
      if (search) {
        url += `?search=${search}`
      }
      const res = await _getApi(url)
      const list = res.data.list.map((item) => ({
        value: item.Candidate.id,
        label: item.Candidate.name,
      }))
      setCards(list)
      // console.log('search card:', res)
    } catch (error) {
      // console.log('search card error:', error)
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((value) => {
      // console.log('search', value)
      searchCards(value)
    }, 1000),
    []
  )
  const handleChange = (e) => {
    debounceSearch(e.target.value)
  }

  // filter
  // clientId=[id]&jobId=[id]&label=[label]&userId=[id]
  // &timeStart=[yyyy-MM-dd]&timeEnd=[yyyy-MM-dd]
  useEffect(() => {
    const getLabel = async () => {
      try {
        let getLabel = await _getApi(API_LIST_LABEL)
        getLabel = getLabel.data.list.map((item) => {
          let clone = { ...item }
          clone.value = item.title
          clone.label = item.title
          return clone
        })
        setLabels(getLabel)
      } catch (error) {
        // console.log('error', error)
      }
    }
    const getClient = async () => {
      try {
        let client = await _getApi(API_LIST_CLIENT)
        client = client.data.clients.map((item) => {
          let clone = { ...item }
          clone.value = item.id
          clone.label = item.name
          return clone
        })
        setClients(client)
      } catch (error) {
        // console.log('error', error)
      }
    }
    const getMember = async () => {
      try {
        let member = await _getApi(API_LIST_MEMBER)
        member = member.data.list.map((item) => {
          let clone = { ...item }
          clone.value = item.id
          clone.label = item.name
          return clone
        })
        setMembers(member)
      } catch (error) {
        // console.log('error', error)
      }
    }
    const getJob = async () => {
      try {
        let job = await _getApi(API_ADMIN_LIST_JOB)
        job = job.data.listJob.map((item) => {
          let clone = { ...item }
          clone.value = item.id
          clone.label = item.title
          return clone
        })
        setJobs(job)
      } catch (error) {
        // console.log('error', error)
      }
    }
    getLabel()
    getClient()
    getMember()
    getJob()
  }, [])

  return (
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
          AutocompleteProps={{ freeSolo: true, size: 'small' }}
          name='search'
          label='search'
          options={cards}
          onChange={handleChange}
        />
        <RHFBasicSelect
          hasBlankOption
          label='Choose label'
          name='label'
          options={labels}
        />
        <RHFBasicSelect
          hasBlankOption
          label='Choose client'
          name='clientId'
          options={clients}
        />
        <RHFBasicSelect
          hasBlankOption
          label='Choose member'
          name='userId'
          options={members}
        />
        <RHFBasicSelect
          hasBlankOption
          label='Choose job'
          name='jobId'
          options={jobs}
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
  )
})

KanbanTableToolbar.propTypes = {
  setColumns: propTypes.func,
}

export default KanbanTableToolbar
