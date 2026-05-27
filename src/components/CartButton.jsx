import { motion, AnimatePresence } from "framer-motion"
import { FaShoppingBag, FaChevronRight } from "react-icons/fa"
import { useCart } from "../context/CartContext"

function CartButton({ onClick }) {
  const { cartItems, cartTotal } = useCart()

  // TOTAL ITEMS COUNT
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <AnimatePresence>
      {cartItems.length > 0 && (
        <motion.button
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileTap={{ scale: 0.99 }}
          onClick={onClick}
          className="fixed bottom-4 left-4 right-4 z-[998] max-w-md mx-auto w-[calc(100%-2rem)] group sm:bottom-6"
        >
          {/* Subtle Ambient Soft Glow */}
          <div className="absolute inset-0 bg-[#0B5D3B]/30 blur-xl rounded-xl transition-opacity group-hover:opacity-50 pointer-events-none" />

          {/* Main App-Style Action Bar Container */}
          <div className="relative h-12 px-4 rounded-xl bg-gradient-to-r from-[#0B5D3B] via-[#126844] to-[#0B5D3B] shadow-xl border border-white/5 flex items-center justify-between overflow-hidden">
            
            {/* Animated Reflection Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

            {/* LEFT AREA: METADATA SUMMARY */}
            <div className="flex items-center gap-3 relative z-10 text-left">
              {/* Ultra-Compact Count Badge */}
              <div className="h-6 min-w-[24px] px-1.5 rounded-md bg-white/10 border border-white/10 flex items-center justify-center text-white text-xs font-black">
                {totalItems}
              </div>
              
              <div className="flex flex-col justify-center">
                <span className="text-[9px] uppercase tracking-wider text-emerald-200 font-bold leading-none">
                  {totalItems === 1 ? "1 Item Added" : `${totalItems} Items Added`}
                </span>
                <span className="text-sm font-black text-white mt-0.5 leading-none">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            {/* RIGHT AREA: ACTION KEY TRIGGER */}
            <div className="flex items-center gap-1.5 relative z-10 font-bold text-xs uppercase tracking-wider text-white bg-black/10 h-full px-3 -mr-4 rounded-r-xl border-l border-white/5 transition-colors group-hover:bg-black/20">
              <span>View Cart</span>
              <FaChevronRight size={10} className="text-emerald-300 transition-transform group-hover:translate-x-0.5" />
            </div>

          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default CartButton