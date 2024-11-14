import { cva } from '@/lib/cva'
import React, { HTMLAttributes, ImgHTMLAttributes } from 'react'

export default function Avatar({ src, className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div
      className={cva(
        'gradient-border relative size-10 rounded-[10px] after:rounded-[10px] after:bg-ring-cyan overflow-clip after:p-[1.6px]',
        className
      )}
      {...props}
    >
      <img src={src ?? '/Clown.png'} alt="avatar" className="size-full object-cover" />
    </div>
  )
}
