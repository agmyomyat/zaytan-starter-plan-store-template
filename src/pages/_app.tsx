import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { PaymentProvider } from "@lib/context/payment-context"
import { StoreProvider } from "@lib/context/store-context"
import { HomePageDemoWarning } from "@modules/demo/modal/warning/home-page"
import { CartProvider, MedusaProvider } from "medusa-react"
import { Hydrate } from "react-query"
import "styles/globals.css"
import { AppPropsWithLayout } from "types/global"

function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ dehydratedState?: unknown }>) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      {/* <Hydrate state={pageProps.dehydratedState}> */}
      <CartDropdownProvider>
        <MobileMenuProvider>
          <CartProvider>
            <StoreProvider>
              <AccountProvider>
                <PaymentProvider>
                  {getLayout(<Component {...pageProps} />)}
                  <HomePageDemoWarning />
                </PaymentProvider>
              </AccountProvider>
            </StoreProvider>
          </CartProvider>
        </MobileMenuProvider>
      </CartDropdownProvider>
      {/* </Hydrate> */}
    </MedusaProvider>
  )
}

export default App
