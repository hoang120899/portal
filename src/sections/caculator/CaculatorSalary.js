import React from 'react'

import { Alert, Card, Grid, Stack } from '@mui/material'

import useLocales from '@/hooks/useLocales'

import CaculatorForm from './CaculatorForm'

const CaculatorSalary = () => {
  const { translate } = useLocales()
  return (
    <Grid sx={{ paddingLeft: 3 }}>
      <Card sx={{ maxWidth: 1350 }}>
        <Stack sx={{ width: '100%', p: 3 }} spacing={2}>
          <Alert severity='warning'>
            {translate('pages.calculator.title') ||
              'Salary calculator tool Gross to Net / Net to Gross standard 2021'}
          </Alert>
        </Stack>
        <CaculatorForm />
      </Card>
    </Grid>
  )
}

export default CaculatorSalary
