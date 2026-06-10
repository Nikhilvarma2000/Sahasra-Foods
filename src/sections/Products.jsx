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
  Flame,
  ChevronRight,
} from "lucide-react"
import { useCart } from "../context/CartContext"
import { GOOGLE_SHEETS_CSV_URL, FALLBACK_PRODUCTS } from "../data/products"

const CATEGORIES = [
  { label: "All", icon: LayoutGrid },
  { label: "Veg Pickles", icon: Leaf },
  { label: "Non Veg Specials", icon: Drumstick },
  { label: "Powders & Masalas", icon: Coffee },
  { label: "Traditional Snacks", icon: Cookie },
]

const SORT_OPTIONS = [
  { value: "featured", label: "Popular" },
  { value: "rating", label: "Top Rated" },
  { value: "low", label: "Price: Low" },
  { value: "high", label: "Price: High" },
]

const SPICE_COLORS = {
  Mild: "#10B981",
  Medium: "#F59E0B",
  Spicy: "#EF4444",
  Hot: "#991B1B",
}

export default function Products({ onProductSelect, onOpenCart }) {
  const { cartTotal, totalItems } = useCart()

  const [products, setProducts] = useState(FALLBACK_PRODUCTS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [sortOpen, setSortOpen] = useState(false)

  const autoCategorize = (name, type) => {
    const lower = name.toLowerCase()
    if (
      type.toLowerCase().includes("non") ||
      lower.includes("chicken") ||
      lower.includes("prawn") ||
      lower.includes("mutton")
    ) return "Non Veg Specials"
    if (
      lower.includes("podi") ||
      lower.includes("masala") ||
      lower.includes("powder") ||
      lower.includes("karam")
    ) return "Powders & Masalas"
    if (
      lower.includes("murukulu") ||
      lower.includes("snack") ||
      lower.includes("chekkalu") ||
      lower.includes("mixture")
    ) return "Traditional Snacks"
    return "Veg Pickles"
  }

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const response = await fetch(GOOGLE_SHEETS_CSV_URL)
        const csvText = await response.text()
        const rows = csvText
          .split("\n")
          .map((row) => row.trim())
          .filter((row) => row.length > 0)
        if (rows.length <= 1) return

        const parsedItems = rows
          .slice(1)
          .map((rowLine) => {
            const columns = rowLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
            const clean = (str) => (str ? str.replace(/^"|"$/g, "").trim() : "")
            const id = parseInt(clean(columns[0]))
            const name = clean(columns[1])
            const itemType = clean(columns[5]) || "Veg"
            const category = autoCategorize(name, itemType)
            return {
              id,
              name,
              category,
              basePrice: parseFloat(clean(columns[2])) || 150,
              image:
                clean(columns[3]) ||
                "https://images.unsplash.com/photo-1547592180-85f173990554",
              description: clean(columns[4]) || "Authentic homemade specialty.",
              type: itemType.toLowerCase().includes("non") ? "Non Veg" : "Veg",
              spice: itemType.toLowerCase().includes("non")
                ? "Spicy"
                : id % 2 === 0
                ? "Medium"
                : "Mild",
              rating:
                parseFloat((4.6 + (id % 5) * 0.1).toFixed(1)) || 4.8,
              reviews: 80 + id * 14,
              bestSeller: id === 1 || id === 3 || id % 4 === 0,
            }
          })
          .filter((item) => !isNaN(item.id))

        if (parsedItems.length > 0) setProducts(parsedItems)
      } catch (error) {
        console.error("Fallback products loaded:", error)
        setProducts(FALLBACK_PRODUCTS)
      }
    }
    fetchLiveProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let list = [...products]
    if (search.trim()) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory)
    }
    switch (sortBy) {
      case "low":
        list.sort((a, b) => a.basePrice - b.basePrice)
        break
      case "high":
        list.sort((a, b) => b.basePrice - a.basePrice)
        break
      case "rating":
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        list.sort((a, b) => (b.bestSeller || 0) - (a.bestSeller || 0))
    }
    return list
  }, [search, selectedCategory, sortBy, products])

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label

  return (
    <div
      id="products"
      className="min-h-screen flex flex-col bg-[#FDFBF7]"
    >
      {/* SECTION HEADER */}
      <div className="px-4 pt-24 pb-5 text-center max-w-xl mx-auto">
        <p className="text-[10px] tracking-[4px] text-[#6E0E12] font-black uppercase mb-2">
          Fresh Daily Homemade
        </p>
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#121212]">
          ORDER FRESH{" "}
          <span className="text-[#0B5D3B]">ANDHRA</span> SPECIALS
        </h1>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          Crafted in small batches using authentic family recipes
        </p>
      </div>

      {/* STICKY FILTER BAR */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-3 py-2.5 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col gap-2.5">

          {/* SEARCH + SORT ROW */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                value={search}
                placeholder="Search pickles, powders..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-9 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0B5D3B]/50 transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 active:scale-90 touch-manipulation"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* SORT DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-1.5 text-xs font-bold whitespace-nowrap touch-manipulation active:bg-gray-100 transition-colors"
              >
                <SlidersHorizontal size={12} className="text-gray-500" />
                <span>{currentSortLabel}</span>
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setSortOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl w-40 z-50"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value)
                            setSortOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 text-xs font-semibold transition-colors touch-manipulation ${
                            sortBy === opt.value
                              ? "bg-[#0B5D3B] text-white"
                              : "hover:bg-gray-50 text-gray-700 active:bg-gray-100"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CATEGORY CHIPS */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {CATEGORIES.map(({ label, icon: Icon }) => {
              const active = selectedCategory === label
              return (
                <button
                  key={label}
                  onClick={() => setSelectedCategory(label)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap transition-all touch-manipulation active:scale-95 flex-shrink-0 ${
                    active
                      ? "border-transparent text-white bg-[#0B5D3B] shadow-sm"
                      : "border-gray-200 text-gray-600 bg-white"
                  }`}
                >
                  <Icon size={11} />
                  <span>{label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div className="max-w-6xl mx-auto w-full px-3 pt-3 pb-1">
        <p className="text-[11px] text-gray-400 font-medium">
          {filteredProducts.length} product
          {filteredProducts.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
        </p>
      </div>

      {/* PRODUCTS GRID */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-2 py-3 pb-28">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-300">
              <ShoppingBag size={24} />
            </div>
            <h3 className="text-sm font-bold text-gray-700">No products found</h3>
            <p className="text-xs text-gray-400 mt-1">
              Try a different search or category
            </p>
            <button
              onClick={() => {
                setSearch("")
                setSelectedCategory("All")
              }}
              className="mt-4 px-5 py-2 rounded-xl bg-[#0B5D3B] text-white text-xs font-bold touch-manipulation active:scale-95 transition-transform"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredProducts.map((p) => {
              const isVeg = p.type === "Veg"
              const spiceColor = SPICE_COLORS[p.spice] || "#F59E0B"
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onProductSelect && onProductSelect(p)}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md cursor-pointer active:scale-[0.97] transition-all duration-200 select-none touch-manipulation"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                    {p.bestSeller && (
                      <span className="absolute top-2 left-2 bg-[#6E0E12] text-white text-[7px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase shadow-md">
                        Bestseller
                      </span>
                    )}

                    {/* VEG / NON-VEG INDICATOR */}
                    <div
                      className={`absolute top-2 right-2 w-5 h-5 rounded border-2 flex items-center justify-center bg-white shadow-sm ${
                        isVeg ? "border-green-600" : "border-red-600"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isVeg ? "bg-green-600" : "bg-red-600"
                        }`}
                      />
                    </div>

                    {/* BOTTOM OVERLAY — RATING + SPICE */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-lg shadow-sm">
                        <Star size={9} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-[10px] font-bold text-gray-800">
                          {p.rating}
                        </span>
                      </div>
                      <div
                        className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg backdrop-blur-sm"
                        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                      >
                        <Flame size={8} style={{ color: spiceColor }} />
                        <span className="text-[9px] font-bold text-white">
                          {p.spice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CARD CONTENT */}
                  <div className="p-3">
                    <h2 className="text-xs md:text-[13px] font-bold text-gray-900 leading-snug line-clamp-2 mb-1">
                      {p.name}
                    </h2>
                    <p className="text-[10px] text-gray-400 line-clamp-1 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-50">
                      <div>
                        <p className="text-[9px] text-gray-400 font-medium leading-none mb-0.5">
                          From
                        </p>
                        <span className="text-sm font-black text-[#0B5D3B]">
                          ₹{p.basePrice}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#0B5D3B] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-xl">
                        <span>View</span>
                        <ChevronRight size={9} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </main>

      {/* FLOATING CART BAR */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-3 right-3 z-50 max-w-md mx-auto"
            style={{
              bottom: "max(20px, calc(env(safe-area-inset-bottom, 0px) + 12px))",
            }}
          >
            <div className="bg-[#0B5D3B] text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-2xl border border-[#094d31]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-[#094d31] flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={16} />
                  <span className="absolute -top-1.5 -right-1.5 bg-[#D4A437] text-[#121212] text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black leading-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-black leading-tight">₹{cartTotal}</p>
                  <p className="text-[10px] text-emerald-200 leading-tight">
                    {totalItems} {totalItems === 1 ? "item" : "items"} in cart
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenCart && onOpenCart()
                }}
                className="flex items-center gap-1.5 bg-white text-[#0B5D3B] text-xs font-black px-4 py-2.5 rounded-xl active:scale-95 transition-transform touch-manipulation shadow-sm"
              >
                <span>View Cart</span>
                <ChevronRight size={11} strokeWidth={3} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
