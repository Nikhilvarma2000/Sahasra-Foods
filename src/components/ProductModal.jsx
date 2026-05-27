import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaTimes,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaCheck,
  FaStar,
  FaFireAlt,
  FaLeaf,
  FaTruck,
  FaAward,
} from "react-icons/fa"
import { useCart } from "../context/CartContext"

/* ─────────────────────────────────────────────
   SPICE CODES META
───────────────────────────────────────────── */
const SPICE_MAP = {
  Mild:   { color: "#16a34a" },
  Medium: { color: "#d97706" },
  Spicy:  { color: "#dc2626" },
  Hot:    { color: "#7f1d1d" },
}

/* ─────────────────────────────────────────────
   STAR ROW COMPONENT
───────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          size={10}
          style={{ color: s <= Math.round(rating) ? "#D4A437" : "#D4A43735" }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   HIGH DENSITY MICRO FEATURE PILL
───────────────────────────────────────────── */
function FeaturePill({ icon: Icon, label, sub, color }) {
  return (
    <div 
      className="flex items-center gap-2 p-2 rounded-xl border flex-1 min-w-[100px] sm:p-3"
      style={{ backgroundColor: `${color}0A`, borderColor: `${color}15` }}
    >
      <div 
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon size={12} style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black text-gray-800 leading-none truncate sm:text-xs">{label}</p>
        <p className="text-[9px] text-gray-400 mt-0.5 truncate leading-none">{sub}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PREMIUM RESPONSIVE PRODUCT OVERLAY MODAL
───────────────────────────────────────────── */
export default function ProductModal({ isOpen, onClose, product }) {
  const { addToCart } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState(null)

  /* Reset layout variables on fresh identity mount */
  useEffect(() => {
    if (product) {
      setQuantity(1)
      setAdded(false)
      setSelectedWeight({ label: "250g", price: product.basePrice })
    }
  }, [product])

  /* Body viewport scrolling guard */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  /* Escape core system listener */
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!product || !selectedWeight) return null

  const weights = [
    { label: "250g", price: product.basePrice },
    { label: "500g", price: product.basePrice * 2, tag: "Popular" },
    { label: "1kg",  price: product.basePrice * 4, tag: "Best Value" },
  ]

  const totalPrice = selectedWeight.price * quantity
  const spiceColor = (SPICE_MAP[product.spice] || SPICE_MAP.Medium).color

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product, selectedWeight, quantity)
    }
    setAdded(true)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── BACKDROP BLUR OVERLAY ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-xs"
          />

          {/* ── MODAL ALIGNMENT HUB ── */}
          <div className="fixed inset-0 z-[1000] flex items-end justify-center pointer-events-none sm:items-center sm:p-4">
            
            <motion.div
              initial={{ y: "100%", opacity: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0.8 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="w-full max-h-[92dvh] bg-[#FFFDF6] flex flex-col overflow-hidden pointer-events-auto rounded-t-2xl shadow-2xl border-t border-[#D4A437]/10 sm:max-w-xl sm:rounded-2xl sm:border border-transparent"
            >
              
              {/* ── IMAGE SECTION ── */}
              <div className="relative w-full h-52 flex-shrink-0 overflow-hidden sm:h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover block"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,164,55,0.15),transparent_60%)] pointer-events-none" />

                {/* Top Left Status Tags */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold tracking-wide uppercase">
                    <FaFireAlt style={{ color: spiceColor }} />
                    {product.spice}
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] font-bold tracking-wide">
                    <FaStar className="text-[#D4A437]" />
                    {product.rating} ({product.reviews}+)
                  </div>
                </div>

                {/* Top Right Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-white flex items-center justify-center transition-colors active:bg-[#6E0E12] sm:w-9 sm:h-9"
                >
                  <FaTimes size={12} />
                </button>

                {/* Text Labels */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-8 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <p className="text-[9px] tracking-widest font-black text-[#D4A437] uppercase leading-none mb-1">
                    {product.category}
                  </p>
                  <h2 className="text-lg font-black text-white font-serif leading-tight sm:text-2xl">
                    {product.name}
                  </h2>
                </div>
              </div>

              {/* ── CENTRAL DETAIL PANEL ── */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                
                <div>
                  <h4 className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase mb-1">About Product</h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {product.description || "Authentic home-style preparation compiled using premium natural raw spices and traditional curing workflows."}
                  </p>
                </div>

                {/* WEIGHT OPTION CHOOSER */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="font-serif text-gray-800 text-xs">Choose Net Weight</span>
                    <span className="text-gray-400 font-medium">Base Pack: 250g</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {weights.map((w) => {
                      const active = selectedWeight.label === w.label
                      return (
                        <button
                          key={w.label}
                          disabled={added}
                          onClick={() => setSelectedWeight(w)}
                          className={`relative h-14 rounded-xl border flex flex-col items-center justify-center transition-all select-none ${
                            active
                              ? "bg-[#0B5D3B] border-transparent text-white shadow-md shadow-[#0B5D3B]/20"
                              : "bg-white border-gray-100 text-gray-800 active:bg-gray-50"
                          } ${added ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          {w.tag && (
                            <span className={`absolute top-0.5 right-0.5 text-[7px] font-black px-1 rounded-sm leading-none py-0.5 uppercase transform tracking-wide ${
                              active ? "bg-white/20 text-white" : "bg-[#D4A437] text-white"
                            }`}>
                              {w.tag}
                            </span>
                          )}
                          <span className="text-sm font-black font-serif leading-none">{w.label}</span>
                          <span className={`text-[10px] font-bold mt-1 ${active ? "text-emerald-100" : "text-gray-400"}`}>
                            ₹{w.price}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* QUANTITY CONTROLLER */}
                <div className="bg-white rounded-xl border border-gray-100 p-3 flex items-center justify-between gap-4 shadow-3xs">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Pack Quantity</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <button
                        disabled={added}
                        onClick={() => quantity > 1 && setQuantity(q => q - 1)}
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                          quantity <= 1 || added ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed" : "bg-gray-50 border-gray-200 text-gray-700 active:bg-gray-100"
                        }`}
                      >
                        <FaMinus size={8} />
                      </button>
                      <span className="w-8 text-center text-base font-black text-gray-900 font-serif">{quantity}</span>
                      <button
                        disabled={added}
                        onClick={() => setQuantity(q => q + 1)}
                        className={`w-7 h-7 rounded-lg text-white flex items-center justify-center transition-all ${
                          added ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#0B5D3B] active:opacity-90"
                        }`}
                      >
                        <FaPlus size={8} />
                      </button>
                    </div>
                  </div>

                  {/* Pricing feedback node */}
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Subtotal Price</span>
                    <p className="text-xl font-black text-[#6E0E12] font-serif mt-0.5">₹{totalPrice}</p>
                    <span className="text-[9px] text-gray-400 font-semibold">{selectedWeight.label} × {quantity}</span>
                  </div>
                </div>

                {/* FEATURE PILLS */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <FeaturePill icon={FaTruck} label="Fast Shipped" sub="2-4 Day Delivery" color="#0B5D3B" />
                  <FeaturePill icon={FaLeaf} label="100% Fresh" sub="Crafted Daily" color="#92650A" />
                  <FeaturePill icon={FaAward} label="Traditional" sub="Andhra Recipe" color="#6E0E12" />
                </div>
              </div>

              {/* ── FOOTER ACTIONS (DYNAMICAL SPLIT WHEN ADDED) ── */}
              <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.div
                      key="split-actions"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 w-full"
                    >
                      {/* BUTTON 1: CONTINUE SHOPPING */}
                      <button
                        onClick={onClose}
                        className="flex-1 h-12 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center active:bg-gray-50 transition-all"
                      >
                        Keep Browsing
                      </button>

                      {/* BUTTON 2: VIEW BASKET DRAWERS */}
                      <button
                        onClick={() => {
                          onClose()
                          // Dispatch the listener target to wake the basket drawer
                          window.dispatchEvent(new CustomEvent("toggleCartDrawer"))
                        }}
                        className="flex-1 h-12 rounded-xl bg-[#0B5D3B] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#0B5D3B]/20 active:bg-[#08482d] transition-all"
                      >
                        <FaShoppingBag size={11} className="text-emerald-300" />
                        <span>View Cart</span>
                      </button>
                    </motion.div>
                  ) : (
                    /* ORIGINAL STANDARD CART ADD DISPATCHER */
                    <motion.button
                      key="standard-add"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleAddToCart}
                      className="group relative w-full h-12 rounded-xl bg-gradient-to-r from-[#0B5D3B] via-[#126643] to-[#6E0E12] text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 overflow-hidden transition-all shadow-md active:scale-[0.99]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                      <FaShoppingBag size={11} />
                      <span>Add To Basket · ₹{totalPrice}</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}