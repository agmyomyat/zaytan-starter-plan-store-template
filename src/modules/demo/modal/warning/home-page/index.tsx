import Modal from "@modules/common/components/modal"
import Alert from "@modules/common/icons/alert"
import { useEffect, useState } from "react"
const isDemo = process.env.NEXT_PUBLIC_IS_DEMO
const Real_Store_Link = process.env.NEXT_PUBLIC_DEMO_REAL_STORE_LINK
export function HomePageDemoWarning() {
  useEffect(() => {
    if (isDemo) {
      console.log("isDemo", isDemo)
      setOpen(true)
    }
  }, [])
  const [open, setOpen] = useState(isDemo ? true : false)
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
            Please note that this is a demo website for illustration purposes
            only and is not associated with the official website. please visit
            their website{" "}
            <a
              className="font-medium text-blue-600  hover:underline"
              href={Real_Store_Link}
              target="_blank"
              rel="noreferrer"
            >
              {Real_Store_Link}
            </a>{" "}
            if you are looking to do business with them.Thank you for your
            understanding.
          </p>
        </div>
        <Modal.Footer>
          <button
            type="button"
            className="text-gray-200 bg-black hover:bg-blue-600 focus:outline-none  font-medium rounded-lg text-sm px-8 py-2.5 text-center"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}
