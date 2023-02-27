import { PaymentInfo, usePayment } from "@lib/context/payment-context"
import useNotification from "@lib/hooks/use-notification"
import type { Cart } from "@medusajs/medusa"
import PaymentPage from "@modules/common/components/payment-options"
import { GenerateIcon } from "@modules/common/components/payment-options/generate-icons"
import Layout from "@modules/layout/templates"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"
import { ReactElement, useCallback, useEffect, useMemo, useState } from "react"
const MpuPaymentMethods = {
  OTP: "OTP",
} as const
export default function MPU() {
  const { cart } = useCart()
  const notification = useNotification()
  const { selectedPaymentMethod, getPaymentToken } = usePayment()
  const router = useRouter()
  const paymentMethods =
    (cart?.payment_session?.data?.paymentMethods as string[]) || undefined
  const paymentPagecontinue = useCallback(
    (cart: Omit<Cart, "refundable_amount" | "refunded_total">) => {
      const _paymentInfo = cart?.payment_session?.data
        ?.paymentInfo as PaymentInfo
      if (selectedPaymentMethod === MpuPaymentMethods.OTP) {
        return window.open(_paymentInfo?.redirectUrl, "_blank") as Window
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
              onSuccessAction: (cart) => paymentPagecontinue(cart),
            })
          }
          paymentOptions={paymentOptions}
        ></PaymentPage>
      )}
    </>
  )
}
MPU.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
