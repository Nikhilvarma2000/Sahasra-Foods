import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaPlus,
  FaMinus,
  FaStar,
  FaFireAlt,
  FaHeart,
  FaShoppingBag,
  FaBolt,
  FaLeaf,
} from "react-icons/fa"

// 1. IMPORT YOUR CART CONTEXT HOOK
import { useCart } from "../context/CartContext"

/* ─────────────────────────────────────────────
   SPICE CONFIG
───────────────────────────────────────────── */
const SPICE_MAP = {
  Mild:   { color: "#16a34a", bg: "rgba(22,163,74,0.14)" },
  Medium: { color: "#d97706", bg: "rgba(217,119,6,0.14)" },
  Spicy:  { color: "#dc2626", bg: "rgba(220,38,38,0.14)" },
  Hot:    { color: "#7f1d1d", bg: "rgba(127,29,29,0.16)" },
}

/* ─────────────────────────────────────────────
   STAR RATING
───────────────────────────────────────────── */
function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar
          key={s}
          size={10}
          style={{ color: s <= Math.round(rating) ? "#D4A437" : "#D4A43740" }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MOBILE-FIRST RESPONSIVE PRODUCT CARD
───────────────────────────────────────────── */
export default function ProductCard({ product, onOpen }) {
  // 2. EXTRACT GLOBAL METHODS FROM YOUR REAL CART CONTEXT
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart()

  const [liked, setLiked] = useState(false)
  const [addedPop, setAddedPop] = useState(false)
  
  // Local weight tracking layer
  const [selectedWeight, setSelectedWeight] = useState("250g")
  
  const spice = SPICE_MAP[product.spice] || SPICE_MAP.Medium

  // Extract available weight tiers (Fallback safely if database structure changes later)
  const weightOptions = product.variants ? product.variants.map(v => v.weight) : ["250g", "500g", "1kg"]

  // Calculate matching structural pricing contexts
  const getActivePrice = () => {
    if (product.variants) {
      const variant = product.variants.find(v => v.weight === selectedWeight)
      if (variant) return variant.price
    }
    if (selectedWeight === "500g") return Math.round(product.basePrice * 1.9)
    if (selectedWeight === "1kg") return Math.round(product.basePrice * 3.6)
    return product.basePrice
  }
  const currentPrice = getActivePrice()

  // 3. READ THE ACTIVE QUANTITY STATE MATCHING BOTH ID AND CURRENT WEIGHT SIZE
  const currentCartItem = cartItems?.find(
    (item) => item.id === product.id && item.weight === selectedWeight
  )
  const qty = currentCartItem ? currentCartItem.quantity : 0

  const handleAdd = (e) => {
    e.stopPropagation() // Stops modal popup from triggering instantly
    
    // 4. FIRE THE REAL CONTEXT METHOD WITH SPECIFIED WEIGHT VALUES
    if (addToCart) {
      addToCart({
        ...product,
        weight: selectedWeight, 
        price: currentPrice,
        quantity: 1,
      })
    }

    setAddedPop(true)
    setTimeout(() => setAddedPop(false), 1600)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      onClick={() => onOpen({ ...product, activeWeight: selectedWeight, currentPrice })}
      className="group relative flex flex-col w-full overflow-hidden rounded-2xl border border-[#D4A437]/15 bg-[#FFFDF5] shadow-sm transition-all duration-300 select-none cursor-pointer active:scale-[0.99] md:hover:-translate-y-1.5 md:hover:shadow-xl md:rounded-[28px]"
    >
      
      {/* ── IMAGE BLOCK ── */}
      <div className="relative w-full aspect-[4/3] overflow-hidden md:h-64 md:aspect-auto">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover block"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 mix-blend-multiply pointer-events-none" />

        {/* BADGES */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 md:top-4 md:left-4">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wider uppercase md:text-xs">
            <FaFireAlt style={{ color: spice.color }} className="text-[9px] md:text-xs" />
            {product.spice}
          </div>

          {product.bestSeller && (
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#6E0E12] to-[#9B1B22] text-white text-[10px] font-bold tracking-wider uppercase shadow-md shadow-[#6E0E12]/30 md:text-xs"
            >
              <FaBolt className="text-[8px]" />
              Best Seller
            </motion.div>
          )}
        </div>

        {/* FAVORITE BUTTON */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation()
            setLiked((l) => !l)
          }}
          whileTap={{ scale: 0.85 }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center border backdrop-blur-md transition-colors pointer-events-auto ${
            liked 
              ? "bg-[#6E0E12]/90 border-transparent text-white" 
              : "bg-black/30 border-white/10 text-white/90"
          } md:top-4 md:right-4 md:w-9 md:h-9`}
        >
          <FaHeart size={12} className={liked ? "scale-110" : ""} />
        </motion.button>
      </div>

      {/* ── CONTENT BODY ── */}
      <div className="flex flex-col flex-1 p-3.5 relative md:p-5">
        
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#D4A437]/20 to-transparent pointer-events-none" />

        <p className="text-[9px] tracking-widest font-extrabold text-uppercase text-[#D4A437] mb-0.5 uppercase md:text-xs md:mb-1">
          {product.category}
        </p>

        <h3 className="font-serif font-bold text-sm text-[#1A1A1A] leading-tight mb-1 line-clamp-1 group-hover:text-[#6E0E12] transition-colors md:text-xl md:mb-1.5">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2 md:text-sm md:mb-4">
          {product.description}
        </p>

        {/* ── SATISFYING INLINE WEIGHT SELECTION TABS ── */}
        <div className="mb-4 bg-gray-100/80 p-1 rounded-xl flex items-center gap-1 border border-gray-200/40">
          {weightOptions.map((weight) => {
            const isSelected = selectedWeight === weight
            return (
              <button
                key={weight}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedWeight(weight)
                }}
                className={`flex-1 text-center py-1.5 text-[11px] md:text-xs font-bold rounded-lg transition-all relative ${
                  isSelected 
                    ? "bg-white text-[#0B5D3B] shadow-xs" 
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {weight}
              </button>
            )
          })}
        </div>

        {/* Rating & Pricing Row */}
        <div className="flex items-center justify-between gap-2 mb-4 mt-auto">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <StarRow rating={product.rating} />
              <span className="text-xs font-bold text-gray-800 md:text-sm">
                {product.rating}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 hidden sm:block">
              {product.reviews}+ reviews
            </p>
          </div>

          {/* Dynamic Price Display Block */}
          <div className="text-right px-3 py-1.5 rounded-xl bg-gradient-to-br from-[#FFF7E0] to-[#FFFDF5] border border-[#D4A437]/20 shadow-2xs min-w-[70px]">
            <p className="text-[8px] tracking-wider text-gray-400 font-semibold uppercase md:text-[9px]">
              Price
            </p>
            <p className="font-serif font-black text-base text-[#6E0E12] md:text-xl">
              ₹{currentPrice}
            </p>
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap gap-1 mb-4 max-h-[48px] overflow-hidden md:gap-1.5 md:mb-5">
          <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wide bg-[#0B5D3B]/10 text-[#0B5D3B] md:text-xs">
            Homemade
          </span>
          <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wide bg-[#D4A437]/10 text-[#92650A] md:text-xs">
            Authentic
          </span>
          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wide bg-[#0B5D3B]/10 text-[#0B5D3B] md:text-xs">
            <FaLeaf size={7} /> Fresh
          </span>
        </div>

        {/* ── CTA BUTTONS ACTION ROW ── */}
        <div className="flex items-center gap-2 relative mt-auto">
          
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.stopPropagation()
              onOpen({ ...product, activeWeight: selectedWeight, currentPrice })
            }}
            className="w-10 h-10 rounded-xl flex-shrink-0 bg-[#FFF9EE] border border-[#D4A437]/30 flex items-center justify-center text-gray-800 transition-colors md:w-12 md:h-12 md:rounded-2xl md:hover:bg-[#0B5D3B] md:hover:text-white"
          >
            <FaShoppingBag size={14} className="md:size-4" />
          </motion.button>

          {/* DYNAMIC ADAPTIVE INTERACTION SWITCHER */}
          {qty === 0 ? (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAdd}
              className="flex-1 h-10 rounded-xl bg-gradient-to-r from-[#0B5D3B] via-[#145c3f] to-[#1e704e] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#0B5D3B]/20 overflow-hidden relative md:h-12 md:rounded-2xl md:text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              <FaPlus size={10} />
              <span>Add {selectedWeight}</span>
            </motion.button>
          ) : (
            <div className="flex-1 h-10 rounded-xl bg-[#0B5D3B] text-white font-bold text-xs flex items-center justify-between px-3 shadow-md shadow-[#0B5D3B]/20 md:h-12 md:rounded-2xl md:text-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (qty <= 1) {
                    removeFromCart(product.id, selectedWeight)
                  } else {
                    updateQuantity(product.id, selectedWeight, "decrease")
                  }
                }}
                className="p-2 text-white/80 hover:text-white active:scale-90 transition-colors"
              >
                <FaMinus size={10} />
              </button>
              
              <span className="text-xs font-black tracking-wide md:text-sm">
                {qty} ({selectedWeight}) Added
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateQuantity(product.id, selectedWeight, "increase")
                }}
                className="p-2 text-white/80 hover:text-white active:scale-90 transition-colors"
              >
                <FaPlus size={10} />
              </button>
            </div>
          )}

          {/* Responsive Floating Toast Alert */}
          <AnimatePresence>
            {addedPop && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-full right-0 mb-2 bg-[#0B5D3B] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg whitespace-nowrap z-20"
              >
                ✓ {selectedWeight} added to cart
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border-1.5 border-transparent transition-colors pointer-events-none md:rounded-[28px] md:group-hover:border-[#D4A437]/40" />
    </motion.article>
  )
}