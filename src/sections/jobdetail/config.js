export const SEARCH_FIELD = {
  EMAIL: 'email',
  PHONE: 'phone',
  NAME: 'name',
  TEXT: 'text',
  JOB_ID: 'jobId',
  SKILL: 'skill',
}
export const DETAIL_FIELD = {
  NAME: 'name',
  JOB_NAME: 'jobId',
  LOCATION: 'location',
  CLIENT_ID: 'clientId',
  EMAIl: 'email',
  PHONE: 'phone',
  APPROACH_DATE: 'approachDate',
  LINK_CV: 'linkCV',
  POSITION: 'position',
  LANE: 'laneId',
  NOTE_APPROACH: 'noteApproach',
}
export const TABLE_DESKTOP_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'phone', label: 'Phone', align: 'left' },
  { id: 'time_apply', label: 'Time apply', align: 'left' },
  { id: 'job_apply', label: 'Job apply', align: 'left' },
  { id: 'source', label: 'Source', align: 'left' },
  { id: 'column', label: 'Column', align: 'left' },
  { id: 'follower', label: 'Follower', align: 'left' },
]

export const TABLE_MOBILE_HEAD = [{ id: 'name', label: 'Name', align: 'left' }]

export const ACTIVITY_STATUS = {
  UPDATE_JOB: 'update_job',
}

export const TABLE_HEAD_CANDIDATE_DESKTOP = ({ translate }) => [
  {
    id: 'name',
    label: String(translate('pages.jobs.name')).toUpperCase(),
    align: 'left',
  },
  {
    id: 'fllower',
    label: String(translate('pages.jobs.followers')).toUpperCase(),
    align: 'left',
  },
  {
    id: 'actions',
    label: String(translate('pages.jobs.actions')).toUpperCase(),
    align: 'right',
  },
]

export const TABLE_HEAD_CANDIDATE_MOBILE = ({ translate }) => [
  {},
  {
    id: 'name',
    label: String(translate('pages.jobs.name')).toUpperCase(),
    align: 'left',
  },
  {
    id: 'actions',
    label: String(translate('pages.jobs.actions')).toUpperCase(),
    align: 'right',
  },
]

export const CARD_TRELLO_MODAL = 'card_trello_modal'

export const LIST_CANDIDATE_DEFAULT_VALUE = {
  status: '',
}

export const JOB_DETAIL_HEAD_COLOR = {
  SALARY: '#ffa800',
  LOCATION: '#f64e60',
  TIME: '#3699ff',
}
