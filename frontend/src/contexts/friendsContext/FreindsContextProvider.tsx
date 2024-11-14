import { ReactNode, useState } from 'react'
import { User } from '@/types/User'
import { freindsContext, setFreindsContext } from './friendsContext'

interface UserContextProviderProps {
  children: ReactNode
}

export default function FriendsContextProvider({ children }: UserContextProviderProps) {
  const [friends, setFriends] = useState<User[]>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <setFreindsContext.Provider value={{ setFriends, setIsLoading }}>
      <freindsContext.Provider value={{ friends, isLoading }}>{children}</freindsContext.Provider>
    </setFreindsContext.Provider>
  )
}
