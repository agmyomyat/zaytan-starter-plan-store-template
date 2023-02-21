import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import PhoneIcon from "@modules/common/icons/phone-icon"
import { useEffect } from "react"
import { UseFormReturn } from "react-hook-form"

export type AyaPinFormValues = { phoneNumber: string }
export type PaymentSteps = "phone_info" | "waiting_for_payment"
// const PaymentSteps = "phone_info" || "waiting_for_payment" as const
export default function ModalContent(
  props: UseFormReturn<AyaPinFormValues, any> & {
    defaultValue: string
    onApply: (data: AyaPinFormValues) => void
    paymentSteps: PaymentSteps
  }
) {
  return (
    <div className="w-full p-4 rounded-t shadow-[0px_5px_10px_-7px_rgba(0,0,0,0.3)] border-gray-400 space-y-4">
      <div className="flex flex-row">
        <PhoneIcon className="mr-2 inline" />
        <h3 className="text-start text-sm sm:text-xl font-semibold text-gray-900">
          {props.paymentSteps === "phone_info"
            ? "Enter Your Aya Pay Phone Number"
            : "Waiting for your Payment"}
        </h3>
      </div>
      {props.paymentSteps === "phone_info" && (
        <form onSubmit={props.handleSubmit(props.onApply)}>
          <div className="grid grid-cols-[1fr_100px] gap-x-2">
            <Input
              label="Phone Number (09***)"
              {...props.register("phoneNumber", {
                required: "Enter Your Phone Number",
              })}
              errors={props.formState.errors.phoneNumber}
              defaultValue={props.defaultValue}
            />
            <div>
              <Button
                type="submit"
                className="!min-h-[0] h-11 w-[80px] text-base"
              >
                Continue
              </Button>
            </div>
          </div>
        </form>
      )}
      {props.paymentSteps === "waiting_for_payment" && (
        <h1 className="m-2 ml-10 pb-2 text-sm sm:text-lg">
          Please check your AyaPay App for Notification
        </h1>
      )}
    </div>
  )
}
