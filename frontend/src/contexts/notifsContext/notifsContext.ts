import { createContext, ReactNode } from 'react'

export interface NotifsSchema {
  addNotif?: (children: ReactNode) => void
  close?: () => void
}

export const notifsContext = createContext<NotifsSchema>({})
