export interface Task {
  completedAt?: Date
  id: number
  reward: number
  name: string
  description?: string
  type: 'daily' | 'default'
  icon: string
  period?: number
  startedAt?: Date
}
