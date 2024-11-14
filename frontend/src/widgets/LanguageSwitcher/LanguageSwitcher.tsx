import { Drawer } from '@/components/Drawer'
import { useTranslation } from 'react-i18next'
import SwitchBtn from './ui/SwitchBtn'
import { useCallback, useState } from 'react'
import DrawerContent from './ui/DrawerContent'

export default function LanguageSwitcher() {
  const [isOpen, setOpen] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const open = useCallback(() => {
    setOpen(true)
  }, [])

  return (
    <>
      <SwitchBtn open={open} />
      <Drawer open={isOpen} onClose={close}>
        <DrawerContent close={close} />
      </Drawer>
    </>
  )
}
