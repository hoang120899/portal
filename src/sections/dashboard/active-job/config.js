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

export const TABLE_HEAD = ({ translate }) => [
  {
    id: 'job',
    label: translate('pages.dashboard.activeJobs.job'),
    align: 'left',
  },
  {
    id: 'client',
    label: translate('pages.dashboard.activeJobs.client'),
    align: 'left',
  },
  {
    id: 'team',
    label: translate('pages.dashboard.activeJobs.team'),
    align: 'left',
  },
  {
    id: 'candidate',
    label: translate('pages.dashboard.activeJobs.candidate'),
    align: 'left',
  },
  {
    id: 'status',
    label: translate('pages.dashboard.activeJobs.status'),
    align: 'left',
  },
]

export const DEFAULT_ROW_PER_PAGE = 5
export const HEIGHT_TABLE_JOBS = 395
