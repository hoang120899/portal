import { format } from 'date-fns'

import { _3ND_MONTH_AGO } from '@/config'

export const DEFAULT_DATE_START = format(_3ND_MONTH_AGO, 'yyyy-MM-dd')

export const DEFAULT_DATE_END = format(Date.now(), 'yyyy-MM-dd')
