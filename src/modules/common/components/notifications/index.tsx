import AlertIcon from "@modules/common/icons/alert-circle"
import CheckCircleIcon from "@modules/common/icons/check-circle-icon"
import InfoIcon from "@modules/common/icons/info-icon"
import X from "@modules/common/icons/x"
import XCircleIcon from "@modules/common/icons/x-circle-icon"
import React from "react"
import type { Toast } from "react-hot-toast"
import { toast as globalToast } from "react-hot-toast"
import ToasterContainer from "./toaster-container"

export type NotificationTypes = "success" | "warning" | "error" | "info"

type NotificationProps = {
  toast: Toast
  type: NotificationTypes
  title: string
  message: string
}

const Notification: React.FC<NotificationProps> = ({
  toast,
  type,
  title,
  message,
}) => {
  const onDismiss = () => {
    globalToast.dismiss(toast.id)
  }

  return (
    <ToasterContainer visible={toast.visible} className="w-[380px]">
      <div className="mt-[3px]">{getIcon(type)}</div>
      <div className="flex flex-col ml-3 mr-2 gap-y-1 flex-grow text-white">
        <span className="inter-small-semibold">{title}</span>
        <span className="inter-small-regular text-gray-200">{message}</span>
      </div>
      <div>
        <button onClick={onDismiss}>
          <X size={ICON_SIZE} className="text-gray-200" />
        </button>
        <span className="sr-only">Close</span>
      </div>
    </ToasterContainer>
  )
}

const ICON_SIZE = 20

function getIcon(type: NotificationTypes) {
  switch (type) {
    case "success":
      return <CheckCircleIcon size={ICON_SIZE} className="text-green-400" />
    case "warning":
      return <AlertIcon size={ICON_SIZE} className="text-orange-400" />
    case "error":
      return <XCircleIcon size={ICON_SIZE} className="text-rose-700" />
    default:
      return <InfoIcon size={ICON_SIZE} className="text-green-400" />
  }
}

export default Notification
