import APP from "@modules/common/icons/app-icon"
import QR from "@modules/common/icons/qr-icon"

const iconsType = {
  QR: "QR",
  PWA: "PWA",
  PIN: "PIN",
  OTP: "OTP",
} as const
export function GenerateIcon(props: { paymentMethod: string }) {
  if (props.paymentMethod === iconsType.QR) {
    return <QR />
  }
  return <APP />
}
