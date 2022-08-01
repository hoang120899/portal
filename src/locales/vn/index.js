import blogs from './ blogs'
import board from './board'
import calculator from './calculator'
import candidates from './candidates'
import clients from './clients'
import dashboard from './dashboard'
import interview from './interview'
import jobDetail from './jobDetail'
import jobs from './jobs'
import login from './login'
import notification from './notification'
import recruiter from './recruiter'
import task from './task'
import users from './users'

const vn = {
  login: 'Login',
  home: 'Home',
  setting: 'Settings',
  logout: 'Logout',
  add_assignee: 'Add assignee',
  contacts: 'Contacts',
  nav: {
    dashboard: 'Dashboard',
    notification: 'Notification',
    task: 'Task',
    jobs: 'Jobs',
    jobDetail: 'Job detail',
    clients: 'Clients',
    candidates: 'Candidates',
    users: 'Users',
    interview: 'Interview',
    board: 'Board',
    calculator: 'Calculator',
    recruiter: 'External recruiter',
    blogs: 'Blogs',
  },
  pages: {
    dashboard,
    blogs,
    calculator,
    board,
    candidates,
    clients,
    interview,
    notification,
    recruiter,
    task,
    users,
    login,
    jobs,
    jobDetail,
  },
}

export default vn
