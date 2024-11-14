import { ReactNode } from 'react'

interface SectionTitle {
  children: ReactNode
}

export default function SectionTitle({ children }: SectionTitle) {
  return <h2 className="font-bold text-foreground-7 uppercase tracking-wider mt-6 mb-2 text-xs">{children}</h2>
}
