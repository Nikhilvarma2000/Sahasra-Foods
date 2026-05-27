import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  SlidersHorizontal,
  X,
  Leaf,
  Drumstick,
  Coffee,
  Cookie,
  LayoutGrid,
  ShoppingBag,
  Star,
  Flame
} from "lucide-react"
import ProductModal from "../components/ProductModal"
import { useCart } from "../context/CartContext"

// IMPORT SHEET CONFIGURATIONS AND LOCAL STORAGE FALLBACKS
import { GOOGLE_SHEETS_CSV_URL, FALLBACK_PRODUCTS } from "../data/products"

/* ─────────────────────────────────────────────
    DESIGN SYSTEM
───────────────────────────────────────────── */
const C = {
  cream:  "#FDFBF7",
  green:  "#0B5D3B",
  gold:   "#D4A437",
  dark:   "#121212",
  muted:  "#64748B",
  surface: "#FFFFFF",
  border: "#E2E8F0"
}

const CATEGORIES = [
  { label: "All",                icon: LayoutGrid },
  { label: "Veg Pickles",        icon: Leaf       },
  { label: "Non Veg Specials",   icon: Drumstick  },
  { label: "Powders & Masalas",  icon: Coffee     },
  { label: "Traditional Snacks", icon: Cookie     },
]

const SORT_OPTIONS = [
  { value: "featured", label: "Popular" },
  { value: "rating",   label: "Top Rated"   },
  { value: "low",      label: "Price: Low"  },
  { value: "high",     label: "Price: High" },
]

export default function Products() {
  const { cartItems, cartTotal } = useCart()

  const [products, setProducts]                 = useState(FALLBACK_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [search, setSearch]                     = useState("")
  const [sortBy, setSortBy]                     = useState("featured")
  const [selectedProduct, setSelectedProduct]   = useState(null)
  const [isModalOpen, setIsModalOpen]           = useState(false)
  const [sortOpen, setSortOpen]                 = useState(false)

  // ── SMART AUTO-CATEGORIZATION BASED ON NAME & EXPLICIT TYPE ──
  const autoCategorize = (name, type) => {
    const lower = name.toLowerCase()
    if (type.toLowerCase().includes("non") || lower.includes("chicken") || lower.includes("prawn") || lower.includes("mutton")) {
      return "Non Veg Specials"
    }
    if (lower.includes("podi") || lower.includes("masala") || lower.includes("powder") || lower.includes("karam")) {
      return "Powders & Masalas"
    }
    if (lower.includes("murukulu") || lower.includes("snack") || lower.includes("chekkalu") || lower.includes("mixture")) {
      return "Traditional Snacks"
    }
    return "Veg Pickles"
  }

  // ── FETCH ENGINE FOR 6-COLUMN SHEET ──
  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const response = await fetch(GOOGLE_SHEETS_CSV_URL)
        const csvText = await response.text()
        
        const rows = csvText.split("\n").map(row => row.trim()).filter(row => row.length > 0)
        if (rows.length <= 1) return

        const parsedItems = rows.slice(1).map((rowLine) => {
          const columns = rowLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          const clean = (str) => str ? str.replace(/^"|"$/g, '').trim() : ""

          const id = parseInt(clean(columns[0]))
          const name = clean(columns[1])
          const itemType = clean(columns[5]) || "Veg" // Grab column 6 safely
          const category = autoCategorize(name, itemType)

          return {
            id,
            name,
            category,
            basePrice: parseFloat(clean(columns[2])) || 150,
            image: clean(columns[3]) || "https://images.unsplash.com/photo-1547592180-85f173990554",
            description: clean(columns[4]) || "Authentic homemade specialty crafted fresh using premium premium local ingredients.",
            type: itemType.toLowerCase().includes("non") ? "Non Veg" : "Veg",
            
            // INTEL AUTOMATED BACKGROUND METRICS
            spice: itemType.toLowerCase().includes("non") ? "Spicy" : (id % 2 === 0 ? "Medium" : "Mild"),
            rating: parseFloat((4.6 + (id % 5) * 0.1).toFixed(1)) || 4.8,
            reviews: 80 + (id * 14),
            bestSeller: id === 1 || id === 3 || id % 4 === 0
          }
        }).filter(item => !isNaN(item.id))

        if (parsedItems.length > 0) {
          setProducts(parsedItems)
        }
      } catch (error) {
        console.error("Using fallback metrics layout:", error)
        setProducts(FALLBACK_PRODUCTS)
      }
    }

    fetchLiveProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let list = [...products]
    if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (selectedCategory !== "All") list = list.filter(p => p.category === selectedCategory)
    
    switch (sortBy) {
      case "low":    list.sort((a, b) => a.basePrice - b.basePrice); break
      case "high":   list.sort((a, b) => b.basePrice - a.basePrice); break
      case "rating": list.sort((a, b) => b.rating - a.rating);       break
      default:       list.sort((a, b) => (b.bestSeller || 0) - (a.bestSeller || 0))
    }
    return list
  }, [search, selectedCategory, sortBy, products])

  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label
  const totalCartItems = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <div id="products" className="min-h-screen text-[#121212] flex flex-col font-sans" style={{ backgroundColor: C.cream }}>
      
      {/* BRAND SUBHEADER */}
      <div className="px-4 pt-6 pb-2 text-center max-w-xl mx-auto md:pt-10">
        <h1 className="text-xl font-black tracking-tight font-serif md:text-3xl" style={{ color: C.dark }}>
          ORDER FRESH <span style={{ color: C.green }}>ANDHRA</span> SPECIALS
        </h1>
        <p className="text-[11px] text-gray-500 mt-0.5 md:text-xs">
          Handcrafted daily · Shipped straight from our kitchen to your home
        </p>
      </div>

      {/* FILTER STICKY DRAWER STRIP */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 px-3 py-2 md:px-6 md:py-3">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-2">
          
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search items instantly..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-8 pr-8 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-emerald-700 transition-all md:h-10 md:text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 p-0.5">
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 active:bg-gray-100 transition-colors md:h-10"
              >
                <SlidersHorizontal size={12} style={{ color: C.green }} />
                <span>{currentSortLabel}</span>
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden w-36 z-50 text-xs"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                        className="w-full text-left px-3 py-2 font-medium transition-colors hover:bg-gray-50"
                        style={{ color: sortBy === opt.value ? C.green : C.dark }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category Switch Filters Scroller */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar overscroll-contain">
            {CATEGORIES.map(({ label, icon: Icon }) => {
              const active = selectedCategory === label
              return (
                <button
                  key={label}
                  onClick={() => setSelectedCategory(label)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border"
                  style={{
                    background: active ? C.green : "#FFFFFF",
                    color: active ? "#FFFFFF" : C.muted,
                    borderColor: active ? C.green : C.border
                  }}
                >
                  <Icon size={11} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>

        </div>
      </div>

      {/* ── HIGH PERFORMANCE PRODUCT COLUMNS GRID ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2 py-3 md:px-6 md:py-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm font-semibold">No food items match your criteria.</p>
            <button onClick={() => { setSearch(""); setSelectedCategory("All") }} className="text-xs text-emerald-700 font-bold underline mt-1">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => {
              const isVeg = p.type === "Veg"

              return (
                <div
                  key={p.id}
                  onClick={() => { setSelectedProduct(p); setIsModalOpen(true); }}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs flex flex-col relative transition-all active:scale-[0.99] md:hover:shadow-md md:rounded-2xl cursor-pointer"
                >
                  {/* Card Media Wrapper Layout */}
                  <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    
                    <div className="absolute top-1.5 left-1.5 flex flex-col gap-1 pointer-events-none z-10">
                      {p.bestSeller && (
                        <span className="text-[8px] font-extrabold bg-red-700 text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wider shadow-xs">
                          Bestseller
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-1.5 left-1.5 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[9px] font-bold text-gray-800 shadow-2xs">
                      <Star size={8} className="fill-amber-500 text-amber-500" />
                      <span>{p.rating}</span>
                    </div>
                  </div>

                  {/* Context Info Payload Block */}
                  <div className="p-2 flex flex-col flex-1 md:p-4">
                    
                    {/* STANDARD DOT-IN-SQUARE INDIAN DIET CLASSIFICATION BADGE */}
                    <div className="flex items-start gap-1.5 mb-1">
                      <div className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center rounded p-[2px] ${
                        isVeg ? "border-green-600" : "border-amber-800"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          isVeg ? "bg-green-600" : "bg-amber-800"
                        }`} />
                      </div>
                      
                      <h2 className="text-xs font-bold text-gray-900 line-clamp-1 leading-tight md:text-base">
                        {p.name}
                      </h2>
                    </div>
                    
                    <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5 hidden xs:block md:text-xs md:mt-1">
                      {p.description}
                    </p>

                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="inline-flex items-center gap-0.5 text-[8px] font-semibold text-red-700 bg-red-50 px-1.5 py-0.2 rounded-sm md:text-[10px]">
                        <Flame size={7} /> {p.spice}
                      </span>
                    </div>

                    {/* Pricing Layout Block Footer */}
                    <div className="flex items-center justify-between gap-1 mt-3 pt-2 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-gray-900 md:text-base">
                          ₹{p.basePrice}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded md:text-xs md:px-2.5 md:py-1">
                        Options
                      </span>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* FLOAT BASKET BAR DRAWER ACTION OVERLAY */}
      <AnimatePresence>
        {totalCartItems > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
          >
            <div className="bg-emerald-800 text-white rounded-xl shadow-xl px-4 py-3 flex items-center justify-between border border-emerald-900/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-900/50 flex items-center justify-center relative">
                  <ShoppingBag size={14} />
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-gray-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartItems}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold leading-none">₹{cartTotal}</p>
                  <p className="text-[10px] text-emerald-200 mt-0.5">Items added to your basket</p>
                </div>
              </div>
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent("toggleCartDrawer"))}
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 text-xs font-black px-4 py-2 rounded-lg shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                View Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={selectedProduct}
          />
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}