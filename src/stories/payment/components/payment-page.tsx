import { queryClient } from "@lib/config"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import CartItemsList from "@modules/common/components/payment-options/components/cart-items-list"
import OptionsContainer, {
  OptionsContainerProps,
} from "@modules/common/components/payment-options/components/options-container"
import PaymentCard from "@modules/common/components/payment-options/components/payment-card"
import APP from "@modules/common/icons/app-icon"
import Layout from "@modules/layout/templates"
import { CartProvider, MedusaProvider } from "medusa-react"
function QrIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className="w-9 h-9 sm:w-28 sm:h-28 max-w-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
      />
    </svg>
  )
}
const mockPaymentOptions = [
  {
    label: "pay with qr",
    methodName: "QR",

    icon: <QrIcon />,
  },
  {
    label: "pay with APP",
    methodName: "APP",

    icon: <APP />,
  },
]
interface PaymentCardProps {
  paymentMethod: string
}
const PaymentCards: React.FC<PaymentCardProps> = (props) => {
  return (
    <>
      {mockPaymentOptions.map((option, i) => (
        <PaymentCard
          key={i}
          {...option}
          method={props.paymentMethod}
          setMethod={() => null}
        >
          {option.icon}
        </PaymentCard>
      ))}
    </>
  )
}
const mockItems = [
  { name: "Red T-Shirt", quantity: 2, amount: "10000" },
  { name: "Blue Jeans", quantity: 1, amount: "25000" },
  { name: "Sneakers", quantity: 3, amount: "5000" },
  { name: "Leather Belt", quantity: 1, amount: "15000" },
  { name: "Black Socks", quantity: 2, amount: "8000" },
  { name: "Sport Watch", quantity: 1, amount: "20000" },
  { name: "Baseball Cap", quantity: 4, amount: "7000" },
]
export default function PaymentPageStory(
  props: Omit<OptionsContainerProps, "PaymentCards" | "CartItemsList"> & {
    paymentMethod: string
  }
) {
  return (
    <div>
      <OptionsContainer
        {...props}
        PaymentCards={<PaymentCards paymentMethod={props.paymentMethod} />}
        CartItemsList={<CartItemsList items={mockItems} />}
      />
    </div>
  )
}
