//@ts-ignore
import { NotificationManager } from 'react-notifications'

// Определение возможных типов уведомлений
type NotificationType = 'info' | 'success' | 'warning' | 'error'

// Интерфейс для параметров функции уведомления
interface NotifyParams {
  type: NotificationType
  message: string
  title?: string
  duration?: number
  callback?: () => void
}

// Типизированная функция уведомления
const notify = ({
  type,
  message,
  title,
  duration = 5000,
  callback,
}: NotifyParams) => {
  switch (type) {
    case 'info':
      NotificationManager.info(message, title, duration)
      break
    case 'success':
      NotificationManager.success(message, title, duration)
      break
    case 'warning':
      NotificationManager.warning(message, title, duration)
      break
    case 'error':
      NotificationManager.error(message, title, duration, callback)
      break
    default:
      break
  }
}

export default notify
