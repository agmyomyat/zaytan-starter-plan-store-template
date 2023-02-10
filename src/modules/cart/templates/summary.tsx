import { useStore } from "@lib/context/store-context"
import { Cart } from "@medusajs/medusa"
import Button from "@modules/common/components/button"
import CartTotals from "@modules/common/components/cart-totals"
import Link from "next/link"

type SummaryProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const Summary = ({ cart }: SummaryProps) => {
  const { adjustLineItemLoading, removeLineItemLoading } = useStore()
  return (
    <div className="grid grid-cols-1 gap-y-6">
      <CartTotals cart={cart} />
      <Link href="/checkout">
        <a>
          <Button
            disabled={adjustLineItemLoading || removeLineItemLoading}
            isLoading={adjustLineItemLoading || removeLineItemLoading}
          >
            Go to checkout
          </Button>
        </a>
      </Link>
    </div>
  )
}

export default Summary
