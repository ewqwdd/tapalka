import { useContext } from 'react'
import { setSocketContext, socketContext } from './socketContext'

export const useSocket = () => useContext(socketContext)
export const useSetSocket = () => useContext(setSocketContext)
