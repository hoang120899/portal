function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_AUTH = '/auth'
const ROOTS_DASHBOARD = '/'

export const PATH_PAGE = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
}

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, 'dashboard'),
  notification: path(ROOTS_DASHBOARD, 'notification'),
  task: {
    root: path(ROOTS_DASHBOARD, 'task'),
  },
  jobs: {
    root: path(ROOTS_DASHBOARD, 'jobs'),
    new: path(ROOTS_DASHBOARD, 'jobs/new'),
  },
  clients: {
    root: path(ROOTS_DASHBOARD, 'clients'),
  },
  candidates: path(ROOTS_DASHBOARD, 'candidates'),
  users: {
    root: path(ROOTS_DASHBOARD, 'users'),
    account: path(ROOTS_DASHBOARD, 'users/account'),
  },
  interview: {
    root: path(ROOTS_DASHBOARD, 'interview'),
  },
  board: {
    root: path(ROOTS_DASHBOARD, 'board'),
  },
  caculator: path(ROOTS_DASHBOARD, 'caculator'),
  recruiter: {
    root: path(ROOTS_DASHBOARD, 'recruiter'),
  },
  blogs: {
    root: path(ROOTS_DASHBOARD, 'blogs'),
  },
}
