// @mui
import { enUS, viVN } from '@mui/material/locale'

// routes
import { PATH_DASHBOARD } from '@/routes/paths'

export const DOMAIN_SERVER_API = process.env.NEXT_PUBLIC_HOST_API_KEY || ''

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard

export const DASHBOARD_TABLE_HEIGHT = 500

// LAYOUT
export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
}

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 220,
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
  themeColorPresets: 'yellow',
  themeStretch: false,
}

// PAGINATION
export const PAGINATION = [10, 20, 50, 100]

export const defaultPagination = PAGINATION[0] // 10

// DATETIME FORMAT
export const DATE_FORMAT = 'dd/MM/yyyy'
export const DATE_YEAR_MONTH_DAY_FORMAT = 'yyyy-MM-dd'
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'
export const DATETIME_FORMAT_AMPM = 'dd/MM/yyyy hh:mm a'
export const DATE_FORMAT_DAY_MONTH = 'do MMM'
export const CALANDER_DATE_FORMAT = 'MM/dd/yyyy'
export const TIMEZONE = 'Asia/Ho_Chi_Minh'

// User setting
export const PAGES = {
  Dashboard: 'Dashboard',
  Notification: 'Notification',
  Candidates: 'Candidates',
  Interview: 'Interview',
  Board: 'Board',
  Calculator: 'Calculator',
  Recruiter: 'External recruiter',
  Jobs: 'Jobs',
  Clients: 'Clients',
  Users: 'Users',
  Task: 'Task',
  Blogs: 'Blogs',
  Account: 'Account',
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
      PAGES.Jobs,
      PAGES.Candidates,
      PAGES.Interview,
      PAGES.Board,
      PAGES.Calculator,
      // PAGES.Recruiter,
    ],
    roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER],
  },
  // {
  //   pageNames: [PAGES.Task],
  //   roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER, ROLE.ADMIN],
  // },
  {
    pageNames: [PAGES.Users, PAGES.Clients],
    roles: [ROLE.DIRECTOR, ROLE.LEADER],
  },
]

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'Vietnamese',
    value: 'vn',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
]

export const defaultLang = allLangs[0] // English
export const MAX_SIZE_FILEIMAGE = 5145728
