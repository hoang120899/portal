export const ACTIVE_STATUS = 'Active'
export const PENDING_STATUS = 'Pending'
export const CLOSE_STATUS = 'Close'

export const STATUS_OPTIONS = [ACTIVE_STATUS, PENDING_STATUS, CLOSE_STATUS]
export const STATUS_COLOR = {
  [ACTIVE_STATUS]: '#00b300',
  [PENDING_STATUS]: 'primary',
  [CLOSE_STATUS]: 'error',
}

export const DEFAULT_STATUS = ACTIVE_STATUS
export const DEFAULT_STATUS_COLOR = STATUS_COLOR[PENDING_STATUS]

export const TABLE_HEAD = [
  { id: 'job', label: 'Jobs', align: 'left' },
  { id: 'client', label: 'Clients', align: 'left' },
  { id: 'team', label: 'Teams', align: 'left' },
  { id: 'candidate', label: 'Candidates', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
]

export const DEFAULT_ROW_PER_PAGE = 5
