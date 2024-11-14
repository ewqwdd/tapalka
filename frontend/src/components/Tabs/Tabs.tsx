import { cva } from '@/lib/cva'
import { HTMLAttributes, ReactNode } from 'react'
import { Button } from '../Button'

type Tab = {
  label: string | ReactNode
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[]
  tabChange: (v: number) => void
  active: number
}

export default function Tabs({ tabs, className, tabChange, active, ...props }: TabsProps) {
  return (
    <div className={cva('flex', className)} {...props}>
      {tabs.map((elem, index) => (
        <Button
          variant="tab"
          className={cva({ 'border-gold-2 bg-linear-gold text-[#2C4883]': active === index })}
          key={index}
          onClick={() => tabChange(index)}
        >
          {elem.label}
        </Button>
      ))}
    </div>
  )
}
