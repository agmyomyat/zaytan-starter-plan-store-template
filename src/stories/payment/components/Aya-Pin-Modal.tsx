import { usePayment } from "@lib/context/payment-context"
import customer from "@medusajs/medusa/dist/services/customer"
import ConnectForm from "@modules/common/components/connect-form"
import Input from "@modules/common/components/input"
import ModalContent, {
  AyaPinFormValues,
  PaymentSteps,
} from "@modules/payment/aya/pin-modal/modal-content"
import PaymentModal from "@modules/payment/components/payment-modal"

import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"

export default function PinModalStory(props: {
  open: boolean
  setOpen: () => void
  paymentSteps: PaymentSteps
  loading: boolean
}) {
  const [loading, setLoading] = useState(false)
  // const [paymentSteps, setPaymentSteps] = useState<PaymentSteps>(
  //   "waiting_for_payment"
  // )
  const form = useForm<AyaPinFormValues>({
    defaultValues: {
      phoneNumber: "",
    },
    reValidateMode: "onChange",
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
  useEffect(() => {
    console.log("formstate error", form.formState.errors.phoneNumber)
  }, [form.formState.errors.phoneNumber])
  const onApply = (data: AyaPinFormValues) => {
    setLoading(true)
    console.log(data.phoneNumber)
    // alert(data.phoneNumber)
    return
  }
  return (
    <PaymentModal
      loading={props.loading}
      open={props.open}
      setOpen={props.setOpen}
      paymentSteps={props.paymentSteps}
    >
      <ModalContent
        {...form}
        onApply={onApply}
        defaultValue={phoneNumber}
        paymentSteps={props.paymentSteps}
      />
    </PaymentModal>
  )
}
