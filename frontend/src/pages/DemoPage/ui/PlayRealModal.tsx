import { Button } from '@/components/Button'
import { Modal } from '@/components/Modal'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

interface PlayRealModalProps {
  gamesPlayed: number
}

export default function PlayRealModal({ gamesPlayed }: PlayRealModalProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (gamesPlayed > 0 && gamesPlayed % 5 === 0) {
      setOpen(true)
    }
  }, [gamesPlayed])

  const close = () => setOpen(false)

  return (
    <Modal open={open} onClose={close} className="flex flex-col pt-16 min-h-0 mx-4">
      <h2 className="font-semibold text-center text-lg">{t('demo-page.well-played')}</h2>
      <Button onClick={() => navigate('/')} className="self-center min-w-52 mt-8 z-50" variant="primary">
        {t('play')}
      </Button>
    </Modal>
  )
}
