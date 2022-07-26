import { format, subMonths } from 'date-fns'

export const DEFAULT_DATE_START = format(subMonths(Date.now(), 3), 'yyyy-MM-dd')

export const DEFAULT_DATE_END = format(Date.now(), 'yyyy-MM-dd')
export const ISO_DATE_CONDITION = /\d{4}-\d{2}-\d{2}/
