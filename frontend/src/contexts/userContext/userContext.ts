import { User } from '@/types/User'
import { createContext } from 'react'

interface UserContextSchema {
  user?: User
  initted: boolean
  avatar?: string
}

export const userContext = createContext<UserContextSchema>({
  initted: false,
})

export const setUserContext = createContext<{ setUser?: React.Dispatch<React.SetStateAction<User>> }>({})
