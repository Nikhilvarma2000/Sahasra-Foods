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
} from "react-icons/fa"

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

  return (
    <AnimatePresence>

      {isOpen && (

        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[999]"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.3,
            }}
            className="fixed top-0 right-0 z-[1000] h-screen w-full sm:max-w-lg bg-[#fffdf8] shadow-[0_20px_100px_rgba(0,0,0,0.3)] flex flex-col"
          >

            {/* HEADER */}
            <div className="relative flex items-center justify-between px-5 sm:px-6 py-5 border-b border-[#D4A437]/10 bg-white flex-shrink-0">

              <div>

                <p className="uppercase tracking-[3px] text-[11px] text-[#6E0E12] mb-1">
                  Your Cart
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold font-[Cinzel] text-[#1A1A1A]">
                  Order Summary
                </h2>
              </div>

              {/* CLOSE */}
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-[#f7f1e5] text-[#6E0E12] flex items-center justify-center"
              >
                <FaTimes />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">

              {cartItems.length === 0 ? (

                <div className="h-full flex flex-col items-center justify-center text-center px-6">

                  <div className="w-24 h-24 rounded-full bg-[#f7f1e5] flex items-center justify-center text-4xl mb-5">
                    🛒
                  </div>

                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">
                    Your Cart is Empty
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    Add delicious homemade products to continue your order.
                  </p>
                </div>

              ) : (

                <div className="space-y-4">

                  {cartItems.map((item) => (

                    <motion.div
                      key={`${item.id}-${item.weight}`}
                      layout
                      className="bg-white border border-[#D4A437]/10 rounded-[28px] p-4 shadow-sm"
                    >

                      <div className="flex gap-3">

                        {/* IMAGE */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-2xl object-cover flex-shrink-0"
                        />

                        {/* RIGHT */}
                        <div className="flex-1 min-w-0">

                          {/* TOP */}
                          <div className="flex items-start justify-between gap-3">

                            <div className="min-w-0">

                              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] leading-tight truncate">
                                {item.name}
                              </h3>

                              <div className="mt-2 flex flex-wrap gap-2">

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
                              className="w-9 h-9 rounded-xl bg-[#faf4e8] text-[#6E0E12] flex items-center justify-center flex-shrink-0"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>

                          {/* BOTTOM */}
                          <div className="mt-4 flex items-center justify-between gap-3">

                            {/* QUANTITY */}
                            <div className="flex items-center gap-2">

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.weight,
                                    "decrease"
                                  )
                                }
                                className="w-9 h-9 rounded-xl bg-[#faf4e8] flex items-center justify-center"
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
                                className="w-9 h-9 rounded-xl bg-[#faf4e8] flex items-center justify-center"
                              >
                                <FaPlus className="text-xs" />
                              </button>
                            </div>

                            {/* PRICE */}
                            <h3 className="text-2xl sm:text-3xl font-bold text-[#6E0E12] whitespace-nowrap">
                              ₹{item.price * item.quantity}
                            </h3>
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

              <div className="border-t border-[#D4A437]/10 bg-white p-4 sm:p-5 flex-shrink-0">

                {/* TOTAL */}
                <div className="flex items-center justify-between mb-5">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Total Amount
                    </p>

                    <h3 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
                      ₹{cartTotal}
                    </h3>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white flex items-center justify-center text-xl shadow-lg">

                    <FaWhatsapp />
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  onClick={onCheckout}
                  className="w-full h-14 rounded-[20px] bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] text-white font-semibold text-base flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.18)]"
                >

                  <FaWhatsapp className="text-lg" />

                  Proceed To Checkout
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