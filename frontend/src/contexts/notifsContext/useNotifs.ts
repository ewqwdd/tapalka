import { useContext } from 'react'
import { notifsContext, NotifsSchema } from './notifsContext'

export const useNotifs = () => useContext<NotifsSchema>(notifsContext)
