// components
import Iconify from '@/components/Iconify'
import SvgIconStyle from '@/components/SvgIconStyle'
// config
import { PAGES } from '@/config'
// utils
import { getListRoles } from '@/utils/role'

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

const ROLES = getListRoles()

const sidebarConfig = [
  // GENERAL
  {
    // subheader: 'general v3.4.0',
    items: [
      {
        title: PAGES.Dashboard,
        path: '/dashboard',
        icon: ICONS.dashboard,
        roles: ROLES[PAGES.Dashboard],
      },
      {
        title: PAGES.Notification,
        path: '/notification',
        icon: ICONS.notification,
        roles: ROLES[PAGES.Notification],
      },
      {
        title: PAGES.Task,
        path: '/task',
        icon: ICONS.calendar,
        roles: ROLES[PAGES.Task],
      },
      {
        title: PAGES.Jobs,
        path: '/jobs',
        icon: ICONS.job,
        roles: ROLES[PAGES.Jobs],
      },
      {
        title: PAGES.Clients,
        path: '/clients',
        icon: ICONS.client,
        roles: ROLES[PAGES.Clients],
      },
      {
        title: PAGES.Candidates,
        path: '/candidates',
        icon: ICONS.invoice,
        roles: ROLES[PAGES.Candidates],
      },
      {
        title: PAGES.Users,
        path: '/users',
        icon: ICONS.user,
        roles: ROLES[PAGES.Users],
      },
      {
        title: PAGES.Interview,
        path: '/interview',
        icon: ICONS.interview,
        roles: ROLES[PAGES.Interview],
      },
      {
        title: PAGES.Board,
        path: '/board',
        icon: ICONS.kanban,
        roles: ROLES[PAGES.Board],
      },
      {
        title: PAGES.Caculator,
        path: '/caculator',
        icon: ICONS.caculator,
        roles: ROLES[PAGES.Caculator],
      },
      {
        title: PAGES.Recruiter,
        path: '/recruiter',
        icon: ICONS.recruiter,
        roles: ROLES[PAGES.Recruiter],
      },
      {
        title: PAGES.Blogs,
        path: '/blogs',
        icon: ICONS.blog,
        roles: ROLES[PAGES.Blogs],
      },
    ],
  },
]

export default sidebarConfig
