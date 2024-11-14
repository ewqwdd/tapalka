import { Button } from '@/components/Button'
import { langNamesMap } from '@/lib/constants/langNamesMap'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface DrawerContentProps {
  close: () => void
}

export default memo(function DrawerContent({ close }: DrawerContentProps) {
  const { t, i18n } = useTranslation()

  const setLang = (lang: string) => {
    return () => {
      i18n.changeLanguage(lang)
      close()
    }
  }

  return (
    <div className="flex gap-2 flex-col">
      <h2 className="font-semibold tracking-tight mb-2 leading-9">{t('select-lang')}</h2>
      {i18n.options.supportedLngs &&
        i18n.options.supportedLngs.map(
          (elem) =>
            langNamesMap[elem] && (
              <Button
                onClick={setLang(elem)}
                key={elem}
                variant="outline"
                className="bg-transparent justify-start px-3 rounded-[10px] tracking-tight font-normal h-11 gap-3 !shadow-none"
              >
                <img
                  src={`/flags/${elem.slice(0, 2)}.png`}
                  className="size-6 object-cover rounded-full overflow-clip"
                />
                {langNamesMap[elem]}
              </Button>
            )
        )}
    </div>
  )
})
