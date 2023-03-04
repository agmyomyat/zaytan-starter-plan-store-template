import { usePayment } from "@lib/context/payment-context"
import PaymentPage from "@modules/common/components/payment-options"
import { GenerateIcon } from "@modules/common/components/payment-options/generate-icons"
import Layout from "@modules/layout/templates"
import OnePayPinModal from "@modules/payment/onepay/pin-modal"
import { OnePayPinFormValues } from "@modules/payment/onepay/pin-modal/modal-content"

import { useCart } from "medusa-react"
import { useRouter } from "next/router"
import { ReactElement, useCallback, useMemo, useState } from "react"
const OnePayMethods = {
  PIN: "PIN",
} as const
export default function OnePay() {
  const { cart } = useCart()
  const [qrModal, setQrModal] = useState(false)
  const [pinModal, setPinModal] = useState(false)
  const { selectedPaymentMethod, getPaymentToken } = usePayment()
  const router = useRouter()
  const paymentMethods =
    (cart?.payment_session?.data?.paymentMethods as string[]) || undefined
  const paymentPagecontinue = useCallback(() => {
    if (selectedPaymentMethod === OnePayMethods.PIN) {
      setPinModal(true)
    }
  }, [selectedPaymentMethod])
  const pinModalContinueAction = useCallback(
    (data: OnePayPinFormValues) => {
      getPaymentToken({
        customerInfo: { phoneNumber: data.phoneNumber },
        onSuccessAction: () => {
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
      <OnePayPinModal
        open={pinModal}
        setOpen={setPinModal}
        continueAction={pinModalContinueAction}
      />
    </>
  )
}
OnePay.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
