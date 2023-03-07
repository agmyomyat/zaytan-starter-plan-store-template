import { PaymentInfo, usePayment } from "@lib/context/payment-context"
import useNotification from "@lib/hooks/use-notification"
import type { Cart } from "@medusajs/medusa"
import PaymentPage from "@modules/common/components/payment-options"
import { GenerateIcon } from "@modules/common/components/payment-options/generate-icons"
import Layout from "@modules/layout/templates"
import dynamic from "next/dynamic"
const KbzQrCodeModal = dynamic(
  () => import("@modules/payment/kbz/qr-code-modal"),
  { ssr: false }
)
import { useCart } from "medusa-react"
import { useRouter } from "next/router"
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react"
import { windowRedirect } from "@lib/util/redirect"
const KbzPaymentMethods = {
  QR: "QR",
  PWA: "PWA",
} as const
export default function KbzPay() {
  const { cart } = useCart()
  const notification = useNotification()
  const [qrModal, setQrModal] = useState(false)
  const { selectedPaymentMethod, getPaymentToken } = usePayment()
  const router = useRouter()
  const paymentMethods =
    (cart?.payment_session?.data?.paymentMethods as string[]) || undefined
  const action = useCallback(
    (cart: Omit<Cart, "refundable_amount" | "refunded_total">) => {
      const _paymentInfo = cart?.payment_session?.data
        ?.paymentInfo as PaymentInfo
      if (selectedPaymentMethod === KbzPaymentMethods.QR) {
        if (_paymentInfo?.qrCode) {
          return setQrModal(true)
        }
      }
      if (selectedPaymentMethod === KbzPaymentMethods.PWA) {
        if (_paymentInfo?.redirectUrl) {
          windowRedirect(_paymentInfo?.redirectUrl)
        }
      }
    },
    [selectedPaymentMethod]
  )
  const paymentOptions = useMemo(() => {
    if (!paymentMethods || !paymentMethods.length) return
    return paymentMethods.map((method) => {
      return {
        icon: GenerateIcon({ paymentMethod: method }),
        label: `Pay With ${method}`,
        methodName: method,
      }
    })
  }, [paymentMethods])
  return (
    <>
      {!paymentOptions || !paymentOptions.length ? null : (
        <PaymentPage
          paymentContinue={() =>
            getPaymentToken({
              customerInfo: {},
              onSuccessAction: (cart) => action(cart),
            })
          }
          paymentOptions={paymentOptions}
        ></PaymentPage>
      )}
      <KbzQrCodeModal open={qrModal} setOpen={setQrModal} />
    </>
  )
}
KbzPay.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
