import { Drawer } from '@/components/Drawer'
import { useEffect, useRef, useState } from 'react'
import Coins from '@/icons/Coins.svg'
import { useTranslation } from 'react-i18next'
import { Difference } from '@/components/Difference'
import Coin from '@/icons/Coin.svg'
import { Button } from '@/components/Button'

interface StatusDrawerProps {
  diff?: number
}

export default function StatusDrawer({ diff }: StatusDrawerProps) {
  const [open, setOpen] = useState(false)
  const difference = useRef(diff)
  const { t } = useTranslation()

  const close = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (diff) {
      setOpen(true)
      difference.current = diff
    }
  }, [diff])

  return (
    <Drawer onClose={close} open={open} className="flex flex-col items-center pt-0 pb-14">
      <div className="flex items-center justify-center -mt-12 relative z-20 pointer-events-none">
        <Coins className="w-64" />
        <figure className="size-48 bg-gold-1 blur-[58px] absolute -z-10 rounded-full" />
      </div>
      <h3 className="text-foreground-5 font-bold text-sm text-center tracking-wide mt-2 uppercase">{t('congrats')}!</h3>
      <div className="flex items-center gap-2 mt-2">
        <Difference diff={difference.current} className="font-bold text-4xl" />
        <Coin className="size-8" />
      </div>
      <Button variant="primary" className="mt-auto self-stretch" onClick={close}>
        {t('continue')}
      </Button>
    </Drawer>
  )
}
