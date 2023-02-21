import Notification, {
  NotificationTypes,
} from "@modules/common/components/notifications"
import { toast } from "react-hot-toast"

const useNotification = () => {
  return (title: string, message: string, type: NotificationTypes) => {
    toast.custom(
      (t) => (
        <Notification toast={t} type={type} title={title} message={message} />
      ),
      {
        position: "top-right",
        duration: 3000,
      }
    )
  }
}

export default useNotification
