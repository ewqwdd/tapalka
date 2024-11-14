import { useContext } from 'react'
import { freindsContext, setFreindsContext } from './friendsContext'

export const useFriends = () => useContext(freindsContext)
export const useSetFriends = () => useContext(setFreindsContext)
