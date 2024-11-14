import { headerRoutes } from '@/router/routerConfig'
import { useLocation } from 'react-router'
import { useUser } from '@/contexts/userContext'
import { useCallback, useEffect, useRef, useState } from 'react'

import { GuideCarousel } from '../GuideCarousel'
import { useSocket } from '@/contexts/socketContext'
import { Header } from '@/components/Header'

export default function RealHeader() {
  const { pathname } = useLocation()
  const { user } = useUser()
  const interval = useRef<ReturnType<typeof setTimeout>>()
  const { diff } = useSocket()

  const [open, setOpen] = useState<boolean>(false)

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearTimeout(interval.current)
      }
    }
  }, [])

  if (!(headerRoutes as string[]).includes(pathname)) return null

  return (
    <>
      <Header balance={user?.balance} diff={diff} onOpen={onOpen} />
      <GuideCarousel open={open} close={close} />
    </>
  )
}
