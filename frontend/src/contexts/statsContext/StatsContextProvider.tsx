import { ReactNode, useState } from 'react'
import { MyGame, setStatsContext, statsContext, TopUser } from './statsContext'

interface StatsContextProviderProps {
  children: ReactNode
}

export default function StatsContextProvider({ children }: StatsContextProviderProps) {
  const [leaderboard, setLeaderboard] = useState<TopUser[]>([])
  const [games, setGames] = useState<MyGame[]>([])
  const [blockchain, setBlockchain] = useState<MyGame[]>([])

  const [leaderboardPage, setLeaderboardPage] = useState<number>(1)
  const [gamesPage, setGamesPage] = useState<number>(1)
  const [blockchainPage, setBlockchainPage] = useState<number>(1)

  return (
    <setStatsContext.Provider
      value={{ setLeaderboard, setLeaderboardPage, setGames, setGamesPage, setBlockchain, setBlockchainPage }}
    >
      <statsContext.Provider value={{ leaderboard, leaderboardPage, games, gamesPage, blockchain, blockchainPage }}>
        {children}
      </statsContext.Provider>
    </setStatsContext.Provider>
  )
}
