import React, { useEffect, useRef, useState } from 'react'

import { Box, Button, Grid, Stack, Typography } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import CopyClipboard from '@/components/CopyClipboard'
import {
  FormProvider,
  RHFRadioGroup,
  RHFTextField,
} from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'
import useLocales from '@/hooks/useLocales'
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
    insurance: defaultInsurance,
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
  const { translate } = useLocales()
  const { handleSubmit, watch, setValue } = methods

  const insuranceOption = watch('insurance')
  const rateInputValue = watch('rate')
  const sgdInputValue = useDebounce(watch('sgd'), 200)
  const [isOpen, setIsOpen] = useState(false)
  const [submitType, setSubmitType] = useState('')
  const [netSalaryTableText, setNetSalaryTableText] = useState('')
  const [totalExpenseTableText, setTotalExpenseTableText] = useState('')
  const [taxrableTableText, setTaxrableTableText] = useState('')
  const dispatch = useDispatch()
  const netSalaryTableRef = useRef()
  const totalExpenseTableRef = useRef()
  const taxrableTableRef = useRef()
  const { data = {} } = useSelector((state) => state.salary)
  useEffect(() => {
    if (!rateInputValue && sgdInputValue) return
    try {
      const inputValue = parseInt(sgdInputValue, 10)
      if (Number.isNaN(inputValue)) {
        setValue('salary', 0)
        return
      }
      setValue('salary', convertVND(Number(inputValue * rateInputValue)))
    } catch (error) {
      // TODO
    }
  }, [sgdInputValue, rateInputValue, setValue])

  useEffect(() => {
    if (!data || !Object.keys(data).length) return
    setNetSalaryTableText(netSalaryTableRef.current?.innerText)
    setTotalExpenseTableText(totalExpenseTableRef.current?.innerText)
    setTaxrableTableText(taxrableTableRef.current?.innerText)
  }, [data])

  const onSubmit = async (data) => {
    try {
      const { salary, insuranceMoney, pvi, peopleDependent, insurance } =
        data || {}
      const dataSending = {
        salary: salary?.replaceAll('.', ''),
        insuraneMoney:
          insurance === defaultInsurance
            ? salary?.replaceAll('.', '')
            : insuranceMoney?.replaceAll('.', ''),

        pvi,
        peopleDependent,
        type: SUBMIT_TYPE.GROSS_TO_NET === submitType ? 0 : 1,
        rateInputValue,
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
  const convertVND = (number) => {
    const numberFormat = Number(number)
    return numberFormat.toLocaleString('it-IT')
  }
  const onChangInputSalary = (e) => {
    const value = e.target.value
    const checkingNow = value.replaceAll('.', '')
    if (+checkingNow || value === '') {
      setValue('salary', convertVND(checkingNow))
    }
  }
  const onChangInputInsurance = (e) => {
    const value = e.target.value
    const checkingNow = value.replaceAll('.', '')
    if (+checkingNow || value === '') {
      setValue('insuranceMoney', convertVND(checkingNow))
    }
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} md={3} sm={6}>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Typography>{translate('pages.calculator.salary')}:</Typography>
              <RHFTextField
                type='text'
                name='salary'
                sx={{
                  maxWidth: {
                    lg: 200,
                    md: 150,
                    xs: 250,
                  },
                }}
                placement='VD: 10,000,000'
                onChange={onChangInputSalary}
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
              <Typography>{translate('pages.calculator.rate')}:</Typography>
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
              <Typography>
                {translate('pages.calculator.insurance')}:
              </Typography>
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
                  onChange={onChangInputInsurance}
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
              <Typography>
                {translate('pages.calculator.circumstances')}:
              </Typography>
              <RHFTextField
                type='number'
                name='peopleDependent'
                sx={{
                  maxWidth: {
                    xs: 200,
                  },
                }}
              />
              <Typography>({translate('pages.calculator.people')})</Typography>
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
        <Grid
          container
          direction='row'
          sx={{ p: 3 }}
          rowSpacing={6}
          columnSpacing={2}
        >
          <Grid item xs={12} md={6}>
            <Stack
              spacing={1}
              direction='row'
              sx={{ p: 1 }}
              alignItems='center'
            >
              <Typography>
                {translate('pages.calculator.description')} (VND){' '}
              </Typography>
              <CopyClipboard
                value={netSalaryTableText}
                placement='top-start'
                arrow
              >
                <Button variant='contained' color='secondary'>
                  {translate('pages.calculator.copy')}
                </Button>
              </CopyClipboard>
            </Stack>
            <NetSalaryTable
              data={data}
              rateInput={rateInputValue}
              ref={netSalaryTableRef}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack
              spacing={2}
              direction='row'
              sx={{ p: 1 }}
              alignItems='center'
            >
              <Typography>
                {translate('pages.calculator.paid_gross')}
                (VND)
              </Typography>
              <CopyClipboard
                value={totalExpenseTableText}
                placement='top-start'
                arrow
              >
                <Button variant='contained' color='secondary'>
                  {translate('pages.calculator.copy')}
                </Button>
              </CopyClipboard>
            </Stack>
            <TotalExpenseTable
              data={data}
              rateInput={rateInputValue}
              ref={totalExpenseTableRef}
            />
          </Grid>

          <Grid item xs={12}>
            <Stack
              spacing={1}
              direction='row'
              sx={{ p: 1 }}
              alignItems='center'
            >
              <Typography>
                {translate('pages.calculator.detail_income_tax')}
                (VND){' '}
              </Typography>
              <CopyClipboard
                value={taxrableTableText}
                placement='top-start'
                arrow
              >
                <Button variant='contained' color='secondary'>
                  {translate('pages.calculator.copy')}
                </Button>
              </CopyClipboard>
            </Stack>
            <TaxrableTable
              data={data}
              rateInput={rateInputValue}
              ref={taxrableTableRef}
            />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default CaculatorForm
