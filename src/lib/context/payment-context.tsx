import { useCart, useUpdatePaymentSession } from "medusa-react"
import React, { createContext, useCallback, useContext, useState } from "react"
interface PaymentContext {
  paymentMethod: string
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>
  getPaymentToken: () => void
  updatingPaymentSession: boolean
  paymentModal: boolean
  setPaymentModal: React.Dispatch<React.SetStateAction<boolean>>
}
const PaymentContext = createContext<PaymentContext | null>(null)

interface PaymentProviderProps {
  children?: React.ReactNode
}
interface PaymentTokenResponse {
  qrCode: string
  formToken: string
  transactionNumber: string
  merchantOrderNumber: string
  redirectUrl: string
}
export const PaymentProvider = ({ children }: PaymentProviderProps) => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const { setCart, cart } = useCart()
  const [paymentModal, setPaymentModal] = useState(false)
  const {
    mutate: updatePaymentSessionMutation,
    isLoading: updatingPaymentSession,
  } = useUpdatePaymentSession(cart?.id!)
  const getPaymentToken = useCallback(() => {
    if (!cart || !cart.payment_session)
      throw new Error("Cart or Payment Session Not found")
    if (cart && cart.payment_session) {
      updatePaymentSessionMutation(
        {
          data: { cartId: cart.id, paymentMethod: paymentMethod },
          provider_id: cart.payment_session?.provider_id,
        },
        {
          onSuccess: ({ cart }) => {
            if (cart.payment_session?.data.qrCode) {
              setPaymentModal(true)
            }
            if (cart.payment_session?.data?.redirectUrl) {
              const redirect = window.open("", "_blank") as Window
              redirect.location.href = cart.payment_session.data
                .redirectUrl as string
            }
            setCart(cart)
          },
        }
      )
    }
  }, [cart, paymentMethod, setCart, updatePaymentSessionMutation])
  return (
    <PaymentContext.Provider
      value={{
        paymentModal,
        setPaymentModal,
        paymentMethod,
        setPaymentMethod,
        getPaymentToken,
        updatingPaymentSession,
      }}
    >
      {children}
    </PaymentContext.Provider>
  )
}
export const usePayment = () => {
  const context = useContext(PaymentContext)

  if (context === null) {
    throw new Error("usePayment must be used within a PaymentProvider")
  }
  return context
}
