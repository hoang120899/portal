import React from 'react'

import {
  Button,
  Card,
  Grid,
  Stack,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'

const CaculatorSalary = () => (
  // <div className='container'>

  //     <FormControl>
  //       <div className='card-body card-body-caculator'>
  //         <div className='form-group mb-8'>
  //           <div className='alert alert-custom alert-default' role='alert'>
  //             <div className='alert-icon'>
  //               <i className='flaticon-warning text-primary' />
  //             </div>
  //             <div className='alert-text'>
  //               Salary calculator tool Gross to Net / Net to Gross standard
  //               2021
  //             </div>
  //           </div>
  //         </div>
  //         <div className='form-group row'>
  //           <div className='col-md-3 input-salary'>
  //             <div className='input-salary__label'>
  //               <span>Salary:</span>
  //             </div>
  //             <div>
  //               <TextField
  //                 name='salary'
  //                 placeholder='VD: 10,000,000'
  //                 className='form-control'
  //                 type='text'
  //               ></TextField>
  //             </div>
  //           </div>
  //           <div className='col-md-3 input-salary'>
  //             <div className='input-salary__label'>
  //               <span>SGD:</span>
  //             </div>
  //             <div>
  //               <TextField
  //                 name='sgd'
  //                 className='form-control custom-input-usd'
  //                 type='text'
  //               ></TextField>
  //             </div>
  //           </div>
  //           <div className='col-md-4 input-salary'>
  //             <div className='input-salary__label'>
  //               <span>Exchange rate:</span>
  //             </div>
  //             <div>
  //               <TextField
  //                 name='tigia'
  //                 className={'form-control'}
  //                 type='text'
  //               ></TextField>
  //             </div>
  //           </div>
  //         </div>

  //         <div className='form-group row'>
  //           <div className='col-md-8 input-salary'>
  //             <div className='input-salary__label'>Insurance:</div>
  //             <div className='div-input-caculator'>
  //               <div className='radio-inline salary-chinhthuc'>
  //                 <label className='radio'>
  //                   <input type='radio' name='radios2' />
  //                   <span></span>
  //                   Full wage
  //                 </label>
  //               </div>
  //               <div className='insurance-group'>
  //                 <div className='radio-inline'>
  //                   <label className='radio'>
  //                     <input type='radio' name='radios2' />
  //                     <span></span>
  //                     Other
  //                   </label>
  //                 </div>
  //                 <TextField
  //                   name='insuraneMoney'
  //                   className='form-control custom-input-bhxh'
  //                   type='text'
  //                 />
  //                 <span className='sub-input-caculator'>(VND)</span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className='form-group row'>
  //           <div className='col-md-3 input-salary'>
  //             <div className='input-salary__label'>PVI:</div>
  //             <div>
  //               <TextField
  //                 name='pvi'
  //                 className='form-control'
  //                 type='number'
  //               />
  //             </div>
  //           </div>
  //           <div className='col-md-4 input-salary'>
  //             <div className='input-salary__label'>Circumstances:</div>
  //             <div>
  //               <TextField
  //                 name='peopleDependent'
  //                 className='form-control'
  //                 type='number'
  //               />
  //             </div>
  //             <span> (people)</span>
  //           </div>
  //         </div>

  //         <div className='footer-caculator'>
  //           <Button
  //             type='button'
  //             className='btn btn-primary btn-custom-caculator'
  //             color="success"
  //             variant="contained"
  //           >
  //             GROSS → NET
  //           </Button>
  //           <Button
  //             type='button'
  //             className='btn btn-warning btn-custom-caculator'
  //             color="success"
  //             variant="contained"
  //           >
  //             NET → GROSS
  //           </Button>
  //         </div>
  //       </div>
  //     </FormControl>

  //   </div>
  // </div>
  <Card sx={{ maxWidth: 1300 }}>
    <Stack direction='row' spacing={3} sx={{ p: 3 }}>
      <Grid container direction='row' alignItems='center'>
        <Typography>Salary:</Typography>
        <TextField />
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <Typography>Salary:</Typography>
        <TextField />
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <Typography>Salary:</Typography>
        <TextField />
      </Grid>
    </Stack>

    <Grid container direction='row' alignItems='center'>
      <Typography>Insurance:</Typography>
      <label>
        <input type='radio' name='radios2' />
        <span> </span>
        Full wage
      </label>
      <label>
        <input type='radio' name='radios2' />
        <span> </span>
        Other
      </label>
      <TextField />
      <Typography>(VND)</Typography>
    </Grid>

    <Stack direction='row' spacing={2} sx={{ p: 3 }}>
      <Grid container direction='row' alignItems='center'>
        <Typography>PVI:</Typography>
        <TextField />
      </Grid>
      <Grid container direction='row' alignItems='center'>
        <Typography>Circumstances:</Typography>
        <TextField />
        <Typography>(people)</Typography>
      </Grid>
    </Stack>

    <Button> GROSS → NET</Button>
    <Button> NET → GROSS</Button>

    <Stack direction='row' spacing={3} sx={{ p: 3 }}>
      <div>
        <Typography>Description (VND)</Typography>
        <Button>Copy to clipboard</Button>
        <Table sx={{ minWidth: 800 }} aria-label='customized table'>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>VND: 12,000,000(SGD: 694)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>VND: 12,000,000(SGD: 694)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>VND: 12,000,000(SGD: 694)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>VND: 12,000,000(SGD: 694)</TableCell>
          </TableRow>
        </Table>
      </div>

      <div>
        <Typography>Description (VND)</Typography>
        <Button>Copy to clipboard</Button>
        <Table sx={{ minWidth: 500 }} aria-label='customized table'>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>VND: 12,000,000(SGD: 694)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>VND: 12,000,000(SGD: 694)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>VND: 12,000,000(SGD: 694)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gross Salary</TableCell>
            <TableCell>VND: 12,000,000(SGD: 694)</TableCell>
          </TableRow>
        </Table>
      </div>
    </Stack>
  </Card>
)

export default CaculatorSalary
