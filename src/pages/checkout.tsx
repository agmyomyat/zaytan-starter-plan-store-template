import CheckoutTemplate from "@modules/checkout/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Checkout: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Checkout" />
      <CheckoutTemplate />
    </>
  )
}
Checkout.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Checkout
