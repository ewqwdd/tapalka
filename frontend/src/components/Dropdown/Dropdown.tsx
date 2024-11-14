import { cva } from '@/lib/cva'
import { cloneElement, MouseEvent, ReactElement, ReactNode, useEffect, useRef, useState } from 'react'

interface DropdownProps {
  children: ReactElement
  content: ReactNode
  contentClassName?: string
  className?: string
}

export default function Dropdown({ children, content, className, contentClassName }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>()

  const onOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const cb = () => setIsOpen(false)
    document.addEventListener('click', cb)
    return () => {
      document.removeEventListener('click', cb)
    }
  }, [])

  return (
    <div className={cva('relative', className)} ref={ref} onClick={stopPropagation}>
      {cloneElement(children, { onClick: onOpen })}
      {isOpen && (
        <div
          className={cva(
            'absolute right-0 min-w-full top-full bg-overlay-1 text-foreground-2 max-h-auto flex flex-col rounded origin-top',
            'dropdown',
            contentClassName
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
