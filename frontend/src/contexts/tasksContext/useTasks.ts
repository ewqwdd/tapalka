import { useContext } from 'react'
import { setTasksContext, tasksContext } from './tasksContext'

export const useTasks = () => useContext(tasksContext)
export const useSetTasks = () => useContext(setTasksContext)
