import { useSocket } from '@/contexts/socketContext'
import { useUser } from '@/contexts/userContext'
import PlayButton from './ui/PlayButton'
import StatusDrawer from './ui/StatusDrawer'
import toast from 'react-hot-toast'
import { useDemo } from '@/contexts/demoContext'
import { useEffect } from 'react'

export default function GamePage() {
  const { socket, inRoom, diff } = useSocket()
  const { user } = useUser()
  const { setIsDemo } = useDemo()

  const onClick = () => {
    if (inRoom) {
      socket.emit('click')
    } else {
      if (user.balance >= 50) {
        socket.emit('join', { amount: 50 })
      } else {
        toast('Not enough money')
      }
    }
  }

  useEffect(() => {
    setIsDemo(false)
  }, [])

  return (
    <section className="h-full flex flex-col items-center px-4 justify-center">
      <PlayButton onClick={onClick} inRoom={inRoom} variant={diff && diff < 0 && !inRoom ? 'fail' : 'success'} />
      <StatusDrawer diff={diff} />
    </section>
  )
}
