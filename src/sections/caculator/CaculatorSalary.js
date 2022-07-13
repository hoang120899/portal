import React, { useState } from 'react'

import {
  Alert,
  Button,
  Card,
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
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'

const CaculatorSalary = () => {
  const [insuranceOther, setInsuranceOther] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const handleChangeInsurance = () => {
    setInsuranceOther(true)
  }

  const handleChangeOther = () => {
    setInsuranceOther(!insuranceOther)
  }

  const handleChangeOpen = () => {
    setIsOpen(true)
  }
  return (
    <Grid sx={{ paddingLeft: 3 }}>
      <Card sx={{ maxWidth: 1350 }}>
        <Stack sx={{ width: '100%', p: 3 }} spacing={2}>
          <Alert severity='warning'>
            Salary calculator tool Gross to Net / Net to Gross standard 2021
          </Alert>
        </Stack>
        <Stack spacing={8} direction='row' sx={{ p: 3 }}>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Typography>Salary:</Typography>
            <TextField sx={{ minWidth: 220 }} label='VD: 10,000,000' />
          </Stack>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Typography>SGD:</Typography>
            <TextField sx={{ minWidth: 220 }} />
          </Stack>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Typography>Exchange rate:</Typography>
            <TextField sx={{ maxWidth: 220 }} defaultValue='17300' />
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
            {/* <FormLabel>Insurance:</FormLabel> */}
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              alignItems='center'
            >
              <FormControlLabel
                value='fullwage'
                control={<Radio />}
                label='Full Wage'
                onChange={handleChangeInsurance}
              />
              <FormControlLabel
                value='other'
                control={<Radio />}
                label='other'
                onChange={handleChangeOther}
              />
              <TextField sx={{ maxWidth: 220 }} disabled={insuranceOther} />
              <Typography sx={{ p: 1 }}>(VND)</Typography>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Stack direction='row' sx={{ p: 3, paddingRight: 65 }}>
          <Grid container direction='row' alignItems='center'>
            <Typography>PVI:</Typography>
            <TextField
              sx={{ paddingLeft: 2, maxWidth: 220 }}
              defaultValue='250000'
            />
          </Grid>
          <Grid container direction='row' alignItems='center'>
            <Typography>Circumstances:</Typography>
            <TextField sx={{ paddingLeft: 2, maxWidth: 220 }} />
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
            variant='contained'
            color='secondary'
            onClick={handleChangeOpen}
          >
            GROSS → NET
          </Button>
          <Button variant='contained'> NET → GROSS</Button>
        </Stack>

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
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Social insurance (8 %)
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Health Insurance (1.5 %)
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            UnEmployment Insurance (1 %)
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Taxable Income
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Personal income tax
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Net salary
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
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
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Social insurance (17.5%)
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Health Insurance (3%)
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            UnEmployment Insurance (1 %)
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Pvi care
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Union tax
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            Total expense
                          </TableCell>
                          <TableCell align='right'>
                            VND: 120,000(SGD: 7)
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
                          <Typography>250,000</Typography>
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
                          <Typography>190,000</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography>
                            From over 10 million VND to 18 million VND
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>5%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>250,000</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography>
                            From over 18 million VND to 32 million VND
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>5%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>250,000</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography>
                            From over 32 million VND to 52 million VND
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>5%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>250,000</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography>
                            From over 52 million VND to 80 million VND
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>5%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>250,000</Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography>Over 80 million VND</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>5%</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>250,000</Typography>
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
      </Card>
    </Grid>
  )
}

export default CaculatorSalary
