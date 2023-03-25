import Modal from "@modules/common/components/modal"
import Alert from "@modules/common/icons/alert"
import { Dispatch, SetStateAction } from "react"

export function PaymentWarning(prop: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  continueAction: () => void
}) {
  const { continueAction, open, setOpen } = prop
  return (
    <Modal isOpen={open} close={() => setOpen(false)} size="medium">
      <Modal.Title>
        <div className="flex justify-center gap-x-2">
          <Alert size={60} className="text-gray-500" />
        </div>
      </Modal.Title>
      <Modal.Body>
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-500">
            By using this website, you acknowledge that you understand and
            accept that this website is for demonstration purposes only and
            agree to not make any actual transactions.
          </p>
        </div>
        <Modal.Footer>
          <button
            type="button"
            className="text-gray-200 bg-black hover:bg-blue-600 focus:outline-none  font-medium rounded-lg text-sm px-8 py-2.5 text-center"
            onClick={() => {
              setOpen(false)
              continueAction()
            }}
          >
            I Understand
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}
