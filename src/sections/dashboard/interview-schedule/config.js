export const TEXT_COLORS = [
  '#ee5253',
  '#27ae60',
  '#5f27cd',
  '#f368e0',
  '#ff6348',
]

export const TABLE_DESKTOP_HEAD = ({ translate }) => [
  {
    id: 'name',
    label: translate('pages.dashboard.interviewSchedule.name'),
    align: 'left',
  },
  {
    id: 'link_zoom',
    label: translate('pages.dashboard.interviewSchedule.linkZoom'),
    align: 'left',
  },
  {
    id: 'location',
    label: translate('pages.dashboard.interviewSchedule.location'),
    align: 'left',
  },
  {
    id: 'time_start',
    label: translate('pages.dashboard.interviewSchedule.timeStart'),
    align: 'left',
  },
  {
    id: 'time_end',
    label: translate('pages.dashboard.interviewSchedule.timeEnd'),
    align: 'left',
  },
]

export const TABLE_MOBILE_HEAD = ({ translate }) => [
  {
    id: 'name',
    label: translate('pages.dashboard.interviewSchedule.name'),
    align: 'left',
  },
]

export const CALENDAR_CONFIG = {
  initialDate: new Date(),
  rerenderDelay: 10,
  initialView: 'dayGridMonth',
  dayMaxEventRows: 1,
  headerToolbar: false,
  allDayMaintainDuration: true,
  eventResizableFromStart: true,
}
