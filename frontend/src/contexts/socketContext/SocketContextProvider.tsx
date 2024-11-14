import { ReactNode, useEffect, useState } from 'react'
import { setSocketContext, socketContext } from './socketContext'
import { io, Socket } from 'socket.io-client'
import { useUser } from '../userContext'
import { useSetUser } from '../userContext/useUser'
import toast from 'react-hot-toast'

interface SocketContextProviderProps {
  children: ReactNode
}

export default function SocketContextProvider({ children }: SocketContextProviderProps) {
  const [socket, setSocket] = useState<Socket>()
  const [socketInitted, setSocketInitted] = useState<boolean>(false)
  const [inRoom, setInRoom] = useState<boolean>(false)

  const [diff, setDiff] = useState<number>()

  const { initted } = useUser()
  const { setUser } = useSetUser()

  useEffect(() => {
    if (!initted) return
    const socket = io(process.env.VITE_WS_URL, {
      query: {
        token: localStorage.getItem('token'),
      },
    })
    setSocket(socket)
    setSocketInitted(true)
    return () => {
      socket.disconnect?.()
    }
  }, [initted])

  useEffect(() => {
    if (!socketInitted) return
    socket.on('join', ({ success, roomId }) => {
      console.log(success, roomId)
      if (success) {
        localStorage.setItem('roomId', roomId)
        setInRoom(true)
      }
    })
    socket.on('game_end', (res) => {
      localStorage.removeItem('roomId')
      let diff
      setUser((prev) => {
        diff = res.balance - prev.balance
        return { ...prev, balance: res.balance }
      })
      setDiff(diff)
      setTimeout(() => {
        setDiff(undefined)
      }, 10000)
      setInRoom(false)
    })

    socket.on('5sec_alert', () => {
      toast('если не совершишь клик в течении 10 секунд - кик')
    })

    socket.on('kick', () => {
      toast('кик')
      localStorage.removeItem('roomId')
      setInRoom(false)
    })

    const roomId = localStorage.getItem('roomId')
    if (roomId) {
      socket.emit('rejoin', { roomId })
    }
  }, [socket, socketInitted])

  return (
    <setSocketContext.Provider value={{ setInRoom }}>
      <socketContext.Provider value={{ initted: socketInitted, socket, inRoom, diff }}>
        {children}
      </socketContext.Provider>
    </setSocketContext.Provider>
  )
}
