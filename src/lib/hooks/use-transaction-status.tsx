import { usePayment } from "@lib/context/payment-context"
import { useCart } from "medusa-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
type TransactionStatusType = "PENDING" | "SUCCESS"
export function useTransactionStatus(shouldTransactionCheck: boolean) {
  const { push } = useRouter()
  const { paymentInfo } = usePayment()
  const [transactionStatus, setTransactionStatus] =
    useState<TransactionStatusType>("PENDING")

  useEffect(() => {
    if (!paymentInfo?.merchantOrderId || !shouldTransactionCheck) return
    console.log("mount")
    const interval = setInterval(() => {
      fetchTransactionStatus(paymentInfo.merchantOrderId!).then((data) =>
        setTransactionStatus(
          data.result.data.transactionStatus as TransactionStatusType
        )
      )
    }, 3000)
    return () => {
      console.log("destroy")
      clearInterval(interval)
    }
  }, [paymentInfo?.merchantOrderId, push, shouldTransactionCheck])
  return transactionStatus
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
      `${process.env.NEXT_PUBLIC_PIWARE_API_URL}/api/trpc/payment.status?input={"id":"${id}"}`
    )
    if (res.status !== 200) throw new Error("Error While Fetching Order Status")
    return (await res.json()) as TransactionStatusResponse
  } catch (e) {
    throw e
  }
}
