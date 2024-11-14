import { useContext } from 'react'
import { demoContext } from './demoContext'

export const useDemo = () => useContext(demoContext)
