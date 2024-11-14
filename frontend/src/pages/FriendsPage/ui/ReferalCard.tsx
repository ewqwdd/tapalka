import { memo } from 'react'
import { useTranslation } from 'react-i18next'

export default memo(function ReferalCard() {
  const { t } = useTranslation()
  return (
    <div className="rounded-xl overflow-hidden min-h-36 bg-linear-referal flex px-4 py-7 relative gradient-border after:bg-linear-referal-stroke after:rounded-xl">
      <div className="flex flex-col gap-2 max-w-[60%]">
        <h2 className="text-white font-bold text-lg leading-5 tracking-tight">{t('referral-prog')}</h2>
        <p className="mt-0.5 font-medium text-[13px] leading-4 tracking-tight text-[#AEC4F4]">{t('referral-desc')}</p>
      </div>
      <img src="/Like.png" alt="like" className="absolute right-0 top-2 h-28" />
    </div>
  )
})
