import { useTranslation } from 'react-i18next'

export default function Headers() {
  const { t } = useTranslation()

  return (
    <li
      className="grid font-bold tracking-wider uppercase text-foreground-9 text-xs"
      style={{
        gridTemplateColumns: '1fr 76px 1fr',
      }}
    >
      <span>{t('name')}</span>
      <span className="whitespace-nowrap">{t('click-num')}</span>
      <span className="text-right">{t('earns')}</span>
    </li>
  )
}
