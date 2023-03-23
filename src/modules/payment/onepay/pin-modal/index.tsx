import { usePayment } from "@lib/context/payment-context"
import useNotification from "@lib/hooks/use-notification"
import { useTransactionStatus } from "@lib/hooks/use-transaction-status"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import PaymentModal from "../../components/payment-modal"
import ModalContent, {
  OnePayPinFormValues,
  PaymentSteps,
} from "./modal-content"

export default function OnePayPinModal(props: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  continueAction: (data: OnePayPinFormValues) => void
}) {
  const [paymentSteps, setPaymentSteps] = useState<PaymentSteps>("phone_info")
  const { updatingPaymentSession } = usePayment()
  const { cart } = useCart()
  const notification = useNotification()
  const { push } = useRouter()
  const status = useTransactionStatus(props.open)
  useEffect(() => {
    if (status === "SUCCESS") {
      push(`/order/confirmed?cart_id=${cart!.id}`)
    }
  }, [cart, push, status])
  const form = useForm<OnePayPinFormValues>({
    defaultValues: {
      phoneNumber: "",
    },
  })
  useEffect(() => {
    form.reset({
      phoneNumber: "",
    })
  }, [form])

  const phoneNumber = useWatch({
    control: form.control,
    name: "phoneNumber",
  })
  const onContinue = (data: OnePayPinFormValues) => {
    const phoneNumber = parseInt(data.phoneNumber)
    if (
      data.phoneNumber.length !== 11 ||
      Number.isNaN(phoneNumber) ||
      phoneNumber.toString().length !== 10
    ) {
      return notification("Invalid", "Invalid Phone Number", "error")
    }

    props.continueAction(data)
    setPaymentSteps("waiting_for_payment")
  }
  return (
    <PaymentModal
      loading={paymentSteps === "waiting_for_payment"}
      hideCloseButton={paymentSteps === "waiting_for_payment"}
      open={props.open}
      setOpen={props.setOpen}
    >
      <ModalContent
        {...form}
        defaultValue={phoneNumber}
        onApply={onContinue}
        paymentSteps={paymentSteps}
        buttonDisable={updatingPaymentSession}
        buttonLoading={updatingPaymentSession}
      />
    </PaymentModal>
  )
}
