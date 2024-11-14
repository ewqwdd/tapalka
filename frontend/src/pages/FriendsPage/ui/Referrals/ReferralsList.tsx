import { User } from '@/types/User'
import { useTranslation } from 'react-i18next'
import TableWrapper from './TableWrapper'
import ReferalItem from './ReferalItem'

interface ReferralsListProp {
  list: User[]
  isLoading?: boolean
}

export default function ReferralsList({ list, isLoading }: ReferralsListProp) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <TableWrapper>
        {new Array(5).fill(0).map((_, index) => (
          <figure className="h-[3.625rem] bg-overlay-8 bg-opacity-[0.03] rounded-xl" key={index} />
        ))}
      </TableWrapper>
    )
  }

  if (!list || list.length === 0) {
    return (
      <div
        className="h-[75px] flex items-center justify-center rounded-xl mt-10 text-xs font-semibold text-foreground-7"
        style={{
          background: 'hsla(221, 44%, 37%, 0.18)',
        }}
      >
        <p>{t('no-referrals')}</p>
      </div>
    )
  }

  return (
    <TableWrapper>
      {list.map((elem) => (
        <ReferalItem key={elem.id} user={elem} />
      ))}
    </TableWrapper>
  )
}
