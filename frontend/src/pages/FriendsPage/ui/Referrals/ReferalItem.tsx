import { Avatar } from '@/components/Avatar'
import { Difference } from '@/components/Difference'
import { User } from '@/types/User'
import Coin from '@/icons/Coin.svg'

interface ReferalItemProps {
  user: User
}

export default function ReferalItem({ user }: ReferalItemProps) {
  return (
    <div
      className="grid h-[3.625rem] bg-overlay-8 bg-opacity-[0.03] rounded-xl px-[10px]"
      style={{
        gridTemplateColumns: '1.2fr auto 1fr',
      }}
    >
      <div className="flex gap-3 items-center">
        <Avatar src="/woody-ava.png" className="size-[2.375rem]" alt="avatar" />
        <span className="text-sm font-bold tracking-tight max-w-20 overflow-hidden text-ellipsis">{user.name}</span>
      </div>
      <span className="font-bold text-xs flex items-center">1</span>
      <span className="flex items-center gap-1 justify-end">
        <Difference className="text-xs tracking-tight font-bold" diff={50} />
        <Coin className="size-4" />
      </span>
    </div>
  )
}
