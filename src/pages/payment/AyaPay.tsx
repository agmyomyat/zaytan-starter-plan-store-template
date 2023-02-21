import { PaymentInfo, usePayment } from "@lib/context/payment-context"
import useNotification from "@lib/hooks/use-notification"
import PaymentPage from "@modules/common/components/payment-options"
import { GenerateIcon } from "@modules/common/components/payment-options/generate-icons"
import Layout from "@modules/layout/templates"
import PinModal from "@modules/payment/aya/pin-modal"
import { AyaPinFormValues } from "@modules/payment/aya/pin-modal/modal-content"
import AyaQrCodeModal from "@modules/payment/aya/qr-code-modal"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react"
const AyaPaymentMethods = {
  QR: "QR",
  PIN: "PIN",
} as const
export default function AyaPay() {
  const { cart } = useCart()
  const [qrModal, setQrModal] = useState(false)
  const [pinModal, setPinModal] = useState(false)
  const notification = useNotification()
  const { selectedPaymentMethod, getPaymentToken } = usePayment()
  const router = useRouter()
  const paymentMethods =
    (cart?.payment_session?.data?.paymentMethods as string[]) || undefined
  const paymentPagecontinue = useCallback(() => {
    if (selectedPaymentMethod === AyaPaymentMethods.QR) {
      return getPaymentToken({
        customerInfo: {},
        action: (cart) => {
          const _paymentInfo = cart?.payment_session?.data
            ?.paymentInfo as PaymentInfo
          if (_paymentInfo?.qrCode) {
            return setQrModal(true)
          }
        },
      })
    }
    if (selectedPaymentMethod === AyaPaymentMethods.PIN) {
      setPinModal(true)
    }
  }, [getPaymentToken, selectedPaymentMethod])
  const pinModalContinueAction = useCallback(
    (data: AyaPinFormValues) => {
      getPaymentToken({
        customerInfo: { phoneNumber: data.phoneNumber },
        action: () => {
          return
        },
      })
    },
    [getPaymentToken]
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
          paymentContinue={paymentPagecontinue}
          paymentOptions={paymentOptions}
        ></PaymentPage>
      )}
      <AyaQrCodeModal open={qrModal} setOpen={setQrModal} />
      <PinModal
        open={pinModal}
        setOpen={setPinModal}
        continueAction={pinModalContinueAction}
      />
    </>
  )
}
AyaPay.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
