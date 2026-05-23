import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  FaTimes,
  FaMinus,
  FaPlus,
  FaTrash,
  FaWhatsapp,
  FaShoppingBag,
} from "react-icons/fa"

import { useEffect } from "react"

import { useCart } from "../context/CartContext"

function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}) {

  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart()

  // LOCK BODY
  useEffect(() => {

    if (isOpen) {

      document.body.style.overflow =
        "hidden"

    } else {

      document.body.style.overflow =
        "unset"
    }

    return () => {

      document.body.style.overflow =
        "unset"
    }

  }, [isOpen])

  // ESC CLOSE
  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === "Escape") {

        onClose()
      }
    }

    window.addEventListener(
      "keydown",
      handleEsc
    )

    return () => {

      window.removeEventListener(
        "keydown",
        handleEsc
      )
    }

  }, [onClose])

  // SAFETY
  const handleDecrease = (
    id,
    weight,
    quantity
  ) => {

    if (quantity <= 1) {

      removeFromCart(id, weight)

      return
    }

    updateQuantity(
      id,
      weight,
      "decrease"
    )
  }

  return (
    <AnimatePresence>

      {isOpen && (

        <>
          {/* BACKDROP */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-md"
          />

          {/* DRAWER */}
          <motion.div
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              duration: 0.3,
            }}
            className="fixed top-0 right-0 z-[1000] h-[100dvh] w-full sm:max-w-lg bg-[#fffdf8] shadow-[0_20px_100px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden"
          >

            {/* HEADER */}
            <div className="sticky top-0 z-20 bg-white border-b border-[#D4A437]/10 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">

              <div>

                <p className="uppercase tracking-[3px] text-[10px] sm:text-[11px] text-[#6E0E12] mb-1">
                  Your Cart
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold font-[Cinzel] text-[#1A1A1A]">
                  Order Summary
                </h2>
              </div>

              {/* CLOSE */}
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-[#f7f1e5] text-[#6E0E12] flex items-center justify-center active:scale-95 transition-all"
              >

                <FaTimes />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4">

              {cartItems.length === 0 ? (

                <div className="h-full flex flex-col items-center justify-center text-center px-4">

                  <div className="w-24 h-24 rounded-full bg-[#f7f1e5] flex items-center justify-center text-4xl mb-5">
                    🛒
                  </div>

                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                    Your Cart is Empty
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed max-w-[260px]">
                    Add delicious homemade products to continue your order.
                  </p>
                </div>

              ) : (

                <div className="space-y-4 pb-32">

                  {cartItems.map((item) => (

                    <motion.div
                      key={`${item.id}-${item.weight}`}
                      layout
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      className="bg-white border border-[#D4A437]/10 rounded-[26px] p-3 sm:p-4 shadow-sm overflow-hidden"
                    >

                      <div className="flex gap-3">

                        {/* IMAGE */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0"
                        />

                        {/* RIGHT */}
                        <div className="flex-1 min-w-0">

                          {/* TOP */}
                          <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0 flex-1">

                              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] leading-tight line-clamp-2">
                                {item.name}
                              </h3>

                              <div className="mt-3 flex flex-wrap gap-2">

                                <div className="px-3 py-1 rounded-full bg-[#f7f1e5] text-xs font-semibold">
                                  {item.weight}
                                </div>

                                <div className="px-3 py-1 rounded-full bg-[#0B5D3B]/10 text-[#0B5D3B] text-xs font-semibold">
                                  Qty {item.quantity}
                                </div>
                              </div>
                            </div>

                            {/* DELETE */}
                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.id,
                                  item.weight
                                )
                              }
                              className="w-9 h-9 rounded-xl bg-[#faf4e8] text-[#6E0E12] flex items-center justify-center flex-shrink-0 active:scale-95 transition-all"
                            >

                              <FaTrash className="text-sm" />
                            </button>
                          </div>

                          {/* BOTTOM */}
                          <div className="mt-4 flex items-end justify-between gap-3">

                            {/* QUANTITY */}
                            <div className="flex items-center gap-2">

                              <button
                                onClick={() =>
                                  handleDecrease(
                                    item.id,
                                    item.weight,
                                    item.quantity
                                  )
                                }
                                className="w-10 h-10 rounded-xl bg-[#faf4e8] flex items-center justify-center active:scale-95 transition-all"
                              >

                                <FaMinus className="text-xs" />
                              </button>

                              <div className="w-8 text-center text-lg font-bold">
                                {item.quantity}
                              </div>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.weight,
                                    "increase"
                                  )
                                }
                                className="w-10 h-10 rounded-xl bg-[#faf4e8] flex items-center justify-center active:scale-95 transition-all"
                              >

                                <FaPlus className="text-xs" />
                              </button>
                            </div>

                            {/* PRICE */}
                            <div className="text-right flex-shrink-0">

                              <p className="text-[11px] text-gray-500 mb-1">
                                Total
                              </p>

                              <h3 className="text-2xl sm:text-3xl font-black text-[#6E0E12] leading-none whitespace-nowrap">
                                ₹
                                {item.price *
                                  item.quantity}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER */}
            {cartItems.length > 0 && (

              <div className="sticky bottom-0 z-20 border-t border-[#D4A437]/10 bg-white/95 backdrop-blur-xl p-4 sm:p-5 flex-shrink-0">

                {/* TOTAL */}
                <div className="flex items-center justify-between mb-5">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Total Amount
                    </p>

                    <h3 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">
                      ₹{cartTotal}
                    </h3>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white flex items-center justify-center text-xl shadow-lg flex-shrink-0">

                    <FaWhatsapp />
                  </div>
                </div>

                {/* CHECKOUT */}
                <button
                  onClick={onCheckout}
                  className="relative overflow-hidden w-full h-14 rounded-[20px] bg-gradient-to-r from-[#0B5D3B] via-[#145c3f] to-[#6E0E12] text-white font-semibold text-base flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all"
                >

                  {/* SHINE */}
                  <div className="absolute inset-0 -translate-x-full hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000"></div>

                  <FaWhatsapp className="text-lg relative z-10" />

                  <span className="relative z-10">
                    Proceed To Checkout
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer