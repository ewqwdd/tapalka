import { MyGame } from '@/contexts/statsContext'
import Item from './Item'
import Skeletons from '../Skeletons'

interface BlockchainTableProps {
  games?: MyGame[]
  isLoading: boolean
}

export default function BlockchainTable({ games = [], isLoading }: BlockchainTableProps) {
  return (
    <>
      {games?.map((elem) => (
        <Item item={elem} key={elem.id} />
      ))}
      {isLoading && <Skeletons />}
    </>
  )
}
