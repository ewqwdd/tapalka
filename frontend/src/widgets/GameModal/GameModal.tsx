import { Modal } from '@/components/Modal'
import { MyGame } from '@/contexts/statsContext'
import LinkIcon from '@/icons/Link.svg'
import { useTranslation } from 'react-i18next'
import Item from './ui/Item'
import Headers from './ui/Headers'

interface GameModalProps {
  game: MyGame
  open?: boolean
  onClose: () => void
}

export default function GameModal({ game, open, onClose }: GameModalProps) {
  const { t } = useTranslation()
  return (
    <Modal open={open} onClose={onClose} className="p-5 bg-opacity-80 mt-5">
      <div className="flex gap-2 items-start opacity-70 self-start">
        <h3 className="font-semibold tracking-tight">
          {t('Game')} № {game.id} (UUID v4)
        </h3>
        <LinkIcon className="size-[26px] ml-0.5 text-fouritary" />
      </div>
      <span className="uppercase text-xs tracking-tight mt-1 opacity-70 font-light">{t('date')}: 18.08.2024</span>
      <span className="uppercase text-xs tracking-tight mt-1 opacity-70 font-light">
        {t('time')}: 16:30:21 - 16:32:52 (2 min)
      </span>
      <ul className="flex flex-col gap-1 mt-9">
        <Headers />
        {game.players.map(({ id, name }) => (
          <Item amount={game.amount} id={id} name={name} loserId={game?.loser?.id} />
        ))}
      </ul>
    </Modal>
  )
}
