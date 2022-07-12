import { useState } from 'react'

// next
import NextLink from 'next/link'
import { useRouter } from 'next/router'

// @mui
import {
  Avatar,
  Box,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

import { useSnackbar } from 'notistack'

// components
import MenuPopover from '@/components/MenuPopover'
import { IconButtonAnimate } from '@/components/animate'
// hooks
import useAuth from '@/hooks/useAuth'
import useIsMountedRef from '@/hooks/useIsMountedRef'
import useLocales from '@/hooks/useLocales'
import { useSelector } from '@/redux/store'
import { PATH_AUTH, PATH_DASHBOARD } from '@/routes/paths'

const MENU_OPTIONS = [
  {
    label: 'home',
    linkTo: '/',
  },
  {
    label: 'setting',
    linkTo: PATH_DASHBOARD.profile,
  },
]

export default function AccountPopover() {
  const router = useRouter()
  const { translate } = useLocales()
  const { logout, user } = useAuth()
  const isMountedRef = useIsMountedRef()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(null)
  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }
  const avatar = useSelector((state) => state.avatar)
  const handleLogout = async () => {
    try {
      await logout()
      router.reload(PATH_AUTH.login)

      if (isMountedRef.current) {
        handleClose()
      }
    } catch (error) {
      enqueueSnackbar('Unable to logout!', { variant: 'error' })
    }
  }

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {Object.keys(avatar.avatar).length === 0 ? (
          <Avatar
            src={`${process.env.NEXT_PUBLIC_HOST_API_KEY}/${user.linkAvatar}`}
            alt={user.displayName}
          />
        ) : (
          <Avatar
            src={`${process.env.NEXT_PUBLIC_HOST_API_KEY}/${avatar.avatar}`}
            alt={user.displayName}
          />
        )}
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant='subtitle2' noWrap>
            {user.displayName}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {user.role}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {translate(option.label) || option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {translate('logout') || 'Logout'}
        </MenuItem>
      </MenuPopover>
    </>
  )
}
