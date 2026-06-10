import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Flame,
  Truck,
  Leaf,
  Award,
  ChevronDown,
  Scale,
  CheckCircle2,
  Info,
  Droplet
} from "lucide-react"
import { useCart } from "../context/CartContext"

/* ──────────────────────────────────────────────────────────────────────────────
   1. REGISTRIES, METADATA CONTEXTS & DESIGN SYSTEM PARAMETERS
────────────────────────────────────────────────────────────────────────────── */
const SPICE_REGISTRY = {
  Mild:   { color: "#10B981", bg: "rgba(16,185,129,0.06)", label: "Mild Spice", intensity: 1, desc: "Gentle warming flavor profile suitable for all palates." },
  Medium: { color: "#F59E0B", bg: "rgba(245,158,11,0.06)", label: "Medium Hot", intensity: 2, desc: "Standard traditional recipe heat level with rich balance." },
  Spicy:  { color: "#EF4444", bg: "rgba(239,68,68,0.06)",  label: "Andhra Hot", intensity: 3, desc: "Fiery native flavor kick following signature regional guidelines." },
  Hot:    { color: "#991B1B", bg: "rgba(153,27,27,0.06)",  label: "Extra Spicy", intensity: 4, desc: "Intense volcanic heat layer designed for true spice lovers." },
}

const INFO_PANELS = {
  RECIPE: "recipe",
  INGREDIENTS: "ingredients",
  STORAGE: "storage"
}

/* ──────────────────────────────────────────────────────────────────────────────
   2. EXTRACTION DECORATOR INTERFACE SUB-COMPONENTS
────────────────────────────────────────────────────────────────────────────── */
function DescriptiveMetricCard({ icon: Icon, title, description, accentColor }) {
  return (
    <div 
      className="flex items-center gap-2.5 p-3 rounded-xl border flex-1 min-w-[105px] transition-all duration-300 bg-white"
      style={{ borderColor: `${accentColor}15` }}
    >
      <div 
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${accentColor}08` }}
      >
        <Icon size={13} style={{ color: accentColor }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black text-gray-800 leading-none truncate tracking-tight">{title}</p>
        <p className="text-[9px] text-gray-400 mt-1 truncate font-semibold leading-none">{description}</p>
      </div>
    </div>
  )
}

function EnterpriseRatingConsole({ score, auditCount }) {
  const normalizedStars = useMemo(() => Array.from({ length: 5 }, (_, index) => index + 1), [])

  return (
    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-2xs">
      <div className="flex items-center gap-0.5">
        {normalizedStars.map((starIndex) => {
          const isFilled = starIndex <= Math.round(score)
          return (
            <Star 
              key={starIndex} 
              size={10} 
              className={isFilled ? "text-amber-400 fill-amber-400" : "text-gray-500/40"} 
            />
          )
        })}
      </div>
      <span className="text-[10px] font-black text-white font-mono pt-[0.5px] leading-none">
        {score} <span className="text-white/60 font-sans font-bold">({auditCount})</span>
      </span>
    </div>
  )
}

function DietaryComplianceBadges({ isVeg }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1">
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold border ${
        isVeg 
          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
          : "bg-amber-50 text-amber-800 border-amber-200"
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full ${isVeg ? "bg-emerald-600" : "bg-amber-800"}`} />
        <span>100% Authentic {isVeg ? "Vegetarian" : "Non-Vegetarian"}</span>
      </div>
      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold bg-gray-50 text-gray-500 border border-gray-100">
        <span>No Added Preservatives</span>
      </div>
    </div>
  )
}

function TasteProfileConsole({ spiceLabel }) {
  const flavorMetrics = useMemo(() => {
    const isSpicyTier = spiceLabel === "Spicy" || spiceLabel === "Hot"
    return [
      { attribute: "Spice Heat", balance: isSpicyTier ? "85%" : "55%", track: "bg-red-500" },
      { attribute: "Tanginess",  balance: "65%", track: "bg-amber-500" },
      { attribute: "Salt Balance", balance: "50%", track: "bg-blue-400" },
    ]
  }, [spiceLabel])

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3.5 space-y-2.5 shadow-3xs">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
        <Droplet size={11} className="text-emerald-700" /> Flavor Equilibrium Profile
      </p>
      <div className="space-y-2">
        {flavorMetrics.map((flavor, flavorIndex) => (
          <div key={flavorIndex} className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-bold text-gray-600 w-20 flex-shrink-0">{flavor.attribute}</span>
            <div className="flex-1 h-1.5 bg-gray-50 border border-gray-100/60 rounded-full overflow-hidden relative">
              <div className={`h-full rounded-full ${flavor.track}`} style={{ width: flavor.balance }} />
            </div>
            <span className="text-[10px] font-mono font-bold text-gray-400 w-8 text-right">{flavor.balance}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CulinaryAccordionSection({ identifier, activePanel, changePanel, label, icon: HeaderIcon, briefContent }) {
  const isPanelOpen = identifier === activePanel

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-3xs transition-colors duration-300">
      <button
        type="button"
        onClick={() => changePanel(isPanelOpen ? null : identifier)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-transparent select-none cursor-pointer touch-manipulation focus:outline-none"
      >
        <span className="text-xs font-black text-gray-800 tracking-tight font-serif uppercase flex items-center gap-2">
          <HeaderIcon size={12} className="text-gray-400" />
          <span>{label}</span>
        </span>
        <motion.div
          animate={{ rotate: isPanelOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
          className="text-gray-400"
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isPanelOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 pt-1 border-t border-gray-50">
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                {briefContent}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────────
   3. MAIN PRODUCT OVERLAY SYSTEM ARCHITECTURE
────────────────────────────────────────────────────────────────────────────── */
export default function ProductModal({ isOpen, onClose, product, openCart }) {
  const { addToCart } = useCart()

  // STATE MANAGEMENT
  const [packQuantity, setPackQuantity] = useState(1)
  const [isSuccessFlashActive, setIsSuccessFlashActive] = useState(false)
  const [selectedWeightLabel, setSelectedWeightLabel] = useState("250g")
  const [expandedStoryPanel, setExpandedStoryPanel] = useState(INFO_PANELS.RECIPE)
  const [assetImageLoaded, setAssetImageLoaded] = useState(false)

  // CLEAN STATE RESET ON OPEN
  useEffect(() => {
    if (isOpen) {
      setPackQuantity(1)
      setIsSuccessFlashActive(false)
      setAssetImageLoaded(false)
      setSelectedWeightLabel("250g")
    }
  }, [isOpen, product])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => { document.body.style.overflow = "auto" }
  }, [isOpen])

  // ACCESSIBILITY ESCAPE KEY BINDING
  useEffect(() => {
    const processHardwareEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", processHardwareEscape)
    return () => window.removeEventListener("keydown", processHardwareEscape)
  }, [isOpen, onClose])

  // DYNAMIC CONFIGURATION MATRIX DERIVATION
  const productWeightTiers = useMemo(() => {
    if (!product) return []
    return [
      { label: "250g", multiplier: 1, pricing: product.basePrice },
      { label: "500g", multiplier: 2, pricing: product.basePrice * 2, alertPill: "Popular Choice" },
      { label: "1kg",  multiplier: 4, pricing: product.basePrice * 4, alertPill: "Best Value" },
    ]
  }, [product])

  // SAFE FALLBACK OBJECT EVALUATION
  const activeWeightTier = useMemo(() => {
    return productWeightTiers.find(t => t.label === selectedWeightLabel) || productWeightTiers[0] || { label: "250g", pricing: 0 }
  }, [productWeightTiers, selectedWeightLabel])

  const evaluatedSubtotalPrice = activeWeightTier.pricing * packQuantity
  const specificSpiceProfile = product ? (SPICE_REGISTRY[product.spice] || SPICE_REGISTRY.Medium) : SPICE_REGISTRY.Medium

  const computedStoryText = {
    [INFO_PANELS.RECIPE]: product?.description || "Authentic family recipe crafted slowly in micro batches to retain native essential oils and raw texture depth.",
    [INFO_PANELS.INGREDIENTS]: `Premium local farm select produce, pure heritage stone-ground spice matrix, regional cold-pressed culinary grade oil layers, organic hand-crushed sea salts, natural turmeric antiseptic filters. 100% trace-free of artificial chemical enhancers or stabilizing fillers.`,
    [INFO_PANELS.STORAGE]: "Store safely inside dry airtight glass canisters away from immediate exposure to damp zones. Always employ dry bone-sterile serving spatulas. Pure preservation properties sustain accurate flavor profile security for up to 12 months from open deployment seal."
  }

  // EVENT INTERCEPTIONS & WORKFLOW METHODS
  const dispatchCartSubmission = (clickEvent) => {
    if (clickEvent) {
      clickEvent.preventDefault()
      clickEvent.stopPropagation()
    }
    
    if (isSuccessFlashActive || !product) return 

    if (addToCart) {
      const formattedItemPayload = {
        ...product,
        basePrice: activeWeightTier.pricing
      }
      addToCart(formattedItemPayload, { label: activeWeightTier.label, price: activeWeightTier.pricing }, packQuantity)
    }

    setIsSuccessFlashActive(true)
    setTimeout(() => {
      setIsSuccessFlashActive(false)
    }, 1200)
  }

  const bypassMobileGhostClickClose = (clickEvent) => {
    if (clickEvent) {
      clickEvent.preventDefault()
      clickEvent.stopPropagation()
    }
    onClose()
  }

  const modifyPackQuantityCount = (operationType) => {
    if (operationType === "decrement") {
      if (packQuantity > 1) {
        setPackQuantity(current => current - 1)
        setIsSuccessFlashActive(false) 
      }
    } else {
      setPackQuantity(current => current + 1)
      setIsSuccessFlashActive(false) 
    }
  }

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-[99999] flex items-end justify-center sm:items-center p-0 sm:p-4 select-none touch-manipulation overscroll-none">
          
          {/* ── AMBIENT CANVAS OVERLAY FILTER SHEET ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={bypassMobileGhostClickClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs z-0 pointer-events-auto"
          />

          {/* ── HARDWARE ACCELERATED MODAL WRAPPER SHEET ── */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-h-[88vh] sm:max-h-[85vh] bg-[#FFFDF7] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-2xl shadow-2xl relative z-10 sm:max-w-xl pointer-events-auto border-t border-gray-100/40 sm:border-transparent"
          >
            {/* ── VISUAL PHOTO SHOWCASE AREA ── */}
            <div className="relative w-full h-44 xs:h-48 sm:h-56 flex-shrink-0 overflow-hidden bg-gray-50 border-b border-gray-100/50">
              {!assetImageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 animate-[shimmer_1.5s_infinite] bg-[length:200%_100%]" />
              )}

              <img 
                src={product.image} 
                alt={product.name} 
                onLoad={() => setAssetImageLoaded(true)}
                className={`w-full h-full object-cover block transition-opacity duration-500 ${
                  assetImageLoaded ? "opacity-100" : "opacity-0"
                }`} 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-white text-[9px] font-black tracking-widest uppercase">
                  <Flame size={10} style={{ color: specificSpiceProfile.color, fill: specificSpiceProfile.color }} /> 
                  <span>{specificSpiceProfile.label}</span>
                </div>

                <EnterpriseRatingConsole score={product.rating || 4.8} auditCount={product.reviews || 120} />
              </div>

              <button
                type="button"
                onClick={bypassMobileGhostClickClose}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 border border-white/10 text-white flex items-center justify-center cursor-pointer touch-manipulation active:scale-90 transition-transform z-20"
              >
                <X size={14} strokeWidth={2.5} />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-[#FFFDF7] via-[#FFFDF7]/70 to-transparent z-10">
                <p className="text-[9px] tracking-[3px] font-black text-[#6E0E12] uppercase mb-0.5">{product.category || "Traditional Food Craft"}</p>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-tight sm:text-2xl" style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}>
                  {product.name}
                </h2>
              </div>
            </div>

            {/* ── CORE DETAILS VIEWPORT CONTENT SCROLL LAYER ── */}
            <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2 space-y-4 no-scrollbar bg-[#FFFDF7]">
              <DietaryComplianceBadges isVeg={product.type === "Veg"} />

              <div className="space-y-2">
                <CulinaryAccordionSection identifier={INFO_PANELS.RECIPE} activePanel={expandedStoryPanel} changePanel={setExpandedStoryPanel} label="The Heritage Process" icon={Award} briefContent={computedStoryText[INFO_PANELS.RECIPE]} />
                <CulinaryAccordionSection identifier={INFO_PANELS.INGREDIENTS} activePanel={expandedStoryPanel} changePanel={setExpandedStoryPanel} label="Pure Ingredient Source" icon={Leaf} briefContent={computedStoryText[INFO_PANELS.INGREDIENTS]} />
                <CulinaryAccordionSection identifier={INFO_PANELS.STORAGE} activePanel={expandedStoryPanel} changePanel={setExpandedStoryPanel} label="Storage Guidelines" icon={Info} briefContent={computedStoryText[INFO_PANELS.STORAGE]} />
              </div>

              <TasteProfileConsole spiceLabel={product.spice} />

              {/* WEIGHT SELECTION TIER CONSOLE */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <span className="flex items-center gap-1"><Scale size={11} /> Select Net Content Weight</span>
                  <span>Configurations Adapt</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {productWeightTiers.map((tierItem) => {
                    const isTierSelected = selectedWeightLabel === tierItem.label
                    return (
                      <button
                        key={tierItem.label}
                        type="button"
                        onClick={() => {
                          setSelectedWeightLabel(tierItem.label)
                          setIsSuccessFlashActive(false) 
                        }}
                        className={`relative h-14 rounded-xl border flex flex-col items-center justify-center transition-all select-none cursor-pointer touch-manipulation ${
                          isTierSelected 
                            ? "bg-[#0B5D3B] border-transparent text-white shadow-md shadow-[#0B5D3B]/10" 
                            : "bg-white border-gray-100 text-gray-800 active:bg-gray-50/60"
                        }`}
                      >
                        {tierItem.alertPill && (
                          <span className={`absolute -top-1.5 right-1.5 text-[7px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider leading-none shadow-3xs transition-colors ${
                            isTierSelected ? "bg-[#D4A437] text-white" : "bg-[#6E0E12] text-white"
                          }`}>
                            {tierItem.alertPill}
                          </span>
                        )}
                        <span className="text-sm font-black font-serif leading-none">{tierItem.label}</span>
                        <span className={`text-[10px] font-bold mt-1 ${isTierSelected ? "text-emerald-100" : "text-gray-400"}`}>₹{tierItem.pricing}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-3.5 flex items-center justify-between gap-4 shadow-3xs">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest font-black text-gray-400">Pack Quantity</span>
                  <div className="flex items-center gap-2.5 mt-1">
                    <button
                      type="button"
                      onClick={() => modifyPackQuantityCount("decrement")}
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center cursor-pointer touch-manipulation transition-colors ${
                        packQuantity <= 1 ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed" : "bg-gray-50 border-gray-200 text-gray-700 active:bg-gray-100"
                      }`}
                    >
                      <Minus size={10} strokeWidth={3} />
                    </button>
                    <span className="w-6 text-center text-sm font-black text-gray-900 font-mono pt-[1px]">{packQuantity}</span>
                    <button
                      type="button"
                      onClick={() => modifyPackQuantityCount("increment")}
                      className="w-7 h-7 rounded-lg text-white bg-[#0B5D3B] flex items-center justify-center cursor-pointer touch-manipulation active:bg-[#094d31]"
                    >
                      <Plus size={10} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest font-black text-gray-400">Subtotal Price</span>
                  <p className="text-xl font-black text-[#6E0E12] font-mono mt-0.5">₹{evaluatedSubtotalPrice}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                <DescriptiveMetricCard icon={Truck} title="Fast Shipped" description="2-4 Day Delivery" accentColor="#0B5D3B" />
                <DescriptiveMetricCard icon={Leaf} title="100% Fresh" description="Small Batches" accentColor="#D4A437" />
                <DescriptiveMetricCard icon={Award} title="Traditional" description="Andhra Heritage" accentColor="#6E0E12" />
              </div>
            </div>

            {/* ── PERMANENT STATIC LAYOUT CONTROLS ACTION DECK FOOTER ── */}
            <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0 min-h-[72px] bg-[#FFFDF7] z-20 flex items-center gap-3 pointer-events-auto">
              <button 
                type="button" 
                onClick={bypassMobileGhostClickClose} 
                className="flex-1 h-12 rounded-xl border border-gray-200 bg-white text-gray-700 font-black text-xs uppercase tracking-wider flex items-center justify-center cursor-pointer touch-manipulation active:bg-gray-50 transition-colors"
              >
                Keep Browsing
              </button>
              
              <button 
                type="button" 
                onClick={dispatchCartSubmission} 
                className={`flex-1 h-12 rounded-xl text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer touch-manipulation active:scale-[0.98] transition-all duration-300 ${
                  isSuccessFlashActive 
                    ? "bg-emerald-700 shadow-emerald-700/10" 
                    : "bg-gradient-to-r from-[#0B5D3B] via-[#126643] to-[#6E0E12]"
                }`}
              >
                {isSuccessFlashActive ? (
                  <div className="flex items-center gap-1.5 animate-[fadeIn_0.2s_ease-out]">
                    <CheckCircle2 size={13} className="text-white fill-white/10" />
                    <span>Added! ✓</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={12} className="text-emerald-200" />
                    <span>Add · ₹{evaluatedSubtotalPrice}</span>
                  </div>
                )}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}