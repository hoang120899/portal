import palette from '@/theme/palette'
import { pxToRem } from '@/utils/getFontValue'

export const TABLE_HEAD = ({ translate }) => [
  { id: 'title', label: translate('pages.jobs.title'), align: 'left' },
  { id: 'client', label: translate('pages.jobs.client'), align: 'left' },
  { id: 'time', label: translate('pages.jobs.time'), align: 'left' },
  { id: 'salary', label: translate('pages.jobs.salary'), align: 'left' },
  { id: 'type', label: translate('pages.jobs.type'), align: 'left' },
  { id: 'status', label: translate('pages.jobs.status'), align: 'left' },
  { id: 'actions', label: translate('pages.jobs.actions'), align: 'left' },
]

export const TABLE_HEAD_MOBILE = ({ translate }) => [
  { id: 'emtpy_cell', label: translate(''), align: 'left' },
  { id: 'title', label: translate('pages.jobs.title'), align: 'left' },
  { id: 'client', label: translate('pages.jobs.client'), align: 'left' },
]

export const JOB_ALL_STATUS = 'All'
export const JOB_ACTIVE_STATUS = 'Active'
export const JOB_CLOSE_STATUS = 'Close'
export const JOB_PENDING_STATUS = 'Pending'
export const JOB_ARCHIVE_STATUS = 'Archive'

export const JOB_STATUS_OPTIONS = [
  JOB_ACTIVE_STATUS,
  JOB_CLOSE_STATUS,
  JOB_PENDING_STATUS,
  JOB_ARCHIVE_STATUS,
]

export const JOB_STATUS_COLORS = {
  active: palette.light.primary.main,
  close: palette.light.error.main,
  pending: palette.light.warning.main,
  archive: palette.light.info.main,
}

export const JOB_TYPE_OPTIONS = [
  { value: 'Full time', label: 'Full time' },
  { value: 'Part time', label: 'Part time' },
  { value: 'Freelance', label: 'Freelance' },
]

export const JOB_EDITOR_DEFAULT_TEXT = (primaryColor = '#FCCC4B') => ({
  aboutFetch: `<h2><span style="color: ${primaryColor};font-size: ${pxToRem(
    16
  )};"><strong>1. INTRODUCTION</strong></span></h2><h3 style="font-size: ${pxToRem(
    16
  )};"><strong>a. About Fetch:</strong></h3>
  <p>Fetch Technology Vietnam is a comprehensive global provider of HR and Talent Acquisition Services, focusing primarily in the technology fields. Founded in 2016, Fetch Technology Vietnam helps foreign companies of all types and sizes reach their potential by providing the talent and support to efficiently build and scale a high-performing, distributed workforce in Vietnam.</p>
  <p>Our mission is to offer Vietnam’s most talented technologists a platform to connect with some of the world’s leading tech companies and build their expertise on a global scale. Over 4 years, Fetch has built a good reputation and is trusted by many Vietnamese and foreign companies; And Fetch will continue its good work to bridge the divide between the World and the Vietnam Tech sector.</p>`,
  responsibilities: `<h2 style="font-size: ${pxToRem(
    16
  )};"><span style="color: ${primaryColor};"><strong>2. RESPONSIBILITIES</strong></span></h2><br/>`,
  requirement: `<h2 style="font-size: ${pxToRem(
    16
  )};"><span style="color: ${primaryColor};"><strong>3. REQUIREMENT</strong></span></h2><br/>`,
  benefit: `<h2 style="font-size: ${pxToRem(
    16
  )};"><span style="color: ${primaryColor};"><strong>4. WHY YOU‘LL LOVE WORKING HERE</strong></span></h2><br/>`,
  niceToHave: `<p></p>`,
})

export const JOB_FORM_STICKY_BAR_COLOR = {
  LIGHT: {
    COLOR: '#fff',
    SHADOW: '#d8d8d8',
  },
  DARK: {
    COLOR: '#212b36',
    SHADOW: '#3e474f',
  },
}

export const REPLACE_LABEL_TYPE = (type) => type.replace(/ /g, '-')
