import { ReactNode, useEffect, useState } from 'react'
import { userContext, setUserContext } from './userContext'
import { TGWebApp } from '@/lib/TgWebApp'
import axios from 'axios'
import { User } from '@/types/User'

interface UserContextProviderProps {
  children: ReactNode
}

export default function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<User>()
  const [initted, setInitted] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string>()

  useEffect(() => {
    if (!TGWebApp) {
      return
    }
    TGWebApp.ready()
    TGWebApp.expand()

    const initData = TGWebApp?.initData
    const startParam = TGWebApp?.initDataUnsafe.start_param
    // ref param: ref123456
    const refId = startParam?.match(/ref(\d+)/)?.[1]

    const user = !__IS_DEV__ ? initData : process.env.VITE_INIT_DATA
    axios.post(process.env.VITE_API_URL + 'user/auth', { initData: user, refId }).then(({ data }) => {
      const { success, user, token } = data
      if (!user.balance) {
        user.balance = 0
      }
      if (user.bonusBalance) {
        user.balance += user.bonusBalance
      }
      if (success) {
        setUser(user)
        setInitted(true)
        localStorage.setItem('token', token)
      }
    })
  }, [])

  console.log(user)

  return (
    <setUserContext.Provider value={{ setUser }}>
      <userContext.Provider value={{ user, initted, avatar }}>{children}</userContext.Provider>
    </setUserContext.Provider>
  )
}
