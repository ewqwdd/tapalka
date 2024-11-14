import { Header } from '@/components/Header'
import { useDemo } from '@/contexts/demoContext'
import { useNavigate } from 'react-router'

interface DemoHeaderProps {
  balance: number
  diff?: number
}

export default function DemoHeader({ balance, diff }: DemoHeaderProps) {
  const navigate = useNavigate()
  const { setIsDemo } = useDemo()
  const leaveDemo = () => {
    setIsDemo(false)
    navigate('/')
  }

  return <Header balance={balance} diff={diff} leaveDemo={leaveDemo} />
}
