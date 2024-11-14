import ButtonBg from '@/icons/button-bg.svg'
import { cva } from '@/lib/cva'
import { HTMLAttributes, memo, MouseEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Variant = 'success' | 'fail'

interface PlayButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  inRoom?: boolean
}

export default memo(function PlayButton({ variant = 'success', inRoom, onClick, ...props }: PlayButtonProps) {
  const { t } = useTranslation()

  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev >= 1 ? 1 : prev + 0.01))
    }, 50)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const customClick = (e: MouseEvent<HTMLButtonElement>) => {
    setScale((prev) => (prev > 0.7 ? prev - 0.05 : 0.7))
    onClick(e)
  }

  return (
    <button
      className="relative aspect-square h-full flex items-center justify-center rounded-full shadow-game mt-10 max-h-[50dvh]"
      style={{
        transform: `scale(${scale})`,
      }}
      onClick={customClick}
      {...props}
    >
      <ButtonBg className="absolute z-0 size-full" />
      <div className="absolute flex flex-col items-center size-full rounded-full overflow-clip">
        <img src="/pidor.png" className="object-contain w-[76%] absolute z-10 bottom-0" />
      </div>
      <figure
        className={cva('circle-ring-1 transition-opacity', {
          'opacity-0': variant === 'fail',
        })}
      />
      <figure
        className={cva('circle-ring-1 fail transition-opacity', {
          'opacity-0': variant !== 'fail',
        })}
      />
      {variant === 'success' && (
        <>
          <figure className="circle-ring-2" />
          <figure className="circle-ring-3" />
        </>
      )}
      {!inRoom && <span className="absolute top-12 text-xss font-medium text-white/80">{t('click-start')}</span>}
    </button>
  )
})
