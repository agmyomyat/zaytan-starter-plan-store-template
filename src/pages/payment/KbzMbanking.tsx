import { PaymentInfo, usePayment } from "@lib/context/payment-context"
import { windowRedirect } from "@lib/util/redirect"
import type { Cart } from "@medusajs/medusa"
import PaymentPage from "@modules/common/components/payment-options"
import { GenerateIcon } from "@modules/common/components/payment-options/generate-icons"
import Layout from "@modules/layout/templates"
import { useCart } from "medusa-react"
import { ReactElement, useCallback, useMemo } from "react"
const KbzMbankingMethods = {
  PWA: "PWA",
} as const
export default function KbzMbanking() {
  const { cart } = useCart()
  const { selectedPaymentMethod, getPaymentToken } = usePayment()
  const paymentMethods =
    (cart?.payment_session?.data?.paymentMethods as string[]) || undefined
  const action = useCallback(
    (cart: Omit<Cart, "refundable_amount" | "refunded_total">) => {
      const _paymentInfo = cart?.payment_session?.data
        ?.paymentInfo as PaymentInfo

      if (selectedPaymentMethod === KbzMbankingMethods.PWA) {
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
    </>
  )
}
KbzMbanking.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
