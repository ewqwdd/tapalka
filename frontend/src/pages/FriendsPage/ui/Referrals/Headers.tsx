import { memo } from 'react'
import { useTranslation } from 'react-i18next'

export default memo(function Headers() {
  const { t } = useTranslation()
  return (
    <div
      className="grid uppercase text-[#B1CEEC] text-xs font-bold tracking-wider mb-3"
      style={{
        gridTemplateColumns: '1.2fr auto 1fr',
      }}
    >
      <span className="ml-2">{t('your-bro')}</span>
      <span className="text-center">{t('your-bro')}</span>
      <span className="text-right">{t('your-bro')}</span>
    </div>
  )
})
