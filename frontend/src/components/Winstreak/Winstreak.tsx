import { useNotifs } from '@/contexts/notifsContext'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button'
import Diamonds from '@/icons/Diamonds.svg'

interface WinstreakProps {
  won: number
}

export default function Winstreak({ won }: WinstreakProps) {
  const { t } = useTranslation()
  const { close } = useNotifs()
  return (
    <div className="flex flex-col items-center relative grow">
      <Diamonds className="h-44 -mt-[5.5rem] relative z-10 pointer-events-none" />
      <figure className="-top-[4.75rem] w-44 h-40 bg-[#0553DD] blur-[54px] absolute pointer-events-none" />
      <span className="text-success-1 text-4xl font-bold tracking-tight mt-1">{t('on-fire')}</span>
      <p className="max-w-72 font-semibold tracking-tight text-[13px] leading-4 text-center text-[#718BC3] mt-3">
        {won} {t('winstreak')}
      </p>
      <Button variant="primary" className="self-stretch mt-auto mb-10 z-10" onClick={close}>
        {t('continue')}
      </Button>
      <figure className="w-[80%] aspect-square bottom-0 translate-y-1/2 bg-[#1C9E1B] bg-opacity-60 absolute blur-[100px]" />
    </div>
  )
}
