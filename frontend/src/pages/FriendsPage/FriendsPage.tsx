import { useFriends, useSetFriends } from '@/contexts/friendsContext'
import { api } from '@/lib/api'
import useThrottle from '@/lib/hooks/useThrottle'
import { generateInviteLink, openInviteLink } from '@/lib/invite'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReferalCard from './ui/ReferalCard'
import { Button } from '@/components/Button'
import toast from 'react-hot-toast'
import { useUser } from '@/contexts/userContext'
import ReferralsList from './ui/Referrals/ReferralsList'
import HowItWorks from './ui/HowItWorks/HowItWorks'

export default function FriendsPage() {
  const { friends, isLoading } = useFriends()
  const { setFriends, setIsLoading } = useSetFriends()

  const user = useUser()

  const { t } = useTranslation()

  const fetchFriends = useThrottle(() => {
    setIsLoading(true)
    api
      .get('user/referals')
      .then(({ data }) => {
        setFriends(data.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, 60 * 1000)

  useEffect(() => {
    if (friends) return
    fetchFriends()
  }, [friends])

  const copyLink = () => {
    window.navigator.clipboard.writeText(generateInviteLink())
    toast(t('copy-success'))
  }

  return (
    <section className="flex flex-col p-5 h-full gap-2 z-10 pb-16">
      <ReferalCard />
      <Button className="z-20 mt-0.5" variant="primary" onClick={copyLink}>
        {t('copy-ref')}
      </Button>
      <ReferralsList isLoading={isLoading} list={friends} />
      <HowItWorks />
    </section>
  )
}
