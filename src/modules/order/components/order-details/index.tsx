import type { FulfillmentStatus, Order } from "@medusajs/medusa"
import clsx from "clsx"

type OrderDetailsProps = {
  order: Order
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const items = order.items.reduce((acc, i) => acc + i.quantity, 0)
  const formatStatus = (str: FulfillmentStatus) => {
    const formatted =
      str === "not_fulfilled"
        ? "In progress..."
        : str === "fulfilled"
        ? "Packaging..."
        : "Shipped"

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }
  const fulfillmentStatus = formatStatus(order.fulfillment_status)

  return (
    <div className="p-10 border-b border.gray-200">
      <span className="text-gray-700 text-small-regular uppercase">
        Thank you, your order was successfully placed
      </span>
      <h1 className="mt-2 uppercase text-2xl-semi">#{order.display_id}</h1>
      <span>{order.id.split("order_")[1]}</span>
      <div className="flex items-center text-gray-700 text-small-regular gap-x-4 mt-4">
        <span>{new Date(order.created_at).toDateString()}</span>
        <span>{`${items} ${items !== 1 ? "items" : "item"}`}</span>
        {showStatus && (
          <>
            <span
              className={clsx({
                "bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded":
                  order.fulfillment_status === "not_fulfilled",
                "bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded":
                  order.fulfillment_status === "fulfilled",
                "bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded":
                  order.fulfillment_status === "shipped",
              })}
            >
              {fulfillmentStatus}
            </span>
            {/* <span>{formatStatus(order.payment_status)}</span> */}
          </>
        )}
      </div>
    </div>
  )
}
export default OrderDetails
