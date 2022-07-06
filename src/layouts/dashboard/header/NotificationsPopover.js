import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

// @mui
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from '@mui/material'

import { noCase } from 'change-case'
import PropTypes from 'prop-types'

// _mock_
// import { _notifications } from '@/_mock'
// components
import Iconify from '@/components/Iconify'
import MenuPopover from '@/components/MenuPopover'
import Scrollbar from '@/components/Scrollbar'
import { IconButtonAnimate } from '@/components/animate'
// hooks
import useSocket from '@/hooks/useSocket'
import { PATH_DASHBOARD } from '@/routes/paths'
import { PARAMS_ALL_NOTI_HEADER } from '@/sections/notification/config'
import { useGetAdminAllNotifyQuery } from '@/sections/notification/notificationSlice'
// utils
import { fToNow } from '@/utils/formatTime'

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([])
  const { data, isLoading, isFetching } = useGetAdminAllNotifyQuery(
    PARAMS_ALL_NOTI_HEADER
  )
  const { socket } = useSocket()
  const router = useRouter()

  const listNotifications = data?.data?.list

  const totalUnRead = notifications?.filter(
    (item) => item.status === false
  ).length

  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (!socket) return
    socket.on('connect', function () {
      // eslint-disable-next-line no-console
      console.log('Successfully connected!', socket.id)
    })
    // const userId = "f06f0080-0d6c-48e4-8ee8-f151ee476be5"
    // socket.emit("join", userId);
    // socket.on("notification", (noti) => {
    //   console.log(noti);
    // })
  }, [socket])

  useEffect(() => {
    if (data) setNotifications(listNotifications)
  }, [data, listNotifications])

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleMarkAllAsRead = () => {
    // setNotifications(
    //   notifications.map((notification) => ({
    //     ...notification,
    //     isUnRead: false,
    //   }))
    // )
  }

  const handleNavigateNotificationPage = () => {
    router.push(PATH_DASHBOARD.notification)
    handleClose()
  }

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color='error'>
          <Iconify icon='eva:bell-fill' width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>Notifications</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=' Mark all as read'>
              <IconButton color='primary' onClick={handleMarkAllAsRead}>
                <Iconify icon='eva:done-all-fill' width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        {isLoading || isFetching ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 2,
              px: 2.5,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
            {totalUnRead > 0 && (
              <List
                disablePadding
                subheader={
                  <ListSubheader
                    disableSticky
                    sx={{ py: 1, px: 2.5, typography: 'overline' }}
                  >
                    New
                  </ListSubheader>
                }
              >
                {notifications
                  .slice(0, totalUnRead)
                  .map(
                    (notification) =>
                      !notification.status && (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                        />
                      )
                  )}
              </List>
            )}
            {totalUnRead < 5 && (
              <List
                disablePadding
                subheader={
                  <ListSubheader
                    disableSticky
                    sx={{ py: 1, px: 2.5, typography: 'overline' }}
                  >
                    Before that
                  </ListSubheader>
                }
              >
                {notifications
                  .slice(totalUnRead, totalUnRead ? totalUnRead + 3 : 3)
                  .map(
                    (notification) =>
                      notification.status && (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                        />
                      )
                  )}
              </List>
            )}
          </Scrollbar>
        )}
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            disableRipple
            onClick={handleNavigateNotificationPage}
          >
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  )
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    // createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    status: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
}

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification)

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.status && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant='caption'
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify
              icon='eva:clock-outline'
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  )
}

function renderContent(notification) {
  const title = (
    <Typography variant='subtitle2'>
      {notification.content.title}
      <Typography
        component='span'
        variant='body2'
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {noCase(notification.content.message)}
      </Typography>
    </Typography>
  )

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.content.title}
          src='https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_package.svg'
        />
      ),
      title,
    }
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.content.title}
          src='https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_shipping.svg'
        />
      ),
      title,
    }
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.content.title}
          src='https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_mail.svg'
        />
      ),
      title,
    }
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.content.title}
          src='https://minimal-assets-api-dev.vercel.app/assets/icons/ic_notification_chat.svg'
        />
      ),
      title,
    }
  }
  return {
    avatar: notification.User.linkAvatar ? (
      <img
        alt={notification.content.title}
        src={notification.User.linkAvatar}
      />
    ) : null,
    title,
  }
}
