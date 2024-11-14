import { useContext } from 'react'
import { setStatsContext, statsContext } from './statsContext'

export const useStats = () => useContext(statsContext)
export const useSetStats = () => useContext(setStatsContext)
