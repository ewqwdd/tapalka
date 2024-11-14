import { useEffect, useRef, useState } from 'react'
import PlayButton from '../../GamePage/ui/PlayButton'
import DemoHeader from './DemoHeader'
import { useDemo } from '@/contexts/demoContext'
import { t } from 'i18next'
import toast from 'react-hot-toast'
import { useNotifs } from '@/contexts/notifsContext'
import { Winstreak } from '@/components/Winstreak'

export default function DemoPage() {
  const [inRoom, setInRoom] = useState<boolean>(false)
  const [diff, setDiff] = useState<number>()
  const [balance, setBalance] = useState(100)
  const clickLoose = useRef<number>()
  const clickWin = useRef<number>()
  const [fail, setFail] = useState(false)
  const { addNotif } = useNotifs()

  const { setIsDemo } = useDemo()

  const [counter, setCounter] = useState(0)

  const timeoutRef = useRef<NodeJS.Timeout>()

  const changeDiff = async (n: number) => {
    if (timeoutRef.current) {
      setDiff(undefined)
      clearTimeout(timeoutRef.current)
    }
    setDiff(n)
    timeoutRef.current = setTimeout(() => {
      setDiff(undefined)
    }, 5000)
  }

  const onClick = () => {
    if (!inRoom) {
      if (balance < 50) {
        return toast(t('Not enough money'))
      }
      clickLoose.current = Math.round(1 + Math.random() * 8)
      clickWin.current = Math.round(1 + Math.random() * 4)
      setCounter(0)
      setInRoom(true)
    } else {
      if (counter + 1 === clickWin.current) {
        changeDiff(5)
        setBalance((prev) => prev + 5)
        localStorage.setItem('winstreak', (Number(localStorage.getItem('winstreak')) + 1).toString())
        const streak = Number(localStorage.getItem('winstreak'))
        if (streak % 5 === 0) {
          addNotif(<Winstreak won={streak} />)
        }

        setInRoom(false)
      } else if (counter + 1 === clickLoose.current) {
        changeDiff(-50)
        setBalance((prev) => prev - 50)
        localStorage.setItem('winstreak', '0')
        setInRoom(false)
      } else {
        setCounter(counter + 1)
        changeDiff(5)
        setBalance((prev) => prev + 5)
      }
    }
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (fail) {
      setInRoom(false)
      timeout = setTimeout(() => {
        setFail(false)
      }, 2000)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [fail])

  useEffect(() => {
    setIsDemo(true)
    const interval = setInterval(() => {
      setFail(true)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <DemoHeader balance={balance} diff={diff} />
      <section className="h-full flex flex-col items-center px-4 justify-center pb-16">
        <PlayButton
          onClick={onClick}
          inRoom={inRoom}
          variant={(diff && diff < 0 && !inRoom) || fail ? 'fail' : 'success'}
        />
      </section>
    </>
  )
}
