import { Button } from '@/components/Button'
import { useDemo } from '@/contexts/demoContext'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

export default function StartPage() {
  const { t } = useTranslation()
  const { setIsDemo } = useDemo()

  const navigate = useNavigate()

  const goToDemo = () => {
    navigate('/demo')
    setIsDemo(true)
  }

  return (
    <section
      style={{
        backgroundImage: 'url("/StartBg.png")',
      }}
      className="h-full flex flex-col fixed w-full bg-cover appear py-16 justify-between px-6"
    >
      <div className="relative bg-linear-referal bg-opacity-80 after:bg-linear-light gradient-border rounded-[1.25rem] after:rounded-[1.25rem] self-center p-4 max-w-80 w-full text-lg tracking-tight font-bold text-center">
        <h2>{t('start-page.hello')}</h2>
        <p className="text-sm font-normal tracking-tight text-center mt-2">{t('start-page.hello-desc')}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button
          onClick={goToDemo}
          variant="outline"
          className="bg-overlay-1/95 border-foreground-6 text-base rounded-2xl"
        >
          {t('demo')}
        </Button>
        <Button onClick={() => navigate('/')} variant="primary">
          {t('play')}
        </Button>
      </div>
    </section>
  )
}
