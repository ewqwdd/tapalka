import { TopUser } from '@/contexts/statsContext'
import Item from './Item'
import Skeletons from '../Skeletons'

interface LeaderboardTableProps {
  leaderboard?: TopUser[]
  isLoading: boolean
}

export default function LeaderboardTable({ leaderboard = [], isLoading }: LeaderboardTableProps) {
  return (
    <>
      {leaderboard?.map((elem, index) => (
        <Item index={index} item={elem} />
      ))}
      {isLoading && <Skeletons />}
    </>
  )
}
