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
import useAuth from '@/hooks/useAuth'
// hooks
import useRole from '@/hooks/useRole'
import useSocket from '@/hooks/useSocket'
import { PATH_DASHBOARD } from '@/routes/paths'
import {
  useGetAdminAllNotifyQuery,
  useUpdateAdminReadAllNotifyMutation,
} from '@/sections/notification/notificationSlice'
// utils
import { fToNow } from '@/utils/formatTime'
import uuidv4 from '@/utils/uuidv4'

const PAGE_SIZE = 12
const PAGE_NUMBER = 1
const NOTI_SIZE = 5

export default function NotificationsPopover() {
  const { currentRole } = useRole()
  const [notifications, setNotifications] = useState([])
  const { data, isLoading, isFetching } = useGetAdminAllNotifyQuery({
    pageSize: PAGE_SIZE,
    pageNumber: PAGE_NUMBER,
    currentRole,
  })
  const [updateAdminReadAllNotify] = useUpdateAdminReadAllNotifyMutation()

  const { socket } = useSocket()
  const router = useRouter()
  const { user } = useAuth()

  const userId = user?.userId
  const listNotifications = data?.data?.list

  const totalUnRead = notifications?.filter(
    (item) => item.status === false
  ).length

  const [open, setOpen] = useState(null)

  useEffect(() => {
    setNotifications(listNotifications ? listNotifications : [])
  }, [listNotifications])

  useEffect(() => {
    if (!socket) return
    socket.emit('join', userId)
    socket.on('notification', (noti) => {
      noti.content.id = uuidv4() // unique id notification for the same card content in board
      noti.content.createdAt = new Date()
      setNotifications((prevState) => [noti.content, ...prevState])
    })
  }, [socket, userId])

  const handleOpen = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  const handleMarkAllAsRead = () => {
    updateAdminReadAllNotify()
      .unwrap()
      .then((isSuccess) => {
        isSuccess
          ? setNotifications(
              notifications.map((notification) => ({
                ...notification,
                status: true,
              }))
            )
          : {}
      })
  }

  const handleForwardNotification = (type, id) => {
    handleMarkAllAsRead()
    switch (type) {
      case 'assignJob':
        router.push(`/job-detail/${id}`)
        break
      case 'assignCard':
        router.push(`/board`)
        break
      case 'assignTask':
        router.push(`/`)
        break
      case 'jobOverTime':
        router.push(`/404`)
        break

      default:
        router.push(`/notification`)
        break
    }
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
        <Badge
          badgeContent={totalUnRead > NOTI_SIZE ? `${NOTI_SIZE}+` : totalUnRead}
          color='error'
        >
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
              You have {totalUnRead > NOTI_SIZE ? `${NOTI_SIZE}+` : totalUnRead}{' '}
              unread messages
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
                  .slice(0, totalUnRead > NOTI_SIZE ? NOTI_SIZE : totalUnRead)
                  .map(
                    (notification) =>
                      !notification.status && (
                        <NotificationItem
                          key={notification.id || notification.content.id}
                          notification={notification}
                          handleForwardNotification={handleForwardNotification}
                        />
                      )
                  )}
              </List>
            )}
            {totalUnRead < NOTI_SIZE && (
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
                  .slice(totalUnRead, NOTI_SIZE)
                  .map(
                    (notification) =>
                      notification.status && (
                        <NotificationItem
                          key={notification.id || notification.content.id}
                          notification={notification}
                          handleForwardNotification={handleForwardNotification}
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
    createdAt: PropTypes.string,
    id: PropTypes.string,
    status: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
}

function NotificationItem({ notification, handleForwardNotification }) {
  const { avatar, title } = renderContent(notification)
  const { type } = notification

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
      onClick={() => handleForwardNotification(type, notification.content.id)}
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
            {fToNow(notification?.createdAt)}
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
    avatar: notification.User?.linkAvatar ? (
      <img
        alt={notification.content.title}
        src={notification.User?.linkAvatar}
      />
    ) : null,
    title,
  }
}
