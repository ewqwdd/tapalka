import { User } from '@/types/User'
import { createContext, SetStateAction } from 'react'

export interface TopUser {
  id: number
  username: string
  balance: number
  totalEarnings: string
  totalRooms: number
}

export interface MyGame {
  id: number
  amount: number
  counter: number
  loser: User
  players: { name: string; id: number }[]
  roomSize: number
  room_size: number
  active: 'finished'
}

interface StatsContextSchema {
  leaderboard?: TopUser[]
  games?: MyGame[]
  blockchain?: MyGame[]
  leaderboardPage?: number
  gamesPage?: number
  blockchainPage?: number
}

interface SetStatsContextSchema {
  setLeaderboard?: React.Dispatch<SetStateAction<TopUser[]>>
  setLeaderboardPage?: React.Dispatch<SetStateAction<number>>
  setGames?: React.Dispatch<SetStateAction<MyGame[]>>
  setGamesPage?: React.Dispatch<SetStateAction<number>>
  setBlockchain?: React.Dispatch<SetStateAction<MyGame[]>>
  setBlockchainPage?: React.Dispatch<SetStateAction<number>>
}

export const statsContext = createContext<StatsContextSchema>({})

export const setStatsContext = createContext<SetStatsContextSchema>({})
