import { ReactNode, useEffect, useState } from 'react'
import { useUser } from '../userContext'
import { Task } from '@/types/Task'
import { api } from '@/lib/api'
import { setTasksContext, tasksContext } from './tasksContext'

interface TasksContextProviderProps {
  children: ReactNode
}

export default function TasksContextProvider({ children }: TasksContextProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { initted } = useUser()

  useEffect(() => {
    if (!initted) return
    setIsLoading(true)
    api
      .get('tasks')
      .then(({ data }) => {
        setTasks(
          data.data?.map((elem: Task) => ({
            ...elem,
            startedAt: elem.startedAt ? new Date(elem.startedAt) : undefined,
            completedAt: elem.completedAt ? new Date(elem.completedAt) : undefined,
          }))
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [initted])

  return (
    <setTasksContext.Provider value={{ setIsLoading, setTasks }}>
      <tasksContext.Provider value={{ isLoading, tasks }}>{children}</tasksContext.Provider>
    </setTasksContext.Provider>
  )
}
