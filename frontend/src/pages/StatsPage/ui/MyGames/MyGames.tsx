import { useSetStats, useStats } from '@/contexts/statsContext'
import { api } from '@/lib/api'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useObserver } from '@/lib/hooks/useObserver'
import MyGamesTable from './MyGamesTable'
import toast from 'react-hot-toast'

const KEY = 'rooms_page'

export default function MyGames() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const { games, gamesPage } = useStats()
  const { setGames, setGamesPage } = useSetStats()
  const [error, setError] = useState(false)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const cbRef = useRef<() => void>()

  const [end, setEnd] = useState<boolean>(false)

  const loadMoreData = useCallback(() => {
    if (sessionStorage.getItem(KEY) === gamesPage.toString()) return
    setIsLoading(true)
    api
      .get(`/user/rooms?page=${gamesPage}`)
      .then(({ data }) => {
        sessionStorage.setItem(KEY, gamesPage.toString())
        if (!data.data || data.data.length === 0) {
          setEnd(true)
          sessionStorage.setItem(KEY, (gamesPage + 1).toString())
        }
        setGames((prev) => (prev ? [...prev, ...data.data] : data.data))
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        toast.error(t('error'))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [gamesPage, setGames])

  useEffect(() => {
    cbRef.current = () => {
      if (!isLoading && !end && isMounted) {
        setGamesPage((prevPage) => prevPage + 1)
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
  }, [gamesPage, loadMoreData, isMounted, end])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex flex-col mt-5">
      <div
        className="text-foreground-7 font-bold text-xs tracking-wider grid"
        style={{
          gridTemplateColumns: '1fr 36px 1fr',
        }}
      >
        <span className="grow text-center uppercase">{t('game-id')}</span>
        <span className="grow text-center uppercase">tx id</span>
        <span className="grow text-right uppercase">{t('win-amount')}</span>
      </div>
      <ul className="flex flex-col gap-1 mt-2">
        <MyGamesTable games={games} isLoading={isLoading} />
      </ul>

      {/* Элемент наблюдения (sentinel) */}
      {!error && <div ref={observerRef} className="h-1"></div>}
    </div>
  )
}
