import Avatar from './ui/Avatar'
import { useUser } from '@/contexts/userContext'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'
import { Button } from '../Button'
import Balance from './ui/Balance'
import Wallet from '@/icons/Wallet.svg'
import { useTranslation } from 'react-i18next'

interface HeaderProps {
  balance?: number
  diff?: number
  onOpen?: () => void
  leaveDemo?: () => void
}

export default function Header({ balance, diff, onOpen, leaveDemo }: HeaderProps) {
  const { user } = useUser()
  const { t } = useTranslation()
  return (
    <header className="h-16 bg-overlay-3 relative z-40 flex px-4">
      <div
        className="flex gap-3 items-center font-bold text-white"
        style={{
          letterSpacing: '-2%',
        }}
      >
        <Avatar />
        {user?.name}
      </div>
      <div className="ml-auto items-center flex gap-2 text-foreground-2/50 text-xss font-medium">
        <LanguageSwitcher />
        <Button variant="outline" className="text-white" onClick={leaveDemo}>
          {!leaveDemo ? (
            <>
              <Wallet className="text-white" />
              Wallet
            </>
          ) : (
            t('leaver-demo')
          )}
        </Button>
        <Button variant="round" className="size-5" onClick={onOpen}>
          i
        </Button>
      </div>
      <div className="trapezoid absolute top-full w-60 h-28 left-1/2 -translate-x-1/2 pb-7 flex items-center justify-center gap-4">
        <Balance diff={diff} balance={balance} />
      </div>
    </header>
  )
}
