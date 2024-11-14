import { memo } from 'react'
import { useTranslation } from 'react-i18next'

export default memo(function TasksCard() {
  const { t } = useTranslation()
  return (
    <div className="rounded-xl bg-linear-referal flex px-4 py-[1.125rem] relative gradient-border after:bg-linear-referal-stroke after:rounded-xl overflow-x-clip">
      <div className="flex flex-col gap-2 max-w-[60%]">
        <h2 className="text-white font-bold text-lg leading-5 tracking-tight text-balance">{t('tasks.heading')}</h2>
        <p className="mt-0.5 font-medium text-[13px] leading-4 tracking-tight text-[#AEC4F4]">
          {t('tasks.description')}
        </p>
      </div>
      <img src="/tasks/Hero.png" alt="checklist" className="absolute -right-8 bottom-0 h-[180px] z-20" />
    </div>
  )
})
