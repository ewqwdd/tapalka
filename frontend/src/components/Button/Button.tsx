import { cva } from '@/lib/cva'
import { HTMLAttributes, memo } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'round' | 'tab'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export default memo(function Button({ className, variant, children, ...props }: ButtonProps) {
  const defaultStyles = 'flex items-center min-h-9 justify-center gap-1 min-w-[6.5rem]'

  const variantStyles: DeepPartial<Record<Variant, string>> = {
    outline:
      'bg-overlay-4/10 rounded-full shadow-outline-btn border border-foreground-3/20 font-semibold text-xs tracking tracking-tight',
    round:
      'rounded-full aspect-square bg-overlay-5 [& > svg]:text-foreground-4 text-foreground-4 p-1 min-w-0 min-h-0 font-bold',
    primary:
      'bg-linear-success rounded-2xl outline -outline-offset-2 outline-2 outline-success-2 h-[58px] font-bold text-white tracking-tight relative after:rounded-2xl after:size-full after:absolute active:after:-translate-y-0.5 after:-z-10  active:translate-y-0.5 transition-all after:transition-all after:shadow-success-btn',
    tab: 'rounded-[10px] border border-foreground-7 text-foreground-7 font-semibold text-sm min-h-10',
  }

  return (
    <button className={cva(defaultStyles, variantStyles[variant], className)} {...props}>
      {children}
    </button>
  )
})
