import Tabs from '@/components/Tabs/Tabs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Leaderboard from './ui/Leaderboard/Leaderboard'
import MyGames from './ui/MyGames/MyGames'
import Blockchain from './ui/Blockchain/Blockchain'

const KEY = 'stats_tab'

export default function StatsPage() {
  const [active, setActive] = useState<number>(Number(sessionStorage.getItem(KEY)) ?? 0)
  const { t } = useTranslation()

  useEffect(() => {
    sessionStorage.setItem(KEY, active.toString())
  }, [active])

  return (
    <section className="flex flex-col mt-5 px-3 pb-10">
      <Tabs
        className="grid grid-cols-3 p-1 gap-2 rounded-xl bg-overlay-6/5 border border-foreground-6"
        active={active}
        tabChange={(v) => setActive(v)}
        tabs={[
          {
            label: t('my-games'),
          },
          {
            label: 'Blockchain',
          },
          {
            label: t('leaderboard'),
          },
        ]}
      />
      {active === 0 && <MyGames />}
      {active === 1 && <Blockchain />}
      {active === 2 && <Leaderboard />}
    </section>
  )
}
