import { TGWebApp } from './TgWebApp'

export const openInviteLink = () => {
  if (!TGWebApp) return
  const telegramId = TGWebApp.initDataUnsafe.user.id
  const botName = process.env.VITE_BOT_NAME
  const text = encodeURI('Приглашаем')
  const referLink = encodeURI(`https://t.me/${botName}/hui?start=ref${telegramId}`)
  const link = `https://t.me/share/url?url=${referLink}&text=${text}`
  TGWebApp.openTelegramLink(link)
}

export const generateInviteLink = () => {
  if (!TGWebApp) return
  const telegramId = TGWebApp?.initDataUnsafe?.user?.id ?? 'huy'
  const botName = process.env.VITE_BOT_NAME

  const referLink = encodeURI(`https://t.me/${botName}/hui?start=ref${telegramId}`)
  return `${referLink}`
}
