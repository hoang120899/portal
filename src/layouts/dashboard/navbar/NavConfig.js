// components
import Iconify from '@/components/Iconify'
import SvgIconStyle from '@/components/SvgIconStyle'

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
)

const getIconByIconify = (icon) => (
  <Iconify icon={icon} width='100%' height='100%' />
)

const ICONS = {
  blog: getIcon('ic_blog'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  calendar: getIcon('ic_calendar'),
  dashboard: getIcon('ic_dashboard'),
  notification: getIconByIconify('eva:bell-fill'),
  job: getIconByIconify('eva:list-outline'),
  client: getIconByIconify('eva:people-fill'),
  invoice: getIcon('ic_invoice'),
  caculator: getIconByIconify('eva:swap-fill'),
  recruiter: getIconByIconify('eva:external-link-outline'),
  interview: getIconByIconify('eva:video-fill'),
}

const sidebarConfig = [
  // GENERAL
  {
    // subheader: 'general v3.4.0',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard },
      {
        title: 'Notification',
        path: '/notification',
        icon: ICONS.notification,
      },
      { title: 'Task', path: '/task', icon: ICONS.calendar },
      { title: 'Jobs', path: '/jobs', icon: ICONS.job },
      { title: 'Clients', path: '/clients', icon: ICONS.client },
      { title: 'Candidates', path: '/candidates', icon: ICONS.invoice },
      { title: 'Users', path: '/users', icon: ICONS.user },
      { title: 'Interview', path: '/interview', icon: ICONS.interview },
      { title: 'Board', path: '/board', icon: ICONS.kanban },
      { title: 'Caculator', path: '/caculator', icon: ICONS.caculator },
      {
        title: 'External recruiter',
        path: '/recruiter',
        icon: ICONS.recruiter,
      },
      { title: 'Blogs', path: '/blogs', icon: ICONS.blog },
    ],
  },
]

export default sidebarConfig
