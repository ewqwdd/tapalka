import { TopUser } from '@/contexts/statsContext'
import Top1 from '@/icons/number-bg-winner-1.svg'
import Top2 from '@/icons/number-bg-winner-2.svg'
import Top3 from '@/icons/number-bg-winner-3.svg'
import Top from '@/icons/number-bg.svg'
import { cva } from '@/lib/cva'
import Coin from '@/icons/Coin.svg'

interface ItemProps {
  item: TopUser
  index: number
}

export default function Item({ item, index }: ItemProps) {
  let icon
  switch (index) {
    case 0:
      icon = <Top1 />
      break
    case 1:
      icon = <Top2 />
      break
    case 2:
      icon = <Top3 />
      break
    default:
      icon = <Top />
  }

  return (
    <li
      className={cva('grid grid-cols-2 h-14 px-3 rounded-xl relative overflow-hidden bg-overlay-4 bg-opacity-[0.02]', {
        'gradient-border after:rounded-xl before:-left-5 before:bottom-5 before:size-16 before:rounded-full before:absolute before:blur-[34px]':
          index < 3,
        'after:bg-linear-top-1 before:bg-[#F6B71B]': index === 0,
        'after:bg-linear-top-2 before:bg-[#62D300]': index === 1,
        'after:bg-linear-top-3 before:bg-[#1B8DF6]': index === 2,
      })}
    >
      <div className="flex gap-5 items-center">
        <div className="w-[1.625rem] relative flex items-center justify-center">
          {icon}
          <span
            className={cva('text-white text-[13px] absolute font-mulish font-black', {
              'mb-2': index < 3,
            })}
          >
            {index + 1}
          </span>
        </div>
        {item.username}
      </div>
      <div className="flex justify-between items-center">
        <span className="tracking-tight font-bold text-xs flex items-center text-foreground-8">
          {item.totalRooms ?? 0}
        </span>
        <span className="tracking-tight font-bold text-xs flex items-center text-foreground-1 gap-1">
          <span>
            {Number(item.totalEarnings) >= 0 ? '+' : ''}
            {item.totalEarnings}
          </span>
          <Coin className="size-4" />
        </span>
      </div>
    </li>
  )
}
