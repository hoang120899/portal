// @mui
import { Box, Card, Container, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// components
import Image from '@/components/Image'
// import Logo from '@/components/Logo'
import Page from '@/components/Page'
// guards
import GuestGuard from '@/guards/GuestGuard'
import useLocales from '@/hooks/useLocales'
// hooks
import useResponsive from '@/hooks/useResponsive'
// sections
import { LoginForm } from '@/sections/auth/login'

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

export default function Login() {
  const mdUp = useResponsive('up', 'md')
  // const smUp = useResponsive('up', 'sm')
  const { translate } = useLocales()

  return (
    <GuestGuard>
      <Page title='Login'>
        <RootStyle>
          <HeaderStyle>
            {/* <Logo /> */}
            {/* {smUp && (
              <Typography variant='body2' sx={{ mt: { md: -2 } }}>
                Don’t have an account? {''}
                <NextLink href={PATH_AUTH.register} passHref>
                  <Link variant='subtitle2'>Get started</Link>
                </NextLink>
              </Typography>
            )} */}
          </HeaderStyle>

          {mdUp && (
            <SectionStyle>
              <Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
                {translate('pages.login.hi_FETCH')}
              </Typography>
              <Image
                visibleByDefault
                disabledEffect
                src='/assets/illustrations/illustration_login.png'
                alt='login'
              />
            </SectionStyle>
          )}

          <Container maxWidth='sm'>
            <ContentStyle>
              {/* <Image
                visibleByDefault
                disabledEffect
                src='/assets/illustrations/fetch_logo2.png'
                alt='login'
              /> */}
              <Stack direction='row' alignItems='center' sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant='h4' gutterBottom>
                    Welcome to Talent Acquisition Portal
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Enter your details below.
                  </Typography>
                </Box>
              </Stack>
              <LoginForm />

              {/* {!smUp && (
                <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                  Don’t have an account?{' '}
                  <NextLink href={PATH_AUTH.register} passHref>
                    <Link variant='subtitle2'>Get started</Link>
                  </NextLink>
                </Typography>
              )} */}
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  )
}
