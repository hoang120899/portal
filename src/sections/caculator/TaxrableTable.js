import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

const TaxrableTable = ({ data }) => (
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
              <Typography>Over 5 million VND to 10 million VND</Typography>
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
  )

export default TaxrableTable
