import { useUser } from '@/contexts/userContext'
import Coin from '@/icons/Coin.svg'
import { cva } from '@/lib/cva'
import Diamond from '@/icons/Diamond.svg'
import { useSocket } from '@/contexts/socketContext'
import { Difference } from '@/components/Difference'
import { useDemo } from '@/contexts/demoContext'

interface BalanceProps {
  diff?: number
  balance?: number
}

export default function Balance({ diff, balance }: BalanceProps) {
  const { isDemo } = useDemo()
  return (
    <>
      {diff ? (
        <div className="from-accent-1 to-accent-2 bg-gradient-to-b size-12 rounded-lg border border-accent-3 gap-4 flex items-center justify-center">
          <Diamond className="size-6 text-foreground-1" />
        </div>
      ) : null}
      <div className="flex flex-col gap-[0.375rem]">
        <span
          className={cva('text-foreground-2/50 text-xs font-semibold', {
            'text-center': !diff,
          })}
          style={{
            letterSpacing: '-2%',
          }}
        >
          Balance
        </span>

        <div
          className={cva('gap-4 place-items-center', {
            grid: !diff,
          })}
          style={{
            gridTemplateColumns: '1fr auto 1fr',
          }}
        >
          {!diff && (
            <>
              <span className="relative flex gap-1 font-bold text-2xl items-center text-foreground-1 justify-end w-full">
                <img className="size-6" alt="token" src="/zheton.png" />2
              </span>
              <figure className="h-5 w-px bg-white/20" />
            </>
          )}
          <span className="relative flex gap-1 font-bold text-2xl items-center text-foreground-1 justify-start w-full">
            {isDemo ? (
              <img src="/candy.png" alt="candy" className="size-6 object-contain" />
            ) : (
              <Coin className="size-6" />
            )}
            {balance ?? 0}
            {diff ? (
              <Difference
                diff={diff}
                className="absolute left-full translate-x-1 top-0.5 w-full text-[10px] leading-3 appear"
              />
            ) : null}
          </span>
        </div>
      </div>
    </>
  )
}
