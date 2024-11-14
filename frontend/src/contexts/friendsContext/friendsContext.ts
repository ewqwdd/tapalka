import { User } from '@/types/User'
import { createContext } from 'react'

interface FriendsContextSchema {
  friends: User[]
  isLoading: boolean
}

interface SetFriendsContextSchema {
  setFriends?: React.Dispatch<React.SetStateAction<User[]>>
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export const freindsContext = createContext<FriendsContextSchema>({
  friends: [],
  isLoading: false,
})

export const setFreindsContext = createContext<SetFriendsContextSchema>({})
