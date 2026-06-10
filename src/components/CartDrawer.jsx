import { motion, AnimatePresence } from "framer-motion"
import {
  FaTimes,
  FaMinus,
  FaPlus,
  FaTrash,
  FaWhatsapp,
  FaShoppingBag,
  FaTruck
} from "react-icons/fa"
import { useEffect } from "react"
import { useCart } from "../context/CartContext"

// Free shipping tier ceiling updated to 1000rs
const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_FEE = 40;

function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // CLOSE DRAWER ON ESCAPE KEYPRESS
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onClose])

  // SAFE CLOSING BUFFER HANDLER TO PREVENT MOBILE TOUCH-THROUGH
  const handleSafeClose = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation() // Absorbs the touch event layer entirely
    }
    onClose()
  }

  const handleDecrease = (e, id, weight, quantity) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (quantity <= 1) {
      removeFromCart(id, weight)
      return
    }
    updateQuantity(id, weight, "decrease")
  }

  const handleIncrease = (e, id, weight) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    updateQuantity(id, weight, "increase")
  }

  const handleRemove = (e, id, weight) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    removeFromCart(id, weight)
  }

  // Calculate parameters for delivery rewards layer
  const totalQuantity = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0
  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD
  const deliveryCost = cartItems.length === 0 || isFreeShipping ? 0 : SHIPPING_FEE
  const finalGrandTotal = cartTotal + deliveryCost
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP ACCENT FILTER */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleSafeClose}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs pointer-events-auto"
          />

          {/* MAIN SURFACE DRAWER SHEET */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-[10000] h-[100dvh] w-full sm:max-w-md bg-[#FFFDF9] shadow-2xl border-l border-[#D4A437]/10 flex flex-col overflow-hidden select-none touch-manipulation pointer-events-auto"
          >
            {/* HEADER BLOCK */}
            <div className="bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="uppercase tracking-widest text-[9px] font-black text-[#0B5D3B]">
                  Review Basket ({totalQuantity} {totalQuantity === 1 ? "Item" : "Items"})
                </p>
                <h2 className="text-xl font-bold text-gray-900 font-serif" style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}>
                  Your Basket
                </h2>
              </div>

              {/* ACTION CLOSE CONTROLLER */}
              <button
                onClick={handleSafeClose}
                className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center cursor-pointer touch-manipulation active:scale-90 transition-transform"
              >
                <FaTimes size={13} />
              </button>
            </div>

            {/* FREE DELIVERY TRACKER */}
            {cartItems.length > 0 && (
              <div className="border-b border-gray-100/80 flex-shrink-0">
                <AnimatePresence mode="wait" initial={false}>
                  {isFreeShipping ? (
                    /* ── UNLOCKED STATE ── */
                    <motion.div
                      key="unlocked"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="px-5 py-4"
                    >
                      <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50/60 border border-emerald-100 rounded-2xl px-4 py-3.5">
                        <motion.div
                          initial={{ scale: 0.6, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
                          className="w-10 h-10 rounded-full bg-[#0B5D3B] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0B5D3B]/25"
                        >
                          <FaTruck size={15} className="text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-black text-[#0B5D3B] leading-tight">
                            🎉 Free Delivery Unlocked!
                          </p>
                          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                            You saved ₹{SHIPPING_FEE} on delivery
                          </p>
                        </div>
                        <span className="text-2xl select-none">🎁</span>
                      </div>
                    </motion.div>
                  ) : (
                    /* ── PROGRESS STATE ── */
                    <motion.div
                      key="progress"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 py-4 space-y-2.5"
                    >
                      {/* TOP ROW */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <FaTruck size={11} className="text-[#D4A437] flex-shrink-0" />
                          <span className="text-[11px] font-bold text-gray-700 leading-tight">
                            Add{" "}
                            <span className="text-[#6E0E12] font-black">
                              ₹{FREE_SHIPPING_THRESHOLD - cartTotal}
                            </span>{" "}
                            more for free delivery
                          </span>
                        </div>
                        <span className="text-[10px] font-black text-gray-400 font-mono tabular-nums flex-shrink-0">
                          {Math.round(shippingProgress)}%
                        </span>
                      </div>

                      {/* PROGRESS TRACK */}
                      <div className="relative pr-5">
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${shippingProgress}%` }}
                            transition={{ duration: 0.75, ease: [0.34, 1.2, 0.64, 1] }}
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg, #D4A437 0%, #e8b84b 50%, #0B5D3B 100%)",
                            }}
                          />
                        </div>
                        {/* Goal gift marker */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs shadow-sm select-none">
                          🎁
                        </div>
                      </div>

                      {/* BOTTOM LABELS */}
                      <div className="flex items-center justify-between text-[10px] font-semibold">
                        <span className="text-[#0B5D3B] font-bold">₹{cartTotal} added</span>
                        <span className="text-gray-400">Goal: ₹{FREE_SHIPPING_THRESHOLD}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* CENTRAL SCROLLABLE ITEMS CORE CONTAINER */}
            <div className="flex-1 overflow-y-auto px-5 divide-y divide-gray-100/80 no-scrollbar bg-[#FFFDF9]">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 text-gray-300">
                      <FaShoppingBag size={22} />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 font-serif">
                      Your basket feels quite light
                    </h3>
                    <p className="text-xs text-gray-400 mt-1.5 max-w-[240px] leading-relaxed">
                      Explore our handcrafted traditional Andhra spice recipes to fill your kitchen table.
                    </p>
                  </motion.div>
                ) : (
                  <div className="py-2">
                    {cartItems.map((item) => (
                      <motion.div
                        key={`${item.id}-${item.weight}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.22 }}
                        className="flex items-center gap-3.5 py-4 bg-transparent border-b border-gray-100/40 last:border-b-0"
                      >
                        {/* STREAM IMAGE COMPONENT FRAME */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200/60 flex-shrink-0 bg-gray-50"
                        />

                        {/* DATA SPECIFICATIONS CONTENT METADATA BLOCK */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-bold text-gray-900 leading-snug truncate md:text-sm">
                            {item.name}
                          </h3>
                          
                          <div className="mt-1 flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-[#0B5D3B]/5 text-[#0B5D3B] font-bold text-[9px] tracking-wide border border-[#0B5D3B]/10">
                              {item.weight}
                            </span>
                            <span className="text-[10px] font-semibold text-gray-400">
                              ₹{item.price} each
                            </span>
                          </div>

                          <p className="text-xs font-black text-[#6E0E12] mt-2 font-serif">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>

                        {/* INTERACTIVE ROW STEP CONTROL HOOK BUTTONS */}
                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                          <button
                            onClick={(e) => handleRemove(e, item.id, item.weight)}
                            className="p-1 text-gray-300 hover:text-red-700 transition-colors cursor-pointer active:scale-90"
                          >
                            <FaTrash size={11} />
                          </button>

                          {/* COUNTER TOGGLE INTERFACE */}
                          <div className="flex items-center bg-[#0B5D3B] text-white rounded-lg h-7 px-1 shadow-xs">
                            <button
                              onClick={(e) => handleDecrease(e, item.id, item.weight, item.quantity)}
                              className="p-1.5 text-white/80 hover:text-white transition-opacity cursor-pointer touch-manipulation"
                            >
                              <FaMinus size={8} strokeWidth={2} />
                            </button>
                            <span className="w-5 text-center text-xs font-bold font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => handleIncrease(e, item.id, item.weight)}
                              className="p-1.5 text-white/80 hover:text-white transition-opacity cursor-pointer touch-manipulation"
                            >
                              <FaPlus size={8} strokeWidth={2} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* CHECKOUT ACCOUNTING CONTROL STEPS FOOTER CONTAINER */}
            {cartItems.length > 0 && (
              <div className="bg-white border-t border-gray-100 p-4 sticky bottom-0 z-20 flex-shrink-0 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] bg-[#FFFDF9]">
                
                {/* RESTAURANT STYLE BILL SUMMARY CARD LAYOUT FRAME */}
                <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100 text-xs font-semibold space-y-2.5">
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Basket Subtotal</span>
                    <span className="font-mono text-gray-900">₹{cartTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span>Delivery & Handling</span>
                    {isFreeShipping ? (
                      <span className="text-[#0B5D3B] uppercase text-[10px] font-black">Free</span>
                    ) : (
                      <span className="font-mono text-gray-900">₹{SHIPPING_FEE}</span>
                    )}
                  </div>
                  <div className="h-px bg-gray-200/60 my-1" />
                  <div className="flex items-center justify-between text-sm font-bold text-gray-900">
                    <span>Grand Total</span>
                    <span className="font-mono text-base font-black text-[#6E0E12]">₹{finalGrandTotal}</span>
                  </div>
                </div>

                {/* WHATSAPP CTA DISPATCH CONTROL BUTTON */}
                <button
                  onClick={(e) => {
                    if (e) {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                    if (onCheckout) onCheckout()
                  }}
                  className="group relative w-full h-13 rounded-xl bg-gradient-to-r from-[#0B5D3B] via-[#145c3f] to-[#0B5D3B] text-white flex items-center justify-between px-4 shadow-xl shadow-[#0B5D3B]/15 active:scale-[0.99] transition-all overflow-hidden cursor-pointer touch-manipulation"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_infinite] pointer-events-none" />

                  <div className="flex flex-col items-start relative z-10">
                    <span className="text-[8px] uppercase tracking-widest text-emerald-200 font-black leading-none">
                      Proceed To Checkout
                    </span>
                    <span className="text-base font-black text-white mt-0.5 font-mono">
                      ₹{finalGrandTotal}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 relative z-10 bg-black/15 h-full px-4 -mr-4 rounded-r-xl border-l border-white/5 font-bold text-xs uppercase tracking-wider">
                    <FaWhatsapp size={14} className="text-emerald-400 animate-pulse" />
                    <span>Order via WhatsApp</span>
                  </div>
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