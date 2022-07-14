import React, { useState } from 'react'

import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'

import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { FormProvider, RHFTextField } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

import { getSalary } from './salarySlice'

const initialValues = {
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

  const [isOpen, setIsOpen] = useState(false)

  const { enqueueSnackbar } = useSnackbar()
  const EventSchema = Yup.object().shape({
    salary: Yup.string().max(5000).required('Salary is required'),
  })

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: initialValues,
  })
  const { handleSubmit } = methods

  const handleChangeInsurance = () => {
    setInsuranceOther(true)
  }

  const handleChangeOther = () => {
    setInsuranceOther(!insuranceOther)
  }

  const handleChangeOpen = () => {
    setIsOpen(true)
  }
  const onSubmit = async (data) => {
    try {
      const dataSending = {
        salary: data.salary,
        insuraneMoney: data.insuraneMoney,
        pvi: data.pvi,
        peopleDependent: data.peopleDependent,
        type: data.type,
      }
      await dispatch(getSalary(dataSending))
      enqueueSnackbar(translate('Get success!'))
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={8} direction='row' sx={{ p: 3 }}>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Typography>Salary:</Typography>
            <RHFTextField
              type='number'
              name='salary'
              sx={{ minWidth: 220 }}
              label='VD: 10,000,000'
            />
          </Stack>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Typography>SGD:</Typography>
            <RHFTextField type='number' name='sgd' sx={{ minWidth: 220 }} />
          </Stack>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Typography>Exchange rate:</Typography>
            <RHFTextField type='number' name='rate' sx={{ maxWidth: 220 }} />
          </Stack>
        </Stack>

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
                InputProps={{ disabled: insuranceOther }}
              />
              <Typography sx={{ p: 1 }}>(VND)</Typography>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Stack direction='row' sx={{ p: 3, paddingRight: 65 }}>
          <Grid container direction='row' alignItems='center'>
            <Typography>PVI:</Typography>
            <RHFTextField
              type='number'
              name='pvi'
              sx={{ paddingLeft: 2, maxWidth: 220 }}
            />
          </Grid>
          <Grid container direction='row' alignItems='center'>
            <Typography>Circumstances:</Typography>
            <RHFTextField
              type='number'
              name='peopleDependent'
              sx={{ paddingLeft: 2, maxWidth: 220 }}
            />
            <Typography>(people)</Typography>
          </Grid>
        </Stack>
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
            onClick={handleChangeOpen}
          >
            GROSS → NET
          </Button>
          <Button type='submit' variant='contained' onClick={handleChangeOpen}>
            NET → GROSS
          </Button>
        </Stack>
      </FormProvider>
      <Grid>
        {isOpen ? (
          <Grid>
            <Stack direction='row' sx={{ p: 3, paddingTop: 10 }} spacing={2}>
              <Grid container>
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
                <TableContainer component={Paper} sx={{ paddingTop: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          GROSS Salary
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.gross}(SGD: 7)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Social insurance (8 %)
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.bhxh}(SGD: 7)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Health Insurance (1.5 %)
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.bhyt}(SGD: 7)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          UnEmployment Insurance (1 %)
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.companyBhtn}(SGD: 7)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Taxable Income
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.tnct}(SGD: 7)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Personal income tax
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.tncn}(SGD: 7)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Net salary
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.net}(SGD: 7)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid container>
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
                <TableContainer sx={{ paddingTop: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          GROSS Salary
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.gross}(SGD: 7)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Social insurance (17.5%)
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.companyBhxh}(SGD: 7)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Health Insurance (3%)
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.companyBhyt}(SGD: 7)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          UnEmployment Insurance (1 %)
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.bhtn}(SGD: 7)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Pvi care
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.pvi}(SGD: 7)
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Union tax
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.unionTax}(SGD: 7)
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>
                          Total expense
                        </TableCell>
                        <TableCell align='right'>
                          VND: {data.total}(SGD: 7)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Grid>
            </Stack>

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
              <TableContainer sx={{ paddingTop: 3 }}>
                <Table>
                  <TableHead>
                    <TableCell>Taxable rate</TableCell>
                    <TableCell>Tax</TableCell>
                    <TableCell>Money</TableCell>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography>Up to 5 million VND</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>5%</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.percent5}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography>
                          Over 5 million VND to 10 million VND
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>10%</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.percent10}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography>
                          From over 10 million VND to 18 million VND
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>15%</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.percent15}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography>
                          From over 18 million VND to 32 million VND
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>20%</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.percent20}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography>
                          From over 32 million VND to 52 million VND
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>25%</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.percent25}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography>
                          From over 52 million VND to 80 million VND
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>30%</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.percent30}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography>Over 80 million VND</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>35%</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{data.percent35}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
