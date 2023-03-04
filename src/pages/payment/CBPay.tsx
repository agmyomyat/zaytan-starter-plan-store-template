import { PaymentInfo, usePayment } from "@lib/context/payment-context"
import type { Cart } from "@medusajs/medusa"
import PaymentPage from "@modules/common/components/payment-options"
import { GenerateIcon } from "@modules/common/components/payment-options/generate-icons"
import Layout from "@modules/layout/templates"
import { useCart } from "medusa-react"
import { ReactElement, useCallback, useMemo } from "react"
const CbPayMethods = {
  QR: "QR",
} as const
export default function CBPay() {
  const { cart } = useCart()
  const { selectedPaymentMethod, getPaymentToken } = usePayment()
  const paymentMethods =
    (cart?.payment_session?.data?.paymentMethods as string[]) || undefined
  const action = useCallback(
    (cart: Omit<Cart, "refundable_amount" | "refunded_total">) => {
      const _paymentInfo = cart?.payment_session?.data
        ?.paymentInfo as PaymentInfo

      if (selectedPaymentMethod === CbPayMethods.QR) {
        if (_paymentInfo?.redirectUrl) {
          //test in mobile
          return window.open(_paymentInfo?.redirectUrl, "_blank") as Window
          //       return (redirect.location.href = paymentInfo?.redirectUrl as string)
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
CBPay.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
