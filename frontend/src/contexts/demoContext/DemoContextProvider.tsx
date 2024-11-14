import React, { createContext, useContext, useState, ReactNode } from 'react'
import { demoContext } from './demoContext'

interface DemoContextProviderProps {
  children: ReactNode
}

export const DemoContextProvider: React.FC<DemoContextProviderProps> = ({ children }) => {
  const [isDemo, setIsDemo] = useState<boolean>(false)

  return <demoContext.Provider value={{ isDemo, setIsDemo }}>{children}</demoContext.Provider>
}
