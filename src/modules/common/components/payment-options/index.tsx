import { usePayment } from "@lib/context/payment-context"
import { useCart } from "medusa-react"
import { useEffect, useMemo } from "react"
import CartItemsList from "./components/cart-items-list"
import PaymentOptionsContainer from "./components/options-container"
import PaymentCard from "./components/payment-card"
import { formatAmount } from "medusa-react"
interface PaymentOption {
  label: string
  methodName: string
  icon: JSX.Element
}
interface IPayment {
  paymentOptions: PaymentOption[]
  paymentContinue: () => void
}
export default function PaymentPage(props: IPayment) {
  const {
    updatingPaymentSession,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = usePayment()
  //Set Default Payment Card
  useEffect(() => {
    if (props?.paymentOptions?.[0].methodName) {
      setSelectedPaymentMethod(props.paymentOptions[0].methodName)
    }
  }, [props.paymentOptions, setSelectedPaymentMethod])
  function PaymentCards() {
    return (
      <>
        {props.paymentOptions.map((option, i) => {
          return (
            <PaymentCard
              key={i}
              {...option}
              method={selectedPaymentMethod}
              setMethod={() => setSelectedPaymentMethod(option.methodName)}
            >
              {option.icon}
            </PaymentCard>
          )
        })}
      </>
    )
  }
  const { cart } = useCart()
  const getTotal = useMemo(() => {
    if (!cart || !cart.region) return "0"
    return formatAmount({
      amount: cart?.total || 0,
      region: cart?.region,
      includeTaxes: false,
    })
  }, [cart])
  const shippingTotal = useMemo(() => {
    if (cart?.shipping_total) {
      return formatAmount({
        amount: cart.shipping_total || 0,
        region: cart.region,
        includeTaxes: false,
      })
    }
  }, [cart?.region, cart?.shipping_total])
  const getcartItems = useMemo(() => {
    if (cart && cart.items && cart.items.length) {
      return cart?.items.map((item) => {
        return {
          amount: formatAmount({
            amount: item.total || 0,
            region: cart.region,
            includeTaxes: false,
          }),
          name: item.title || "",
          quantity: item.quantity || 0,
        }
      })
    }
    return []
  }, [cart])
  // const [continueAction, setContinueAction] = useState(prop.continueAction)
  return (
    <PaymentOptionsContainer
      total={getTotal}
      updatingPaymentSession={updatingPaymentSession}
      continue={props.paymentContinue}
      PaymentCards={<PaymentCards />}
      CartItemsList={
        <CartItemsList
          items={getcartItems}
          shippingTotal={shippingTotal || ""}
        />
      }
    />
  )
}
