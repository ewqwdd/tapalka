import { MyGame } from '@/contexts/statsContext'
import Item from './Item'
import Skeletons from '../Skeletons'

interface MyGamesTableProps {
  games?: MyGame[]
  isLoading: boolean
}

export default function MyGamesTable({ games = [], isLoading }: MyGamesTableProps) {
  return (
    <>
      {games?.map((elem) => (
        <Item item={elem} key={elem.id} />
      ))}
      {isLoading && <Skeletons />}
    </>
  )
}
