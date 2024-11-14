import { cva } from '@/lib/cva'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Button } from '../Button'
import X from '@/icons/X.svg'
import { createPortal } from 'react-dom'

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  open?: boolean
}

export default function Drawer({ onClose, open, className, children, ...props }: DrawerProps) {
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, 200)
    }
  }, [isClosing])

  const startClosing = () => setIsClosing(true)

  useEffect(() => {
    startClosing()
  }, [location])

  if (!open) {
    return
  }

  const content = (
    <div
      className={cva('fixed top-0 left-0 size-full bg-overlay-3/70 backdrop-blur-sm drawer opacity-0 z-50', {
        'opacity-1': open && !isClosing,
      })}
      onClick={startClosing}
      {...props}
    >
      <div
        className={cva(
          'min-h-96 w-full left-0 flex flex-col px-6 top-full opacity-0 -translate-y-0 absolute bg-overlay-3 pt-6 rounded-t-3xl',
          {
            'opacity-1 -translate-y-full': open && !isClosing,
          },
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button className="size-9 bg-overlay-5 absolute right-6 top-6" variant="round" onClick={startClosing}>
          <X className="size-5" />
        </Button>
        {children}
      </div>
    </div>
  )

  return createPortal(content, document.getElementById('root')!)
}
