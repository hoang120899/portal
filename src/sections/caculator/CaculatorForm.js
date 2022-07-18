import React, { useEffect, useState } from 'react'

import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { useForm, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { FormProvider, RHFTextField } from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'
import useLocales from '@/hooks/useLocales'

import NetSalaryTable from './NetSalaryTable'
import TaxrableTable from './TaxrableTable'
import TotalExpenseTable from './TotalExpenseTable'
import { getSalary } from './salarySlice'

const initialValues = {
  salary: 0,
  rate: 17300,
  insuraneMoney: 0,
  pvi: 250000,
  peopleDependent: 0,
  type: 0,
}

const CaculatorForm = () => {
  const { translate } = useLocales()
  const dispatch = useDispatch()
  const { data: data } = useSelector((state) => state.salary)
  const [insuranceOther, setInsuranceOther] = useState(false)
  const [salary, setSalary] = useState(0)
  const [submit, setSubmit] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const { enqueueSnackbar } = useSnackbar()
  const EventSchema = Yup.object().shape({
    salary: Yup.string().max(5000).required('Salary is required'),
  })

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: initialValues,
  })
  const { handleSubmit, control, setValue } = methods
  const rateInput = useWatch({ control, name: 'rate' })
  const sgdInput = useWatch({ control, name: 'sgd' })
  const handleChangeInsurance = () => {
    setSalary(false)
    setInsuranceOther(!insuranceOther)
  }

  const handleChangeOther = () => {
    setInsuranceOther(!insuranceOther)
    setSalary(true)
  }

  const handleChangeOpen = (type) => {
    setSubmit(type)
    setIsOpen(true)
  }
  const onSubmit = async (data) => {
    try {
      const dataSending = {
        salary: data.salary,
        insuraneMoney: salary ? data.insuraneMoney : data.salary,
        pvi: data.pvi,
        peopleDependent: data.peopleDependent,
        type: submit ? 0 : 1,
      }
      await dispatch(getSalary(dataSending))
      enqueueSnackbar(translate('Get success!'))
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }
  const resultCalcular = useDebounce(sgdInput, 1000)
  useEffect(() => {
    const handleChangeSGD = () => {
      if (rateInput) {
        const convertSGDVnd = Number(resultCalcular * rateInput)
        setValue('salary', convertSGDVnd)
      }
    }
    handleChangeSGD()
  }, [resultCalcular, rateInput, setValue])

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction='row' sx={{ p: 3 }}>
          <Grid
            container
            direction='row'
            item
            xs={12}
            sm={6}
            md={4}
            alignItems='center'
          >
            <Grid item xs={12} sm={2} md={2} sx={{ paddingTop: 1 }}>
              <Typography>Salary:</Typography>
            </Grid>
            <Grid item xs={12} sm={10} md={10} sx={{ paddingTop: 2 }}>
              <RHFTextField
                type='number'
                name='salary'
                sx={{ maxWidth: 250 }}
                label='VD: 10,000,000'
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            item
            xs={12}
            sm={6}
            md={4}
            alignItems='center'
          >
            <Grid item xs={12} sm={2} sx={{ paddingTop: 1 }}>
              <Typography>SGD:</Typography>
            </Grid>
            <Grid item xs={12} sm={10} sx={{ paddingTop: 2 }}>
              <RHFTextField
                type='number'
                name='sgd'
                sx={{ minWidth: 100, maxWidth: 250 }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction='row'
            item
            xs={12}
            sm={9}
            md={4}
            alignItems='center'
          >
            <Grid item xs={12} sm={3} md={4} sx={{ paddingTop: 1 }}>
              <Typography>Exchange rate:</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={8} sx={{ paddingTop: 2 }}>
              <RHFTextField
                type='number'
                name='rate'
                sx={{ minWidth: 100, maxWidth: 250 }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          direction='row'
          alignItems='center'
          sx={{ paddingLeft: 3 }}
        >
          <Typography>Insurance:</Typography>
          <FormControl direction='row' sx={{ paddingLeft: 2 }}>
            <RadioGroup
              row
              name='insurane'
              aria-labelledby='demo-row-radio-buttons-group-label'
              alignItems='center'
            >
              <FormControlLabel
                value='234'
                control={<Radio />}
                checked={!insuranceOther}
                name='insuraneMoney'
                label='Full Wage'
                onChange={handleChangeInsurance}
              />
              <FormControlLabel
                control={<Radio />}
                checked={insuranceOther}
                label='other'
                onChange={handleChangeOther}
              />
              <RHFTextField
                type='number'
                name='insuraneMoney'
                sx={{ maxWidth: 220 }}
                InputProps={{ disabled: !insuranceOther }}
              />
              <Typography sx={{ p: 1 }}>(VND)</Typography>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid container direction='row' sx={{ p: 3 }}>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            container
            direction='row'
            alignItems='center'
          >
            <Grid container item xs={12} sm={2} md={2} sx={{ paddingTop: 1 }}>
              <Typography>PVI:</Typography>
            </Grid>
            <Grid container item xs={12} sm={10} md={10} sx={{ paddingTop: 1 }}>
              <RHFTextField type='number' name='pvi' sx={{ maxWidth: 250 }} />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={8}
            direction='row'
            alignItems='center'
          >
            <Grid container item xs={12} sm={12} md={2} sx={{ paddingTop: 1 }}>
              <Typography>Circumstances:</Typography>
            </Grid>
            <Grid container item xs={12} sm={4} md={4} sx={{ paddingTop: 1 }}>
              <RHFTextField
                type='number'
                name='peopleDependent'
                sx={{ minWidth: 100, maxWidth: 250 }}
              />
            </Grid>
            <Grid container item xs={12} sm={3}>
              <Typography>(people)</Typography>
            </Grid>
          </Grid>
        </Grid>
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
            onClick={() => handleChangeOpen(true)}
          >
            GROSS → NET
          </Button>
          <Button
            type='submit'
            variant='contained'
            onClick={() => handleChangeOpen(false)}
          >
            NET → GROSS
          </Button>
        </Stack>
      </FormProvider>
      <Grid>
        {isOpen ? (
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
                <NetSalaryTable data={data} rateInput={rateInput} />
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
                <TotalExpenseTable data={data} rateInput={rateInput} />
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
        ) : (
          <Typography />
        )}
      </Grid>
    </>
  )
}

export default CaculatorForm
