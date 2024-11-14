import { useTasks } from '@/contexts/tasksContext'
import { Task } from '@/widgets/Task'
import TasksCard from './ui/TasksCard'
import { useTranslation } from 'react-i18next'
import SectionTitle from './ui/SectionTitle'

export default function TasksPage() {
  const { tasks, isLoading } = useTasks()
  const { t } = useTranslation()
  console.log(tasks)
  const dailyIndex = tasks.findIndex((elem) => elem.type === 'daily')
  const dailyTask = tasks?.[dailyIndex]
  const filtered = [...tasks]
  if (dailyIndex !== -1) filtered.splice(dailyIndex, 1)

  return (
    <section className="flex flex-col p-5 h-full z-10 pb-16">
      <TasksCard />
      <SectionTitle>{t('tasks.daily')}</SectionTitle>
      {dailyTask && <Task isDaily task={dailyTask} />}
      <SectionTitle>{t('tasks.other')}</SectionTitle>
      <div className="flex flex-col gap-1">
        {filtered.map((elem) => (
          <Task task={elem} key={elem.id} />
        ))}
      </div>
    </section>
  )
}
