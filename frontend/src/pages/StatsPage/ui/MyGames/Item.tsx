import { MyGame } from '@/contexts/statsContext'
import { cva } from '@/lib/cva'
import Coin from '@/icons/Coin.svg'
import { Avatar } from '@/components/Avatar'
import Link from '@/icons/Link.svg'
import { useUser } from '@/contexts/userContext'
import { GameModal } from '@/widgets/GameModal'
import { useState } from 'react'

interface ItemProps {
  item: MyGame
}

export default function Item({ item }: ItemProps) {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  return (
    <>
      <li
        className={cva('grid -14 px-3 rounded-xl relative overflow-hidden bg-overlay-4 bg-opacity-[0.02] h-14')}
        style={{
          gridTemplateColumns: '1fr 36px 1fr',
        }}
      >
        <div className="flex gap-3 items-center font-bold">
          <Avatar src="/woody-ava.png" />
          {item?.id}
        </div>
        <button className="flex items-center justify-center" onClick={() => setOpen(true)}>
          <Link className="text-fouritary size-[26px]" />
        </button>
        <div className="tracking-tight font-bold text-xs flex items-center text-foreground-1 gap-1 justify-end">
          <span>
            {item?.loser?.id !== user?.id ? '+' : '-'}
            {item?.amount}
          </span>
          <Coin className="size-4" />
        </div>
      </li>
      <GameModal game={item} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
