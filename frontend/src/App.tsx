import { Toaster } from 'react-hot-toast'
import { AppRouter } from './router'
import Navbar from './widgets/Navbar'
import '@/lib/i18/i18'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { RealHeader } from './widgets/RealHeader'
import { useDemo } from './contexts/demoContext'

export default function App() {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      sessionStorage.clear()
    })
  }, [])
  const { setIsDemo } = useDemo()

  const navigate = useNavigate()

  useEffect(() => {
    navigate('/start')
  }, [])

  return (
    <>
      <RealHeader />
      <main className="bg-zinc-100 pb-16 grow bg-gradient-to-t from-secondary to-overlay-1 rounded-t-2xl bg-fixed">
        <AppRouter />
        <Navbar />
      </main>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'bg-overlay-3 text-foreground-1/80',
        }}
      />
    </>
  )
}
