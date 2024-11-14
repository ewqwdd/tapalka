import { ReactNode, useState } from 'react'
import { notifsContext } from './notifsContext'
import { Drawer } from '@/components/Drawer'

interface NotifsContextProviderProps {
  children: ReactNode
}

export default function NotifsContextProvider({ children }: NotifsContextProviderProps) {
  const [content, setContent] = useState<ReactNode>()

  const close = () => {
    setContent(undefined)
  }
  const addNotif = (content: ReactNode) => {
    setContent(content)
  }

  return (
    <notifsContext.Provider value={{ addNotif, close }}>
      {children}
      <Drawer open={!!content} onClose={close}>
        {content}
      </Drawer>
    </notifsContext.Provider>
  )
}
