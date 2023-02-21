import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React, { useEffect } from "react"
import { Toaster } from "react-hot-toast"

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Nav />
      <Toaster
        containerStyle={{
          top: 74,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
