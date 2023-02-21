import { Dispatch, Fragment, SetStateAction, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { QRCodeSVG } from "qrcode.react"
import clsx from "clsx"
import { PaymentSteps } from "../aya/pin-modal/modal-content"
type PaymentModal = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
  children: React.ReactNode
  hideCloseButton: boolean
}
export default function PaymentModal(prop: PaymentModal) {
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={prop.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => null}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full justify-center sm:items-center p-0 text-center  items-end sm:p-4 sm:mx-10">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative  transform overflow-visible mb-3  text-left transition-all  w-full max-w-lg">
                <div
                  onClick={() => prop.setOpen(false)}
                  className={clsx(
                    "flex justify-center items-center mb-1 w-full sm:w-12 h-12 rounded-lg sm:rounded-full sm:absolute sm:-top-12 bg-white sm:-right-12 z-20",
                    { hidden: prop.hideCloseButton }
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="#878684"
                    className="w-10 h-10 hover:stroke-black hover:cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <div className="flex flex-col rounded-md  shadow-xl justify-center items-center bg-white">
                  {prop.children}
                  {prop.loading && <Loading />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
function Loading() {
  return (
    <div className="relative w-full  h-1  rounded">
      <div className="w-1/2 absolute top-0 h-1 rounded animate-waving-hand bg-gray-700"></div>
    </div>
  )
}
