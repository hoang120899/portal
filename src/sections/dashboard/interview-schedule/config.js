export const TEXT_COLORS = [
  '#ee5253',
  '#27ae60',
  '#5f27cd',
  '#f368e0',
  '#ff6348',
]

export const TABLE_DESKTOP_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'link_zoom', label: 'Link zoom', align: 'left' },
  { id: 'location', label: 'Location', align: 'left' },
  { id: 'time_start', label: 'Time start', align: 'left' },
  { id: 'time_end', label: 'Time end', align: 'left' },
]

export const TABLE_MOBILE_HEAD = [{ id: 'name', label: 'Name', align: 'left' }]

export const CALENDAR_CONFIG = {
  initialDate: new Date(),
  rerenderDelay: 10,
  initialView: 'dayGridMonth',
  dayMaxEventRows: 1,
  headerToolbar: false,
  allDayMaintainDuration: true,
  eventResizableFromStart: true,
}
