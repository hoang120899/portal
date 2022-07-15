import React, { forwardRef, useMemo, useState } from 'react'

// @mui
import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'

import PropTypes from 'prop-types'

import {
  RHFAutocomplete,
  RHFBasicSelect,
  RHFDatePicker,
} from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'

import { useSearchCardsQuery } from './kanbanSlice'

const KanbanTableToolbar = forwardRef(
  (
    {
      onOpenUpdateTask,
      isSubmitting,
      labelOptions,
      jobOptions,
      clientOptions,
      memberOptions,
    },
    ref
  ) => {
    const [keySearch, setKeySearch] = useState('')
    const search = useDebounce(keySearch, 1000)

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

    return (
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
                onClick={() => onOpenUpdateTask(option)}
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
    )
  }
)

KanbanTableToolbar.propTypes = {
  onOpenUpdateTask: PropTypes.func,
  isSubmitting: PropTypes.bool,
  labelOptions: PropTypes.array,
  jobOptions: PropTypes.array,
  clientOptions: PropTypes.array,
  memberOptions: PropTypes.array,
}

export default React.memo(KanbanTableToolbar)
