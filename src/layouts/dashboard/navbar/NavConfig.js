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
        title: 'nav.dashboard',
        path: '/dashboard',
        icon: ICONS.dashboard,
        roles: ROLES[PAGES.Dashboard],
      },
      {
        title: 'nav.notification',
        path: '/notification',
        icon: ICONS.notification,
        roles: ROLES[PAGES.Notification],
      },
      {
        title: 'nav.task',
        path: '/task',
        icon: ICONS.calendar,
        roles: ROLES[PAGES.Task],
      },
      {
        title: 'nav.jobs',
        path: '/jobs',
        icon: ICONS.job,
        roles: ROLES[PAGES.Jobs],
      },
      {
        title: 'nav.clients',
        path: '/clients',
        icon: ICONS.client,
        roles: ROLES[PAGES.Clients],
      },
      {
        title: 'nav.candidates',
        path: '/candidates',
        icon: ICONS.invoice,
        roles: ROLES[PAGES.Candidates],
      },
      {
        title: 'nav.users',
        path: '/users',
        icon: ICONS.user,
        roles: ROLES[PAGES.Users],
      },
      {
        title: 'nav.interview',
        path: '/interview',
        icon: ICONS.interview,
        roles: ROLES[PAGES.Interview],
      },
      {
        title: 'nav.board',
        path: '/board',
        icon: ICONS.kanban,
        roles: ROLES[PAGES.Board],
      },
      {
        title: 'nav.caculator',
        path: '/caculator',
        icon: ICONS.caculator,
        roles: ROLES[PAGES.Caculator],
      },
      {
        title: 'nav.recruiter',
        path: '/recruiter',
        icon: ICONS.recruiter,
        roles: ROLES[PAGES.Recruiter],
      },
      {
        title: 'nav.blogs',
        path: '/blogs',
        icon: ICONS.blog,
        roles: ROLES[PAGES.Blogs],
      },
    ],
  },
]

export default sidebarConfig
