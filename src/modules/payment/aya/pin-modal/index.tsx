import { usePayment } from "@lib/context/payment-context"
import { useCart } from "medusa-react"
import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import PaymentModal from "../../components/payment-modal"
import ModalContent, { AyaPinFormValues } from "./modal-content"

export default function PinModal() {
  const { paymentModal, setPaymentModal } = usePayment()
  const form = useForm<AyaPinFormValues>({
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
  const onApply = (data: AyaPinFormValues) => {
    // setSubmitting(true)
    // setError(undefined)

    // if (data.old_password === data.new_password) {
    //   setSubmitting(false)
    //   setError("New password must be different from old password.")
    return
  }
  const { cart } = useCart()
  return (
    <PaymentModal open={true} setOpen={setPaymentModal}>
      <ModalContent {...form} defaultValue={phoneNumber} onApply={onApply} />
    </PaymentModal>
  )
}
