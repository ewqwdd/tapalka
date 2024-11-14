import { useSetStats, useStats } from '@/contexts/statsContext'
import { api } from '@/lib/api'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import LeaderboardTable from './LeaderboardTable'
import { useObserver } from '@/lib/hooks/useObserver'
import toast from 'react-hot-toast'

const KEY = 'leader_page'

export default function Leaderboard() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const { leaderboard, leaderboardPage } = useStats()
  const { setLeaderboard, setLeaderboardPage } = useSetStats()
  const [error, setError] = useState(false)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const cbRef = useRef<() => void>()

  const [end, setEnd] = useState(false)

  const loadMoreData = useCallback(() => {
    if (sessionStorage.getItem(KEY) === leaderboardPage.toString()) return
    setIsLoading(true)
    api
      .get(`/user/top?page=${leaderboardPage}`)
      .then(({ data }) => {
        sessionStorage.setItem(KEY, leaderboardPage.toString())
        if (!data.data || data.data.length === 0) {
          setEnd(true)
          sessionStorage.setItem(KEY, (leaderboardPage + 1).toString())
        }
        setLeaderboard((prev) => (prev ? [...prev, ...data.data] : data.data))
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        toast.error(t('error'))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [leaderboardPage, setLeaderboard])

  useEffect(() => {
    cbRef.current = () => {
      if (!isLoading && !end && isMounted) {
        setLeaderboardPage((prevPage) => prevPage + 1)
      }
    }
  }, [isLoading, end, isMounted])

  useObserver(observerRef, () => cbRef.current(), {
    rootMargin: '300px', // Задержка загрузки до того, как элемент появится
  })

  useEffect(() => {
    if (isMounted && !end) {
      loadMoreData()
    }
  }, [leaderboardPage, loadMoreData, isMounted])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex flex-col mt-5">
      <div
        className="text-foreground-7 font-bold text-xs tracking-wider grid"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
        }}
      >
        <span className="grow text-center uppercase">{t('game-id')}</span>
        <span className="grow pl-4 text-center uppercase">{t('game-days')}</span>
        <span className="grow text-right pr-5 uppercase">{t('earns')}</span>
      </div>
      <ul className="flex flex-col gap-1 mt-2">
        <LeaderboardTable leaderboard={leaderboard} isLoading={isLoading} />
      </ul>
      {/* Элемент наблюдения (sentinel) */}
      {!error && <div ref={observerRef} className="h-1"></div>}
    </div>
  )
}
