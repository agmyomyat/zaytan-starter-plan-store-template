import type { Cart } from "@medusajs/medusa"
import { useCart, useUpdatePaymentSession } from "medusa-react"
import React, { createContext, useCallback, useContext, useState } from "react"
export type PaymentInfo = {
  qrCode: string | undefined
  formToken: string | undefined
  merchantOrderId: string | undefined
  trxNumber: string | undefined
  redirectUrl: string | undefined
}
export interface PaymentContext {
  selectedPaymentMethod: string
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>
  getPaymentToken: (props: {
    customerInfo: Record<string, unknown>
    // to trigger this action after requested payment tokens
    onSuccessAction: (
      cart: Omit<Cart, "refundable_amount" | "refunded_total">
    ) => void
  }) => void
  updatingPaymentSession: boolean
  paymentInfo: PaymentInfo
}
const PaymentContext = createContext<PaymentContext | null>(null)

export interface PaymentProviderProps {
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const { setCart, cart } = useCart()
  const {
    mutate: updatePaymentSessionMutation,
    isLoading: updatingPaymentSession,
  } = useUpdatePaymentSession(cart?.id!)
  const paymentInfo = cart?.payment_session?.data?.paymentInfo as PaymentInfo

  const getPaymentToken = useCallback(
    (props: {
      customerInfo: Record<string, unknown>
      onSuccessAction: (
        cart: Omit<Cart, "refundable_amount" | "refunded_total">
      ) => void
    }) => {
      if (!cart || !cart.payment_session)
        throw new Error("Cart or Payment Session Not found")
      if (cart && cart.payment_session) {
        updatePaymentSessionMutation(
          {
            data: {
              cartId: cart.id,
              paymentMethod: selectedPaymentMethod,
              customerInfo: props.customerInfo || {},
            },
            provider_id: cart.payment_session?.provider_id,
          },
          {
            onSuccess: ({ cart }) => {
              setCart(cart)
              props.onSuccessAction(cart)
            },
          }
        )
      }
    },
    [cart, selectedPaymentMethod, setCart, updatePaymentSessionMutation]
  )
  return (
    <PaymentContext.Provider
      value={{
        paymentInfo,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
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
