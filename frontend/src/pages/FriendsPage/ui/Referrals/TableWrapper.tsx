import { ReactNode } from 'react'
import Headers from './Headers'

interface TableWrapperProps {
  children: ReactNode
}

export default function TableWrapper({ children }: TableWrapperProps) {
  return (
    <div className="flex flex-col gap-1 mt-10">
      <Headers />
      {children}
    </div>
  )
}
