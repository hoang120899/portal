import { format, formatDistanceToNow, getTime } from 'date-fns'

import { DATE_FORMAT } from '@/config'

export function fDate(date) {
  return format(new Date(date), DATE_FORMAT)
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy p')
}

export function fTimestamp(date) {
  return getTime(new Date(date))
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p')
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  })
}
