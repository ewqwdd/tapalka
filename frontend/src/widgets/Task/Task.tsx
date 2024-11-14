import { useSetTasks } from '@/contexts/tasksContext'
import { useSetUser } from '@/contexts/userContext/useUser'
import { type Task as TaskType } from '@/types/Task'
import { api } from '@/lib/api'
import { cva } from '@/lib/cva'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Coin from '@/icons/Coin.svg'
import BgNormal from '@/icons/number-bg.svg'
import BgSuccess from '@/icons/bg-success.svg'
import Check from '@/icons/check.svg'
import { useTranslation } from 'react-i18next'
import { useNotifs } from '@/contexts/notifsContext'
import { TaskReward } from '@/components/TaskReward'

interface TaskProps {
  task: TaskType
  isDaily?: boolean
}

export default function Task({ task, isDaily }: TaskProps) {
  const { icon, id, name, reward, type, completedAt, description, period, startedAt } = task
  const { setTasks } = useSetTasks()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser } = useSetUser()
  const { t } = useTranslation()
  const { addNotif } = useNotifs()

  const complete = () => {
    setIsLoading(true)
    api
      .post('tasks/complete', { id })
      .then(({ data }) => {
        if (data.completedAt) {
          setUser((elem) => ({ ...elem, balance: elem.balance + reward }))
          addNotif(<TaskReward reward={reward} />)
        } else {
          toast('Not completed')
        }
        setTasks((elem) => {
          const foundIndex = elem.findIndex((e) => e.id === id)
          if (foundIndex === -1) return elem
          elem[foundIndex].completedAt = data.completedAt ? new Date(data.completedAt) : undefined
          elem[foundIndex].startedAt = data.startedAt ? new Date(data.startedAt) : undefined
          return elem
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  let disabled
  if (completedAt && type === 'daily') {
    const timeToRefresh = completedAt.getTime() + period - Date.now()
    if (timeToRefresh < 0) {
      disabled = false
    } else {
      disabled = true
    }
  } else if (type === 'default') {
    if (completedAt) {
      disabled = true
    } else if (startedAt) {
      const timeToRefresh = startedAt.getTime() + period - Date.now()
      if (timeToRefresh < 0) {
        disabled = false
      } else {
        disabled = true
      }
    }
  }

  return (
    <button
      className={cva('w-full gap-2 flex p-4 items-center h-[3.625rem] px-4 bg-[#D0E5FF] bg-opacity-[0.07] relative', {
        'opacity-40': isLoading,
        'gradient-border after:bg-linear-task-card rounded-xl after:rounded-xl': isDaily,
        'bg-opacity-[0.03] after:bg-opacity-10': disabled,
      })}
      onClick={complete}
      disabled={disabled}
    >
      {/* {!!startedAt && 'Проверка модерации до' + new Date(time).toLocaleTimeString()} */}
      <img
        src={icon}
        className={cva('size-8', {
          'opacity-50': disabled,
        })}
      />
      <span
        className={cva('tracking-tight max-w-[7.5rem] text-[13px] font-semibold', {
          'text-[#446383]': disabled,
        })}
      >
        {t(`tasks.${task.name}`)}
      </span>
      <div className="ml-auto flex font-bold text-white items-center">
        +{task.reward}
        <Coin className="size-5 ml-1" />
      </div>
      <div className="ml-2 flex items-center justify-center size-[1.625rem]">
        {disabled ? <BgSuccess className="size-full" /> : <BgNormal className="size-full" />}
        <Check className={cva('size-3 absolute', { 'text-white': disabled, 'text-[#394661]': !disabled })} />
      </div>
    </button>
  )
}
