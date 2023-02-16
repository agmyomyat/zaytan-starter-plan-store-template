import Payment from "@modules/common/components/payment-options"
import QrCodeModal from "@modules/kbz-payment/components/qr-code"
import { useEffect, useState } from "react"
function QR() {
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
function APP() {
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
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    </svg>
  )
}
export default function Kbz() {
  const [method, setMethod] = useState("qr")
  const [modal, setModal] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [continueAction, setContinueAction] = useState(() => () => {})
  useEffect(() => {}, [continueAction])
  return (
    <>
      <Payment
        continueAction={continueAction}
        paymentOptions={[
          {
            icon: <QR />,
            prop: {
              label: "Pay With QR",
              methodName: "qr",
              method: method,
              setMethod: () => setMethod("qr"),
              setContinueAction: () => {
                setModal(true)
                setQrCode("amm")
              },
            },
          },
          {
            icon: <APP />,
            prop: {
              setContinueAction: () => {
                alert("app")
              },
              label: "Pay With APP",
              method: method,
              methodName: "app",
              setMethod: () => setMethod("app"),
            },
          },
        ]}
      ></Payment>
      <QrCodeModal open={modal} setOpen={setModal} qrCode={qrCode} />
    </>
  )
}
