import { useTranslation } from 'react-i18next'
import HowItWorksItem, { HowItWorksItemProps } from './HowItWorksItem'

export default function HowItWorks() {
  const { t } = useTranslation()

  const items: HowItWorksItemProps[] = [
    {
      desc: t('how-it-works-page.desc-1'),
      heading: t('how-it-works-page.title-1'),
    },
    {
      desc: t('how-it-works-page.desc-2'),
      heading: t('how-it-works-page.title-2'),
    },
    {
      desc: t('how-it-works-page.desc-3'),
      heading: t('how-it-works-page.title-3'),
    },
  ]

  return (
    <div className="flex flex-col mt-8">
      <h2 className="font-bold tracking-tight">{t('how-it-works')}</h2>
      <ul className="flex flex-col gap-5 mt-5">
        {items.map((elem, index) => (
          <HowItWorksItem {...elem} key={index} />
        ))}
      </ul>
    </div>
  )
}
