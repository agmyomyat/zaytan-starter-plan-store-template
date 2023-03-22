import { useRouter } from "next/router"
import { useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"

export function useTransactionStatus(id: string) {
  const { push } = useRouter()
  const client = useQueryClient()

  useEffect(() => {
    const interval = setInterval(() => {
      client
        .fetchQuery(["order_status", id], ({ queryKey }) =>
          fetchTransactionStatus(queryKey[1])
        )
        .then(
          (data) =>
            data.result.data.transactionStatus === "SUCCESS" &&
            push(`/order/confirmed/?id=${id}`)
        )
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [client, id, push])
}
interface TransactionStatusResponse {
  result: {
    data: {
      status: number
      transactionStatus: string
    }
  }
}
async function fetchTransactionStatus(id: string) {
  try {
    const res = await fetch(
      `${process.env.PIWARE_API_URL}/api/trpc/payment.status?input={"id":"${id}"}`
    )
    if (res.status !== 200) throw new Error("Error While Fetching Order Status")
    return (await res.json()) as TransactionStatusResponse
  } catch (e) {
    throw e
  }
}
