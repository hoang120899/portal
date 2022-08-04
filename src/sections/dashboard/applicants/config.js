export const DEFAULT_ROWS_PER_PAGE = 5

export const APPLICANT_TABLE_HEIGHT = 380
export const APPLICANT_TABLE_ROW_HEIGHT = Math.floor(
  APPLICANT_TABLE_HEIGHT / DEFAULT_ROWS_PER_PAGE
)

export const TABLE_MOBILE_HEAD = ({ translate }) => [
  {
    id: 'name',
    label: translate('pages.dashboard.applicants.name'),
    align: 'left',
  },
]
export const TABLE_DESKTOP_HEAD = []
