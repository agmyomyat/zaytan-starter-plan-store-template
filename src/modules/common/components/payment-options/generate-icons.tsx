import APP from "@modules/common/icons/app-icon"
import QR from "@modules/common/icons/qr-icon"

const iconsType = {
  QR: "QR",
  PWA: "PWA",
  PIN: "PIN",
  OTP: "OTP",
} as const
export function GenerateIcon(props: { paymentMethod: string }) {
  switch (props.paymentMethod) {
    case iconsType.QR:
      return <QR />
    case iconsType.OTP:
    case iconsType.PIN:
    case iconsType.PWA:
      return <APP />
    default:
      return <div> paymentMethod icon not found</div>
  }
}
