import { Dispatch, SetStateAction, useState } from "react"
import Button from "../button"
import CartItemsList from "./components/cart-items-list"
import PaymentCard from "./components/payment-card"
interface IPayment {
  continueAction: () => void
  paymentOptions: {
    prop: {
      label: string
      methodName: string
      method: string
      setMethod: () => void
      setContinueAction: Dispatch<SetStateAction<void>>
    }
    icon: React.ReactNode
  }[]
}
export default function Payment(prop: IPayment) {
  const [state, setState] = useState("app")
  // const [continueAction, setContinueAction] = useState(prop.continueAction)
  return (
    <div className="absolute min-h-screen w-screen bg-gray-100 flex justify-center">
      <div className="relative  bg-white  max-w-full h-fit w-full mt-24  mx-10 sm:mx-96">
        <div className="sticky top-0 z-10 mb-5 pb-2 bg-inherit  shadow-[0px_5px_10px_-7px_rgba(0,0,0,0.3)]">
          <div className=" flex items-center justify-between rounded-t-md w-full h-11 bg-gray-100">
            <h1 className="text-base text-left font-normal text-gray-800 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="inline mr-1 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
              Choose Your Payment Method
            </h1>
            <h1 className="text-base text-start font-normal text-gray-800 py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                className="inline mr-1 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
              </svg>
              15000 Ks
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-20 justify-center items-center m-6">
            {prop.paymentOptions.map((option, i) => {
              return (
                <PaymentCard key={i} {...option.prop}>
                  {option.icon}
                </PaymentCard>
              )
            })}
            {/* <PaymentCard
              setMethod={() => setState("app")}
              label={"Pay With APP"}
              state={state}
              paymentMethod={"app"}
            >
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
            </PaymentCard>
            <PaymentCard
              setMethod={() => setState("mbanking")}
              label={"Pay With Mobile Banking"}
              state={state}
              paymentMethod={"mbanking"}
            >
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
            </PaymentCard>
            <PaymentCard
              setMethod={() => setState("qr")}
              label={"Pay With QR Code"}
              state={state}
              paymentMethod={"qr"}
            >
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
            </PaymentCard> */}
          </div>
          <div className="flex flex-row justify-center mt-6">
            <Button onClick={() => prop.continueAction()} className="w-56">
              Continue
            </Button>
          </div>
        </div>
        <CartItemsList />
      </div>
    </div>
    // </div>
  )
}
