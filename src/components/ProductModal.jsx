import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X, Minus, Plus, ShoppingBag, Star, Flame,
  Truck, Leaf, Award, ChevronDown, Scale,
  CheckCircle2, Info, Droplet, Package,
} from "lucide-react"
import { useCart } from "../context/CartContext"

/* ── SPICE REGISTRY ── */
const SPICE_REGISTRY = {
  Mild:   { color: "#10B981", bg: "rgba(16,185,129,0.07)",  label: "Mild",        intensity: 1 },
  Medium: { color: "#F59E0B", bg: "rgba(245,158,11,0.07)",  label: "Medium Hot",  intensity: 2 },
  Spicy:  { color: "#EF4444", bg: "rgba(239,68,68,0.07)",   label: "Andhra Hot",  intensity: 3 },
  Hot:    { color: "#991B1B", bg: "rgba(153,27,27,0.07)",   label: "Extra Spicy", intensity: 4 },
}

const INFO_PANELS = { RECIPE: "recipe", INGREDIENTS: "ingredients", STORAGE: "storage" }

/* ── SPICE HEAT DOTS ── */
function SpiceHeatDots({ intensity, color }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 4 }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.06, duration: 0.25 }}
          className="w-2.5 h-2.5 rounded-full border"
          style={{
            backgroundColor: i < intensity ? color : "transparent",
            borderColor: i < intensity ? color : "#E5E7EB",
          }}
        />
      ))}
    </div>
  )
}

/* ── STAR RATING ── */
function StarRating({ score, auditCount }) {
  return (
    <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={9}
            className={i < Math.round(score) ? "text-amber-400 fill-amber-400" : "text-gray-500/40"}
          />
        ))}
      </div>
      <span className="text-[10px] font-black text-white font-mono leading-none">
        {score} <span className="text-white/55 font-sans font-bold">({auditCount})</span>
      </span>
    </div>
  )
}

/* ── DIETARY BADGES ── */
function DietaryBadges({ isVeg }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-bold border ${
        isVeg
          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
          : "bg-amber-50 text-amber-800 border-amber-200"
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full ${isVeg ? "bg-emerald-600" : "bg-amber-800"}`} />
        100% {isVeg ? "Vegetarian" : "Non-Vegetarian"}
      </div>
      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-bold bg-gray-50 text-gray-500 border border-gray-100">
        No Preservatives
      </div>
    </div>
  )
}

/* ── FLAVOR PROFILE BARS ── */
function FlavorProfile({ spiceLabel }) {
  const metrics = useMemo(() => {
    const isHot = spiceLabel === "Spicy" || spiceLabel === "Hot"
    return [
      { label: "Spice Heat",    pct: isHot ? "85%" : "50%", color: "bg-red-500"   },
      { label: "Tanginess",     pct: "65%",                  color: "bg-amber-500" },
      { label: "Salt Balance",  pct: "50%",                  color: "bg-blue-400"  },
    ]
  }, [spiceLabel])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 space-y-2.5 shadow-sm">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
        <Droplet size={11} className="text-emerald-700" /> Flavor Profile
      </p>
      <div className="space-y-2">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-gray-500 w-20 flex-shrink-0">{m.label}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: m.pct }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className={`h-full rounded-full ${m.color}`}
              />
            </div>
            <span className="text-[10px] font-mono font-bold text-gray-400 w-8 text-right">{m.pct}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── ACCORDION SECTION ── */
function AccordionSection({ id, activeId, setActiveId, label, icon: Icon, content }) {
  const isOpen = id === activeId
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setActiveId(isOpen ? null : id)}
        className="w-full flex items-center justify-between px-4 py-3.5 select-none cursor-pointer touch-manipulation focus:outline-none"
      >
        <span className="text-[11px] font-black text-gray-800 tracking-tight uppercase flex items-center gap-2">
          <Icon size={12} className="text-gray-400" />
          {label}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="text-gray-400 flex-shrink-0"
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pt-1 border-t border-gray-50">
              <p className="text-xs text-gray-500 font-medium leading-relaxed">{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── MAIN PRODUCT MODAL ── */
export default function ProductModal({ isOpen, onClose, product, openCart }) {
  const { addToCart } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [addedFlash, setAddedFlash] = useState(false)
  const [selectedWeight, setSelectedWeight] = useState("250g")
  const [activePanel, setActivePanel] = useState(INFO_PANELS.RECIPE)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setQuantity(1)
      setAddedFlash(false)
      setImgLoaded(false)
      setSelectedWeight("250g")
      setActivePanel(INFO_PANELS.RECIPE)
    }
  }, [isOpen, product])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [isOpen])

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape" && isOpen) onClose() }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [isOpen, onClose])

  const weightTiers = useMemo(() => {
    if (!product) return []
    return [
      { label: "250g", price: product.basePrice },
      { label: "500g", price: product.basePrice * 2, badge: "Popular" },
      { label: "1kg",  price: product.basePrice * 4, badge: "Best Value" },
    ]
  }, [product])

  const activeTier = useMemo(
    () => weightTiers.find((t) => t.label === selectedWeight) || weightTiers[0] || { label: "250g", price: 0 },
    [weightTiers, selectedWeight]
  )

  const subtotal = (activeTier.price || 0) * quantity
  const spice = product ? (SPICE_REGISTRY[product.spice] || SPICE_REGISTRY.Medium) : SPICE_REGISTRY.Medium

  const storyText = {
    [INFO_PANELS.RECIPE]:      product?.description || "Authentic family recipe crafted in micro batches to retain essential oils and raw texture depth.",
    [INFO_PANELS.INGREDIENTS]: "Premium local farm produce, heritage stone-ground spice matrix, regional cold-pressed oil, organic hand-crushed sea salts, natural turmeric. 100% free of artificial enhancers or stabilizers.",
    [INFO_PANELS.STORAGE]:     "Store in a dry airtight glass container away from moisture. Always use a dry spoon. Flavor stays accurate for up to 12 months from the open seal.",
  }

  const handleAddToCart = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation() }
    if (addedFlash || !product) return
    addToCart({ ...product, basePrice: activeTier.price }, { label: activeTier.label, price: activeTier.price }, quantity)
    setAddedFlash(true)
    setTimeout(() => setAddedFlash(false), 1600)
  }

  const handleClose = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation() }
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-[99999] flex items-end justify-center sm:items-center p-0 sm:p-4 select-none touch-manipulation">

          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/78 backdrop-blur-sm z-0 pointer-events-auto"
          />

          {/* SHEET */}
          <motion.div
            initial={{ y: "100%", opacity: 0.6 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.6 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-h-[90vh] sm:max-h-[86vh] bg-[#FFFDF7] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl shadow-2xl relative z-10 sm:max-w-lg pointer-events-auto"
          >

            {/* ── IMAGE HEADER ── */}
            <div className="relative w-full flex-shrink-0 overflow-hidden bg-gray-100" style={{ height: "clamp(180px, 42vw, 230px)" }}>
              {/* Skeleton shimmer */}
              {!imgLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-pulse" />
              )}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF7] via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

              {/* TOP LEFT: spice + rating */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                <div
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 text-white text-[9px] font-black tracking-widest uppercase"
                  style={{ backgroundColor: `${spice.color}cc` }}
                >
                  <Flame size={9} className="text-white" />
                  {spice.label}
                </div>
                <StarRating score={product.rating || 4.8} auditCount={product.reviews || 120} />
              </div>

              {/* TOP RIGHT: close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 border border-white/10 text-white flex items-center justify-center cursor-pointer touch-manipulation active:scale-90 transition-transform z-20"
              >
                <X size={14} strokeWidth={2.5} />
              </button>

              {/* BOTTOM: product name */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-10 z-10">
                <p className="text-[8px] tracking-[3px] font-black text-[#6E0E12] uppercase mb-0.5">
                  {product.category || "Traditional Food Craft"}
                </p>
                <h2
                  className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight"
                  style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
                >
                  {product.name}
                </h2>
              </div>
            </div>

            {/* ── SCROLLABLE CONTENT ── */}
            <div className="flex-1 overflow-y-auto px-4 pb-5 pt-3 space-y-4 no-scrollbar">

              {/* Dietary + spice heat */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <DietaryBadges isVeg={product.type === "Veg"} />
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Heat</span>
                  <SpiceHeatDots intensity={spice.intensity} color={spice.color} />
                </div>
              </div>

              {/* Accordions */}
              <div className="space-y-2">
                <AccordionSection
                  id={INFO_PANELS.RECIPE}
                  activeId={activePanel}
                  setActiveId={setActivePanel}
                  label="Heritage Process"
                  icon={Award}
                  content={storyText[INFO_PANELS.RECIPE]}
                />
                <AccordionSection
                  id={INFO_PANELS.INGREDIENTS}
                  activeId={activePanel}
                  setActiveId={setActivePanel}
                  label="Pure Ingredients"
                  icon={Leaf}
                  content={storyText[INFO_PANELS.INGREDIENTS]}
                />
                <AccordionSection
                  id={INFO_PANELS.STORAGE}
                  activeId={activePanel}
                  setActiveId={setActivePanel}
                  label="Storage Guide"
                  icon={Info}
                  content={storyText[INFO_PANELS.STORAGE]}
                />
              </div>

              {/* Flavor profile */}
              <FlavorProfile spiceLabel={product.spice} />

              {/* Weight selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Scale size={11} /> Select Weight
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {weightTiers.map((tier) => {
                    const isSelected = selectedWeight === tier.label
                    return (
                      <motion.button
                        key={tier.label}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedWeight(tier.label)
                          setAddedFlash(false)
                        }}
                        className="relative h-[62px] rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer touch-manipulation overflow-hidden"
                        style={{
                          backgroundColor: isSelected ? "#0B5D3B" : "#fff",
                          borderColor: isSelected ? "transparent" : "#E5E7EB",
                          boxShadow: isSelected ? "0 6px 20px rgba(11,93,59,0.22)" : "none",
                        }}
                      >
                        {/* Shimmer on selected */}
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                        )}
                        {tier.badge && (
                          <span
                            className="absolute -top-px left-1/2 -translate-x-1/2 text-[7px] font-black px-2 py-0.5 rounded-b-md uppercase tracking-wider leading-none"
                            style={{
                              backgroundColor: isSelected ? "#D4A437" : "#6E0E12",
                              color: "#fff",
                            }}
                          >
                            {tier.badge}
                          </span>
                        )}
                        <span
                          className="text-sm font-black font-serif leading-none relative z-10"
                          style={{ color: isSelected ? "#fff" : "#111827" }}
                        >
                          {tier.label}
                        </span>
                        <span
                          className="text-[10px] font-bold mt-1 relative z-10"
                          style={{ color: isSelected ? "rgba(255,255,255,0.75)" : "#9CA3AF" }}
                        >
                          ₹{tier.price}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Quantity + subtotal */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-black text-gray-400">Quantity</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      onClick={() => { if (quantity > 1) { setQuantity((q) => q - 1); setAddedFlash(false) } }}
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center cursor-pointer touch-manipulation transition-colors ${
                        quantity <= 1
                          ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed"
                          : "bg-gray-50 border-gray-200 text-gray-700 active:bg-gray-100"
                      }`}
                    >
                      <Minus size={10} strokeWidth={3} />
                    </motion.button>
                    <span className="w-7 text-center text-sm font-black text-gray-900 font-mono">
                      {quantity}
                    </span>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      onClick={() => { setQuantity((q) => q + 1); setAddedFlash(false) }}
                      className="w-8 h-8 rounded-xl text-white bg-[#0B5D3B] flex items-center justify-center cursor-pointer touch-manipulation active:bg-[#094d31] transition-colors"
                    >
                      <Plus size={10} strokeWidth={3} />
                    </motion.button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest font-black text-gray-400">Subtotal</span>
                  <motion.p
                    key={subtotal}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.18 }}
                    className="text-2xl font-black text-[#6E0E12] font-mono mt-0.5 leading-none"
                  >
                    ₹{subtotal}
                  </motion.p>
                </div>
              </div>

              {/* Delivery info chips */}
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { icon: Truck,   label: "2-4 Day",     sub: "Delivery",   color: "#0B5D3B" },
                  { icon: Leaf,    label: "100% Fresh",  sub: "Small Batch", color: "#D4A437" },
                  { icon: Package, label: "Sealed",      sub: "Hygienic",   color: "#6E0E12" },
                ].map(({ icon: Icon, label, sub, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 p-2.5 rounded-xl border bg-white"
                    style={{ borderColor: `${color}18` }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}0c` }}
                    >
                      <Icon size={12} style={{ color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-gray-800 leading-none truncate">{label}</p>
                      <p className="text-[9px] text-gray-400 mt-0.5 font-semibold leading-none">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── ACTION FOOTER ── */}
            <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0 flex items-center gap-3 z-20">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 h-12 rounded-xl border border-gray-200 bg-white text-gray-700 font-black text-xs uppercase tracking-wider flex items-center justify-center cursor-pointer touch-manipulation active:bg-gray-50 transition-colors"
              >
                Keep Browsing
              </button>

              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileTap={{ scale: 0.97 }}
                className="flex-1 h-12 rounded-xl text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer touch-manipulation overflow-hidden relative shadow-lg"
                style={{
                  background: addedFlash
                    ? "linear-gradient(135deg, #059669, #10b981)"
                    : "linear-gradient(135deg, #0B5D3B, #6E0E12)",
                  boxShadow: addedFlash
                    ? "0 8px 24px rgba(5,150,105,0.35)"
                    : "0 8px 24px rgba(11,93,59,0.25)",
                  transition: "background 0.35s ease, box-shadow 0.35s ease",
                }}
              >
                <AnimatePresence mode="wait">
                  {addedFlash ? (
                    <motion.div
                      key="added"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} className="text-white fill-white/20" />
                      <span>Added to Cart!</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={12} className="text-emerald-200" />
                      <span>Add · ₹{subtotal}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
