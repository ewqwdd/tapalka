import Lottie from 'lottie-react'
import duck from '@/lib/assets/duck.json'
import { useTranslation } from 'react-i18next'

export default function DevelopmentPage() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col h-full items-center justify-center px-4">
      <Lottie animationData={duck} loop={true} className="size-32" />
      <h1 className="text-2xl text-center font-semibold mt-6">{t('page-develop')}</h1>
    </div>
  )
}
