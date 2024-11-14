import { cva } from '@/lib/cva'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Button } from '../Button'
import X from '@/icons/X.svg'
import { createPortal } from 'react-dom'

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  open?: boolean
}

export default function Modal({ onClose, open, className, children, ...props }: ModalProps) {
  const [isClosing, setIsClosing] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        onClose?.()
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
      className={cva(
        'fixed top-0 left-0 size-full flex items-center bg-overlay-3/80 backdrop-blur-sm appear opacity-0 z-50',
        {
          'opacity-1': open && !isClosing,
        }
      )}
      onClick={startClosing}
      {...props}
    >
      <div
        className={cva(
          'min-h-96 w-full flex flex-col p-6 opacity-0 bg-overlay-7 rounded-[20px] appear relative',
          {
            'opacity-1': open && !isClosing,
          },
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute right-5 top-5" onClick={startClosing}>
          <X className="size-6 opacity-70" />
        </button>
        {children}
      </div>
    </div>
  )

  return createPortal(content, document.getElementById('root')!)
}
