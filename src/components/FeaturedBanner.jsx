import { useEffect, useState } from "react"

import Navbar from "./components/Navbar"
import Loader from "./components/Loader"
import ScrollProgress from "./components/ScrollProgress"

import CartButton from "./components/CartButton"
import CartDrawer from "./components/CartDrawer"
import OrderModal from "./components/OrderModal"

import Hero from "./sections/Hero"
import Products from "./sections/Products"
import About from "./sections/About"
import WhyChooseUs from "./sections/WhyChooseUs"

function App() {

  // LOADER
  const [loading, setLoading] =
    useState(true)

  // CART DRAWER
  const [isCartOpen, setIsCartOpen] =
    useState(false)

  // CHECKOUT MODAL
  const [
    isCheckoutOpen,
    setIsCheckoutOpen,
  ] = useState(false)

  // BODY SCROLL LOCK
  useEffect(() => {

    if (
      isCartOpen ||
      isCheckoutOpen
    ) {

      document.body.style.overflow =
        "hidden"

    } else {

      document.body.style.overflow =
        "auto"
    }

    return () => {
      document.body.style.overflow =
        "auto"
    }

  }, [
    isCartOpen,
    isCheckoutOpen,
  ])

  // LOADER TIMER
  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)

    return () => clearTimeout(timer)

  }, [])

  return (
    <>
      {/* LOADER */}
      {loading && <Loader />}

      {/* WEBSITE */}
      {!loading && (
        <>
          {/* SCROLL BAR */}
          <ScrollProgress />

          {/* FLOATING CART */}
          {!isCartOpen &&
            !isCheckoutOpen && (

              <CartButton
                onClick={() =>
                  setIsCartOpen(true)
                }
              />
            )}

          {/* CART DRAWER */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() =>
              setIsCartOpen(false)
            }
            onCheckout={() => {

              setIsCartOpen(false)

              setTimeout(() => {
                setIsCheckoutOpen(true)
              }, 250)
            }}
          />

          {/* CHECKOUT */}
          <OrderModal
            isOpen={isCheckoutOpen}
            onClose={() =>
              setIsCheckoutOpen(false)
            }
          />

          {/* WEBSITE */}
          <main className="relative min-h-screen overflow-hidden bg-[#FFF9EE] text-[#1A1A1A]">

            {/* GLOBAL BACKGROUND */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">

              {/* GOLD */}
              <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#D4A437]/10 blur-3xl rounded-full"></div>

              {/* GREEN */}
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0B5D3B]/10 blur-3xl rounded-full"></div>

              {/* RED */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#6E0E12]/5 blur-3xl rounded-full"></div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10">

              {/* NAVBAR */}
              <Navbar />

              {/* HERO */}
              <Hero />

              {/* PRODUCTS */}
              <Products />

              {/* ABOUT */}
              <About />

              {/* WHY CHOOSE US */}
              <WhyChooseUs />

              {/* FOOTER */}
              <footer className="relative overflow-hidden border-t border-[#D4A437]/10 bg-[#fffaf1] mt-10">

                {/* GLOW */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4A437]/10 blur-3xl rounded-full"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">

                  {/* TOP */}
                  <div className="grid lg:grid-cols-3 gap-12 mb-14">

                    {/* BRAND */}
                    <div>

                      <div className="flex items-center gap-4 mb-6">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] flex items-center justify-center text-white font-bold text-xl shadow-lg">

                          S
                        </div>

                        <div>

                          <h2 className="text-3xl font-bold font-[Cinzel] text-[#1A1A1A]">
                            Sahasra Foods
                          </h2>

                          <p className="text-sm text-gray-500 mt-1">
                            Authentic Homemade Flavours
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 leading-relaxed max-w-md">
                        Premium homemade Andhra pickles, powders and traditional snacks crafted fresh using authentic family recipes and high quality ingredients.
                      </p>
                    </div>

                    {/* LINKS */}
                    <div>

                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">
                        Quick Links
                      </h3>

                      <div className="space-y-4">

                        <a
                          href="#home"
                          className="block text-gray-600 hover:text-[#0B5D3B] transition-all duration-300"
                        >
                          Home
                        </a>

                        <a
                          href="#products"
                          className="block text-gray-600 hover:text-[#0B5D3B] transition-all duration-300"
                        >
                          Products
                        </a>

                        <a
                          href="#about"
                          className="block text-gray-600 hover:text-[#0B5D3B] transition-all duration-300"
                        >
                          About
                        </a>

                        <a
                          href="#contact"
                          className="block text-gray-600 hover:text-[#0B5D3B] transition-all duration-300"
                        >
                          Contact
                        </a>
                      </div>
                    </div>

                    {/* CTA */}
                    <div>

                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-6">
                        Fresh Homemade Orders
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-6">
                        Order premium homemade foods directly through WhatsApp with fast delivery and authentic flavours.
                      </p>

                      <button
                        onClick={() =>
                          setIsCartOpen(true)
                        }
                        className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white font-semibold shadow-[0_15px_40px_rgba(0,0,0,0.18)] hover:scale-105 transition-all duration-300"
                      >
                        Start Ordering
                      </button>
                    </div>
                  </div>

                  {/* BOTTOM */}
                  <div className="pt-8 border-t border-[#D4A437]/10 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-gray-500 text-center sm:text-left">
                      © 2026 Sahasra Foods. All rights reserved.
                    </p>

                    <p className="text-sm text-gray-500">
                      Crafted with ❤️ for authentic Andhra flavours
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default App