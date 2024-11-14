import { useUser } from '@/contexts/userContext'
import { memo } from 'react'

export default memo(function Avatar() {
  const { avatar } = useUser()
  return (
    <div className="gradient-border relative size-10 rounded-[10px] after:rounded-[10px] after:bg-ring-cyan overflow-clip after:p-[1.6px]">
      <img src={avatar ?? '/Clown.png'} alt="avatar" className="size-full object-cover" />
    </div>
  )
})
