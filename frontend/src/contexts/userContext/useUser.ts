import { useContext } from 'react'
import { setUserContext, userContext } from './userContext'

export const useUser = () => useContext(userContext)
export const useSetUser = () => useContext(setUserContext)
