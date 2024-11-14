import { createContext } from 'react'
import { Socket } from 'socket.io-client'

interface SocketContextSchema {
  socket?: Socket
  initted: boolean
  inRoom: boolean
  diff?: number
}

interface SetSocketContextSchema {
  setInRoom?: React.Dispatch<React.SetStateAction<boolean>>
}

export const socketContext = createContext<SocketContextSchema>({
  initted: false,
  inRoom: false,
})

export const setSocketContext = createContext<SetSocketContextSchema>({})
