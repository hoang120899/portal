// @mui
import { Box, Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// assets
import SentIcon from '@/assets/icon_sent'
// components
import Page from '@/components/Page'
// layouts
import Layout from '@/layouts'
// sections
import { NewPasswordForm } from '@/sections/auth/new-password'

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

NewPassword.getLayout = function getLayout(data, page) {
  return (
    <Layout variant='logoOnly' {...data}>
      {page}
    </Layout>
  )
}

export default function NewPassword() {
  return (
    <Page title='New Password'>
      <Container>
        <ContentStyle sx={{ textAlign: 'center' }}>
          <SentIcon sx={{ mb: 5, mx: 'auto', height: 120 }} />

          <Typography variant='h3' gutterBottom>
            Request sent successfully!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            We've sent a 6-digit confirmation email to your email.
            <br />
            Please enter the code in below box to verify your email.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <NewPasswordForm />
          </Box>

          <Typography variant='body2'>
            Don’t have a code? &nbsp;
            <Link variant='subtitle2' onClick={() => {}}>
              Resend code
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  )
}
