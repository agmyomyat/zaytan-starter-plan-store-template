import { useCheckout } from "@lib/context/checkout-context"
import { useStore } from "@lib/context/store-context"
import { PaymentSession } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import Spinner from "@modules/common/icons/spinner"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

type PaymentButtonProps = {
  paymentSession?: PaymentSession | null
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ paymentSession }) => {
  const [notReady, setNotReady] = useState(true)
  const { cart } = useCart()
  const { discountLoading } = useStore()

  useEffect(() => {
    setNotReady(true)

    if (!cart) {
      return
    }

    if (!cart.shipping_address) {
      return
    }

    if (!cart.billing_address) {
      return
    }

    if (!cart.email) {
      return
    }
    if (!cart.shipping_address.phone) {
      return
    }

    if (cart.shipping_methods.length < 1) {
      return
    }

    setNotReady(false)
  }, [cart])

  switch (paymentSession?.provider_id) {
    case "manual":
      return <ManualTestPaymentButton notReady={notReady || discountLoading} />
    case "KbzPay":
    case "AyaPay":
    case "WavePay":
    case "MPU":
    case "KbzMbanking":
    case "CBPay":
    case "MPTPay":
    case "MytelPay":
    case "OnePay":
      return <DingerPaymentButton notReady={notReady || discountLoading} />
    default:
      return <Button disabled>Select a payment method</Button>
  }
}
const DingerPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)

  const { cart } = useCart()
  const router = useRouter()
  const handlePayment = () => {
    if (cart?.payment_session?.provider_id) {
      setSubmitting(true)
      router.push(`/payment/${cart.payment_session.provider_id}`)
    }
  }
  return (
    <Button disabled={submitting || notReady} onClick={handlePayment}>
      {submitting ? <Spinner /> : "Checkout"}
    </Button>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)

  const { onPaymentCompleted } = useCheckout()

  const handlePayment = () => {
    setSubmitting(true)

    onPaymentCompleted()

    setSubmitting(false)
  }

  return (
    <Button disabled={submitting || notReady} onClick={handlePayment}>
      {submitting ? <Spinner /> : "Checkout"}
    </Button>
  )
}

export default PaymentButton
