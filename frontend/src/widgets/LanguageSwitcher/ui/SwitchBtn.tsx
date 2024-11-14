import ArrowDown from '@/icons/ArrowDown.svg'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface SwitchBtnProps {
  open: () => void
}

export default memo(function SwitchBtn({ open }: SwitchBtnProps) {
  const { t, i18n } = useTranslation()

  return (
    <button className="flex items-center gap-0.5" onClick={open}>
      <img
        src={`/flags/${i18n.language.slice(0, 2)}.png`}
        className="rounded-full size-4 overflow-clip border border-foreground-1/10"
      />
      {t('lang')}
      <ArrowDown className="text-foreground-2/50 ml-0.5" />
    </button>
  )
})
