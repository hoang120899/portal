import React from 'react'

import { Container, Typography } from '@mui/material'

// components
import Page from '@/components/Page'
// hooks
import useSettings from '@/hooks/useSettings'
// layouts
import Layout from '@/layouts'

PageOne.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}

export default function PageOne() {
  const { themeStretch } = useSettings()

  return (
    <Page title='Board'>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant='h3' component='h1' paragraph>
          Board
        </Typography>
      </Container>
    </Page>
  )
}
