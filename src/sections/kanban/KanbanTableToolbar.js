import React, { useMemo, useState } from 'react'

// @mui
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import {
  FormProvider,
  RHFAutocomplete,
  RHFBasicSelect,
  RHFDatePicker,
} from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'
import useLocales from '@/hooks/useLocales'
import { getBoard } from '@/sections/kanban/kanbanSlice'

import { useSearchCardsQuery } from './kanbanSlice'

const KanbanTableToolbar = ({
  onOpenUpdateTask,
  labelOptions,
  jobOptions,
  clientOptions,
  memberOptions,
  onCloseSearchForm,
}) => {
  const [keySearch, setKeySearch] = useState('')
  const search = useDebounce(keySearch, 1000)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const { translate } = useLocales()
  const { data: cardData, isFetching: isCardFetching } = useSearchCardsQuery({
    search,
  })

  const cardOptions = useMemo(() => {
    if (cardData || cardData?.data?.list.length > 0) {
      return cardData.data.list.map((card, i) => ({
        ...card,
        value: card.Candidate.name,
        label: `${card.Candidate.name}-${i}`,
        id: card.id,
      }))
    }
    return []
  }, [cardData])

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
      dispatch(getBoard(data))
    } catch (error) {
      enqueueSnackbar('Fail to filter cards! Please try again')
    } finally {
      onCloseSearchForm()
    }
  }

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
                onClick={() => onOpenUpdateTask(option)}
              >
                {option.value}
              </Box>
            ),
          }}
          name='search'
          label={translate('pages.board.search')}
          options={cardOptions}
          onChange={(e) => setKeySearch(e.target.value)}
        />

        <RHFBasicSelect
          hasBlankOption
          label={translate('pages.board.chooseLabel')}
          name='label'
          options={labelOptions}
        />

        <RHFBasicSelect
          hasBlankOption
          label={translate('pages.board.chooseClient')}
          name='clientId'
          options={clientOptions}
        />

        <RHFBasicSelect
          hasBlankOption
          label={translate('pages.board.chooseMember')}
          name='userId'
          options={memberOptions}
        />

        <RHFBasicSelect
          hasBlankOption
          label={translate('pages.board.chooseJob')}
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
          {translate('pages.board.search')}
        </LoadingButton>
      </Box>
    </FormProvider>
  )
}

KanbanTableToolbar.propTypes = {
  onOpenUpdateTask: PropTypes.func,
  isSubmitting: PropTypes.bool,
  labelOptions: PropTypes.array,
  jobOptions: PropTypes.array,
  clientOptions: PropTypes.array,
  memberOptions: PropTypes.array,
  onCloseSearchForm: PropTypes.func,
}

export default React.memo(KanbanTableToolbar)
