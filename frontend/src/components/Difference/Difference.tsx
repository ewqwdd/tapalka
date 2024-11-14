import { cva } from '@/lib/cva'
import { HTMLAttributes } from 'react'

interface DifferenceProps extends HTMLAttributes<HTMLSpanElement> {
  diff: number
}

export default function Difference({ diff, className, ...props }: DifferenceProps) {
  return (
    <span
      className={cva(
        {
          'text-success-1': diff > 0,
          'text-error': diff < 0,
        },
        className
      )}
      {...props}
    >
      {diff > 0 ? '+' : '-'} {Math.abs(diff)}
    </span>
  )
}
