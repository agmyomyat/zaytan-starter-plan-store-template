import { usePayment } from "@lib/context/payment-context"
import { useCart } from "medusa-react"
import { QRCodeSVG } from "qrcode.react"
import PaymentModal from "../components/payment-modal"

export default function QrCodeModal() {
  const { paymentModal, setPaymentModal } = usePayment()
  const { cart } = useCart()
  return (
    <PaymentModal open={paymentModal} setOpen={setPaymentModal}>
      <div className="w-full p-4 rounded-t shadow-[0px_5px_10px_-7px_rgba(0,0,0,0.3)] border-gray-400">
        <h3 className="text-start text-sm sm:text-lg text-gray-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="mr-2 inline w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Scan With Aya Pay Mobile App
        </h3>
      </div>
      <QRCodeSVG
        value={cart?.payment_session?.data.qrCode as string}
        className="w-96 h-96 p-10 max-w-full"
      />
    </PaymentModal>
  )
}
