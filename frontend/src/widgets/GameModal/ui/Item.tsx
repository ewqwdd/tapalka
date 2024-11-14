import { Avatar } from '@/components/Avatar'
import { Difference } from '@/components/Difference'
import Coin from '@/icons/Coin.svg'

interface ItemProps {
  name: string
  id: number
  loserId?: number
  amount: number
}

export default function Item({ id, name, loserId, amount }: ItemProps) {
  return (
    <li
      className="grid font-bold text-foreground-10 h-9 bg-[#EFF7FF] bg-opacity-5 rounded-xl px-3"
      style={{
        gridTemplateColumns: '1fr auto 1fr',
      }}
    >
      <span className="flex gap-5 items-center font-medium text-sm tracking-tight">
        <Avatar src="/woody-ava.png" className="size-6 rounded-[0.25rem] after:rounded-[0.25rem]" />
        {name}
      </span>
      <span className="text-center flex items-center text-xs font-bold">0</span>
      <span className="font-bold text-xs flex justify-end items-center gap-1">
        <Difference className="text-sm font-bold" diff={id !== loserId ? amount / 10 : -amount} />
        <Coin className="size-3 ml-0.5" />
      </span>
    </li>
  )
}
