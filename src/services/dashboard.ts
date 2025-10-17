import axios from 'axios'

export type TrafficPoint = {
  date: string
  value: number
}

export type DashboardSummary = {
  traffic: number
  conversion: number
  avgSession: number
  newUsers: number
}

export type ActivityItem = {
  id: number
  time: string
  user: string
  action: string
  status: 'success' | 'pending' | 'warning'
}

export type TicketItem = {
  id: number
  title: string
  assignee: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In progress' | 'Resolved'
}

export type TaskItem = {
  id: number
  title: string
  owner: string
  progress: number
  dueDate: string
}

export interface DashboardResponse {
  summary: DashboardSummary
  traffic: TrafficPoint[]
  activities: ActivityItem[]
  tickets: TicketItem[]
  tasks: TaskItem[]
}

export async function fetchDashboard(): Promise<DashboardResponse> {
  const { data } = await axios.get<DashboardResponse>('/api/dashboard')
  return data
}
