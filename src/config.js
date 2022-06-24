// routes
import { PATH_DASHBOARD } from '@/routes/paths'

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard

// LAYOUT
export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
}

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
}

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
}

// SETTINGS
// Please remove `localStorage` when you change settings.

export const cookiesExpires = 3

export const cookiesKey = {
  themeMode: 'themeMode',
  themeLayout: 'themeLayout',
  themeStretch: 'themeStretch',
  themeContrast: 'themeContrast',
  themeDirection: 'themeDirection',
  themeColorPresets: 'themeColorPresets',
}

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'horizontal',
  themeColorPresets: 'default',
  themeStretch: false,
}

// PAGINATION
export const PAGINATION = [5, 10, 25]

export const defaultPagination = PAGINATION[1] // 10

// DATETIME FORMAT
export const DATE_FORMAT = 'dd/MM/yyyy'
export const DATETIME_FORMAT = 'dd/MM/yyyy hh:mm'
export const DATETIME_FORMAT_AMPM = 'dd/MM/yyyy hh:mm a'

// User setting
export const PAGES = {
  Dashboard: 'Dashboard',
  Notification: 'Notification',
  Candidates: 'Candidates',
  Interview: 'Interview',
  Board: 'Board',
  Caculator: 'Caculator',
  Recruiter: 'External recruiter',
  Jobs: 'Jobs',
  Clients: 'Clients',
  Users: 'Users',
  Task: 'Task',
  Blogs: 'Blogs',
}

// ROLE AND PERMISSION
export const ROLE = {
  DIRECTOR: 'Director',
  LEADER: 'Leader',
  MEMBER: 'Member',
  ADMIN: 'Admin',
  BLOGER: 'Bloger',
}

export const ROLE_BY_PAGES = [
  {
    pageNames: [
      PAGES.Dashboard,
      PAGES.Notification,
      PAGES.Candidates,
      PAGES.Interview,
      PAGES.Board,
      PAGES.Caculator,
      PAGES.Recruiter,
    ],
    roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER],
  },
  {
    pageNames: [PAGES.Jobs, PAGES.Clients, PAGES.Users],
    roles: [ROLE.DIRECTOR, ROLE.LEADER],
  },
  {
    pageNames: [PAGES.Task],
    roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER, ROLE.ADMIN],
  },
  {
    pageNames: [PAGES.Blogs],
    roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER, ROLE.BLOGER],
  },
]
