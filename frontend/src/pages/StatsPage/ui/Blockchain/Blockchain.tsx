import { useSetStats, useStats } from '@/contexts/statsContext'
import { api } from '@/lib/api'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useObserver } from '@/lib/hooks/useObserver'
import BlockchainTable from './BlockchainTable'
import toast from 'react-hot-toast'

const KEY = 'blockchain_page'

export default function Blockchain() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()
  const { blockchain, blockchainPage } = useStats()
  const { setBlockchain, setBlockchainPage } = useSetStats()
  const [error, setError] = useState(false)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const cbRef = useRef<() => void>()

  const [end, setEnd] = useState<boolean>(false)

  const loadMoreData = useCallback(() => {
    if (sessionStorage.getItem(KEY) === blockchainPage.toString()) return
    setIsLoading(true)
    api
      .get(`/room?page=${blockchainPage}`)
      .then(({ data }) => {
        sessionStorage.setItem(KEY, blockchainPage.toString())
        if (!data.data || data.data.length === 0) {
          setEnd(true)
          sessionStorage.setItem(KEY, (blockchainPage + 1).toString())
        }
        setBlockchain((prev) => (prev ? [...prev, ...data.data] : data.data))
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        toast.error(t('error'))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [blockchainPage, setBlockchainPage])

  useEffect(() => {
    cbRef.current = () => {
      if (!isLoading && !end && isMounted) {
        setBlockchainPage((prevPage) => prevPage + 1)
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
  }, [blockchainPage, loadMoreData, isMounted, end])

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
        <span className="grow text-center uppercase">{t('room-size')}</span>
        <span className="grow text-right uppercase">{t('win-amount')}</span>
      </div>
      <ul className="flex flex-col gap-1 mt-2">
        <BlockchainTable games={blockchain} isLoading={isLoading} />
      </ul>

      {/* Элемент наблюдения (sentinel) */}
      {!error && <div ref={observerRef} className="h-1"></div>}
    </div>
  )
}
