import type { MockMethod } from 'vite-plugin-mock'
import dayjs from 'dayjs'

const activities = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  time: dayjs().subtract(index * 3, 'hour').format('HH:mm'),
  user: ['Monica Chen', 'David Lin', 'Sophia Reyes', 'Leo Huang'][index % 4],
  action: ['pushed a code update', 'created a new automation', 'resolved a ticket', 'published release notes'][index % 4],
  status: ['success', 'pending', 'success', 'warning'][index % 4] as 'success' | 'pending' | 'warning'
}))

const tickets = Array.from({ length: 6 }).map((_, index) => ({
  id: 1024 + index,
  title: ['Payment flow QA', 'Customer onboarding', 'Data sync anomaly', 'New workspace request'][index % 4],
  assignee: ['Jordan', 'Mia', 'Clark', 'Taylor'][index % 4],
  priority: ['High', 'Medium', 'Low', 'Medium'][index % 4] as 'High' | 'Medium' | 'Low',
  status: ['Open', 'In progress', 'Resolved', 'In progress'][index % 4] as 'Open' | 'In progress' | 'Resolved'
}))

const tasks = Array.from({ length: 4 }).map((_, index) => ({
  id: 200 + index,
  title: ['Revamp analytics cards', 'Draft AI assistant brief', 'Improve API docs', 'Migrate billing service'][index],
  owner: ['Alice', 'Marco', 'Qian', 'Sofia'][index],
  progress: [45, 72, 38, 90][index],
  dueDate: dayjs().add(index + 1, 'day').format('MMM D')
}))

const traffic = Array.from({ length: 12 }).map((_, index) => ({
  date: dayjs().subtract(11 - index, 'day').format('YYYY-MM-DD'),
  value: Math.round(12000 + Math.random() * 5000)
}))

export default [
  {
    url: '/api/dashboard',
    method: 'get',
    response: () => ({
      summary: {
        traffic: 18234,
        conversion: 4.8,
        avgSession: 6.2,
        newUsers: 1230
      },
      traffic,
      activities,
      tickets,
      tasks
    })
  }
] as MockMethod[]
