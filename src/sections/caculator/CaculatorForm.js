import React, { useEffect, useState } from 'react'

import { Box, Button, Grid, Stack, Tooltip, Typography } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import {
  FormProvider,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'
import { useDispatch, useSelector } from '@/redux/store'

import NetSalaryTable from './NetSalaryTable'
import TaxrableTable from './TaxrableTable'
import TotalExpenseTable from './TotalExpenseTable'
import { getSalary } from './salarySlice'

const INSURANCE_OPTIONS = [
  { label: 'Full wage', value: 'full_wage' },
  { label: 'Other', value: 'other' },
]

const defaultInsurance = 'full_wage'
const SUBMIT_TYPE = {
  GROSS_TO_NET: 'gross_to_net',
  NET_TO_GROSS: 'net_to_gross',
}

const CaculatorForm = () => {
  const initialValues = {
    salary: 0,
    sgd: '',
    rate: 17300,
    insurance: 'full_wage',
    insuranceMoney: 0,
    pvi: 250000,
    peopleDependent: 0,
    type: 0,
  }

  const schema = Yup.object().shape({
    salary: Yup.string().max(5000).required('Salary is required'),
  })

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  })

  const { handleSubmit, watch, setValue } = methods

  const insuranceOption = watch('insurance')
  const rateInputValue = watch('rate')
  const sgdInputValue = useDebounce(watch('sgd'), 200)
  const [isOpen, setIsOpen] = useState(false)
  const [submitType, setSubmitType] = useState('')
  const dispatch = useDispatch()
  const { data = {} } = useSelector((state) => state.salary)

  useEffect(() => {
    if (!rateInputValue) return
    try {
      const inputValue = parseInt(sgdInputValue, 10)
      if (Number.isNaN(inputValue)) {
        setValue('salary', 0)
        return
      }
      setValue('salary', inputValue * rateInputValue)
    } catch (error) {
      // TODO
    }
  }, [sgdInputValue, rateInputValue, setValue])

  const onSubmit = async (data) => {
    try {
      const { salary, insuranceMoney, pvi, peopleDependent } = data || {}
      const dataSending = {
        salary,
        insuraneMoney: salary ? insuranceMoney : salary,
        pvi,
        peopleDependent,
        type: SUBMIT_TYPE.GROSS_TO_NET === submitType ? 0 : 1,
      }
      await dispatch(getSalary(dataSending))
    } catch (error) {
      // TODO
    }
  }

  const handleChangeOpen = (submitType) => {
    setSubmitType(submitType)
    setIsOpen(true)
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} md={3} sm={6}>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Typography>Salary:</Typography>
              <RHFTextField
                name='salary'
                sx={{
                  maxWidth: {
                    lg: 200,
                    md: 150,
                    xs: 250,
                  },
                }}
                placement='VD: 10,000,000'
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={3} sm={6}>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Typography>SGD:</Typography>
              <RHFTextField
                type='number'
                name='sgd'
                sx={{
                  maxWidth: {
                    lg: 200,
                    md: 150,
                    xs: 250,
                  },
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} sm={12}>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Typography>Exchange rate:</Typography>
              <RHFTextField
                type='number'
                name='rate'
                sx={{
                  maxWidth: {
                    sm: 200,
                    xs: 250,
                  },
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box
              display='flex'
              sx={{
                flexDirection: {
                  sm: 'row',
                  xs: 'column',
                },
                alignItems: {
                  sm: 'center',
                },
              }}
            >
              <Typography>Insurance:</Typography>
              <Stack
                direction='row'
                sx={{
                  marginLeft: {
                    sm: '16px',
                  },
                }}
              >
                <RHFRadioGroup name='insurance' options={INSURANCE_OPTIONS} />
                <RHFTextField
                  type='number'
                  name='insuranceMoney'
                  disabled={defaultInsurance === insuranceOption}
                  sx={{
                    maxWidth: {
                      md: 200,
                      sm: 150,
                      xs: 80,
                    },
                  }}
                />
                <Typography sx={{ p: 1 }}>(VND)</Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} lg={3}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography>PVI:</Typography>
              <RHFTextField
                type='number'
                name='pvi'
                sx={{
                  maxWidth: {
                    xs: 200,
                  },
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={8} lg={9}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography>Circumstances:</Typography>
              <RHFTextField
                type='number'
                name='peopleDependent'
                sx={{
                  maxWidth: {
                    xs: 200,
                  },
                }}
              />
              <Typography>(people)</Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack
              spacing={1}
              direction='row'
              justifyContent='center'
              alignItems='center'
              sx={{ p: 3 }}
            >
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                onClick={() => handleChangeOpen(SUBMIT_TYPE.GROSS_TO_NET)}
              >
                GROSS → NET
              </Button>
              <Button
                type='submit'
                variant='contained'
                onClick={() => handleChangeOpen(SUBMIT_TYPE.NET_TO_GROSS)}
              >
                NET → GROSS
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      {isOpen && (
        <Grid>
          <Grid container direction='row'>
            <Grid item xs={12} sm={6}>
              <Stack
                spacing={1}
                direction='row'
                sx={{ p: 1 }}
                alignItems='center'
              >
                <Typography>Description (VND) </Typography>
                <Tooltip title='Click to copy' placement='top-start' arrow>
                  <Button variant='contained' color='secondary'>
                    Copy to clipboard
                  </Button>
                </Tooltip>
              </Stack>
              <NetSalaryTable data={data} rateInput={rateInputValue} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack
                spacing={1}
                direction='row'
                sx={{ p: 1 }}
                alignItems='center'
              >
                <Typography>Paid by the employer gross (VND) </Typography>
                <Tooltip title='Click to copy' placement='top-start' arrow>
                  <Button variant='contained' color='secondary'>
                    Copy to clipboard
                  </Button>
                </Tooltip>
              </Stack>
              <TotalExpenseTable data={data} rateInput={rateInputValue} />
            </Grid>
          </Grid>

          <Grid container sx={{ p: 3 }}>
            <Stack
              spacing={1}
              direction='row'
              sx={{ p: 1 }}
              alignItems='center'
            >
              <Typography>Personal income tax details (VND) </Typography>
              <Tooltip title='Click to copy' placement='top-start' arrow>
                <Button variant='contained' color='secondary'>
                  Copy to clipboard
                </Button>
              </Tooltip>
            </Stack>
            <TaxrableTable data={data} />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default CaculatorForm
