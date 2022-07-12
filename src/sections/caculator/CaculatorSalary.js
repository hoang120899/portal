import React from 'react'

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
  Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'

const CaculatorSalary = () => (
  <Grid sx={{ paddingLeft: 3 }}>
    <Card sx={{ maxWidth: 1350 }}>
      <Stack sx={{ width: '100%', p: 3 }} spacing={2}>
        <Alert severity='warning'>
          Salary calculator tool Gross to Net / Net to Gross standard 2021
        </Alert>
      </Stack>
      <Stack direction='row' sx={{ p: 3, paddingRight: 35 }}>
        <Grid container direction='row' alignItems='center'>
          <Typography>Salary:</Typography>
          <TextField sx={{ paddingLeft: 2, maxWidth: 220 }} />
        </Grid>
        <Grid container direction='row' alignItems='center'>
          <Typography>SGD:</Typography>
          <TextField sx={{ paddingLeft: 2, maxWidth: 220 }} />
        </Grid>
        <Grid container direction='row' alignItems='center'>
          <Typography>Exchange rate:</Typography>
          <TextField sx={{ paddingLeft: 2, maxWidth: 220 }} />
        </Grid>
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
            />
            <FormControlLabel value='other' control={<Radio />} label='other' />
            <TextField sx={{ maxWidth: 220 }} />
            <Typography sx={{ p: 1 }}>(VND)</Typography>
          </RadioGroup>
        </FormControl>
      </Grid>

      <Stack direction='row' sx={{ p: 3, paddingRight: 60 }}>
        <Grid container direction='row' alignItems='center'>
          <Typography>PVI:</Typography>
          <TextField sx={{ paddingLeft: 2, maxWidth: 220 }} />
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
        <Button variant='contained'> GROSS → NET</Button>
        <Button variant='contained'> NET → GROSS</Button>
      </Stack>

      <Stack direction='row' sx={{ p: 3 }} spacing={2}>
        <Grid container>
          <Grid container direction='row' sx={{ p: 1 }} alignItems='center'>
            <Typography>Description (VND) </Typography>
            <Button variant='contained'>Copy to clipboard</Button>
          </Grid>
          <TableContainer component={Paper} sx={{ paddingTop: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid container>
          <Grid container direction='row' sx={{ p: 1 }} alignItems='center'>
            <Typography>Description (VND) </Typography>
            <Button variant='contained'>Copy to clipboard</Button>
          </Grid>
          <TableContainer sx={{ paddingTop: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GROSS Salary</TableCell>
                  <TableCell align='right'>VND: 120,000(SGD: 7)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Stack>

      <Grid container sx={{ p: 3 }}>
        <Grid container direction='row' sx={{ p: 1 }} alignItems='center'>
          <Typography>Description (VND) </Typography>
          <Button variant='contained'>Copy to clipboard</Button>
        </Grid>
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
                  <Typography>Over 5 million VND to 10 million VND</Typography>
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
    </Card>
  </Grid>
)

export default CaculatorSalary
