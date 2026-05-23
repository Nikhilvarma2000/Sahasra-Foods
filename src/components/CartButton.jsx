import { motion, AnimatePresence } from "framer-motion"

import { FaShoppingBag } from "react-icons/fa"

import { useCart } from "../context/CartContext"

function CartButton({ onClick }) {

  const {
    cartItems,
    cartTotal,
  } = useCart()

  // TOTAL ITEMS
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <AnimatePresence>

      {cartItems.length > 0 && (

        <motion.button
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.96 }}
          onClick={onClick}
          className="group fixed bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 z-[998]"
        >

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B5D3B] to-[#6E0E12] blur-2xl opacity-40 rounded-[30px]"></div>

          {/* Main Button */}
          <div className="relative overflow-hidden flex items-center gap-5 px-6 py-5 rounded-[30px] bg-gradient-to-r from-[#0B5D3B] via-[#145c3f] to-[#6E0E12] shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/10 backdrop-blur-xl">

            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000"></div>

            {/* Icon */}
            <div className="relative">

              <div className="w-16 h-16 rounded-[22px] bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white text-2xl shadow-xl">

                <FaShoppingBag />
              </div>

              {/* Count Badge */}
              <div className="absolute -top-2 -right-2 min-w-[28px] h-7 px-2 rounded-full bg-[#D4A437] text-black text-xs font-bold flex items-center justify-center shadow-lg">

                {totalItems}
              </div>
            </div>

            {/* Text */}
            <div className="text-left">

              <p className="text-white/70 text-sm tracking-wide">
                Cart Total
              </p>

              <h3 className="text-3xl font-bold text-white leading-none mt-1">
                ₹{cartTotal}
              </h3>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default CartButton