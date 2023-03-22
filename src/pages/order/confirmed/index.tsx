import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { ReactElement, useCallback, useMemo } from "react"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { NextPageWithLayout } from "types/global"

const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}
const fetchOrderByCartId = async (id: string) => {
  return await medusaClient.orders
    .retrieveByCartId(id)
    .then(({ order }) => order)
}

const Confirmed: NextPageWithLayout = () => {
  const router = useRouter()
  const id = typeof router.query?.id === "string" ? router.query.id : ""
  const cartId =
    typeof router.query?.cart_id === "string" ? router.query.cart_id : ""
  const fetchOrder_ = useMemo(() => {
    if (id) {
      return fetchOrder
    }
    if (cartId) {
      return fetchOrderByCartId
    }
    return () => {
      throw new Error("Order or Cart Id must be  in query string")
    }
  }, [cartId, id])

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_order_confirmed", id],
    () => fetchOrder_(id),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  if (isLoading) {
    return <SkeletonOrderConfirmed />
  }

  if (isError) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  if (isSuccess) {
    return (
      <>
        <Head
          title="Order Confirmed"
          description="You purchase was successful"
        />

        <OrderCompletedTemplate order={data} />
      </>
    )
  }

  return <></>
}

Confirmed.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Confirmed
