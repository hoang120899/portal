export const STATUS_OPTIONS = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Close',
    value: 'close',
  },
]

export const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'company', label: 'Company', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
]

export const DATASOURCE = [...Array(24)].map((_, index) => ({
  id: `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  name: `Test - ${index}`,
  company: `Company-${index}`,
  status: 'active',
  role: 'project manager',
}))
