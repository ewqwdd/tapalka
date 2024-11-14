import { Task } from '@/types/Task'
import { createContext } from 'react'

interface TasksContextSchema {
  isLoading: boolean
  tasks: Task[]
}

interface SetTasksContextSchema {
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>
}

export const tasksContext = createContext<TasksContextSchema>({
  isLoading: false,
  tasks: [],
})

export const setTasksContext = createContext<SetTasksContextSchema>({})
