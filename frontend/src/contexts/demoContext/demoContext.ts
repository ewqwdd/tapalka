import { createContext } from 'react'

interface DemoContextSchema {
  isDemo: boolean
  setIsDemo?: (value: boolean) => void
}

export const demoContext = createContext<DemoContextSchema>({
  isDemo: false,
})
