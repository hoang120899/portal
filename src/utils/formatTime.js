import {
  endOfWeek,
  format,
  formatDistanceToNow,
  getTime,
  startOfWeek,
} from 'date-fns'

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

export function fDateCalendar(date) {
  // use with date input format dd/MM/yyyy
  try {
    const convertDate = date?.split('/') || []
    if (convertDate.length < 3) return new Date()
    return new Date(`${convertDate[1]}/${convertDate[0]}/${convertDate[2]}`)
  } catch (error) {
    return new Date()
  }
}

export function fDateStartOfWeek(date) {
  return startOfWeek(date)
}

export function fDateEndOfWeek(date) {
  return endOfWeek(date)
}
