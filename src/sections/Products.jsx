import { useMemo, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Flame,
  ChevronRight,
  SlidersHorizontal,
  X,
  Leaf,
  Drumstick,
  Coffee,
  Cookie,
  LayoutGrid,
} from "lucide-react"
import ProductCard from "../components/ProductCard"
import ProductModal from "../components/ProductModal"

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (same palette, same Cinzel)
───────────────────────────────────────────── */
const C = {
  cream:  "#FFF9EE",
  green:  "#0B5D3B",
  gold:   "#D4A437",
  dark:   "#1A1A1A",
  muted:  "#6B7280",
  card:   "#FFFDF5",
  border: "rgba(212,164,55,0.20)",
}

/* ─────────────────────────────────────────────
   CATEGORY META
───────────────────────────────────────────── */
const CATEGORIES = [
  { label: "All",                icon: LayoutGrid },
  { label: "Veg Pickles",        icon: Leaf       },
  { label: "Non Veg Specials",   icon: Drumstick  },
  { label: "Powders & Masalas",  icon: Coffee     },
  { label: "Traditional Snacks", icon: Cookie     },
]

const SORT_OPTIONS = [
  { value: "featured", label: "Featured"    },
  { value: "rating",   label: "Top Rated"   },
  { value: "low",      label: "Price: Low"  },
  { value: "high",     label: "Price: High" },
]

/* ─────────────────────────────────────────────
   PRODUCTS DATA
───────────────────────────────────────────── */
const ALL_PRODUCTS = [
  {
    id: 1, name: "Avakaya Pickle", category: "Veg Pickles",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",
    basePrice: 149, spice: "Medium", rating: 4.9, reviews: 284, bestSeller: true,
    description: "Authentic Andhra mango pickle prepared using traditional homemade recipes.",
  },
  {
    id: 2, name: "Gongura Pickle", category: "Veg Pickles",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop",
    basePrice: 169, spice: "Spicy", rating: 4.8, reviews: 196,
    description: "Traditional gongura pickle packed with rich Andhra flavours.",
  },
  {
    id: 3, name: "Tomato Pickle", category: "Veg Pickles",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1200&auto=format&fit=crop",
    basePrice: 139, spice: "Medium", rating: 4.7, reviews: 142,
    description: "Fresh homemade tomato pickle with authentic spices.",
  },
  {
    id: 4, name: "Chicken Pickle", category: "Non Veg Specials",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1200&auto=format&fit=crop",
    basePrice: 249, spice: "Hot", rating: 5, reviews: 421, bestSeller: true,
    description: "Rich and spicy homemade chicken pickle with premium ingredients.",
  },
  {
    id: 5, name: "Prawn Pickle", category: "Non Veg Specials",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop",
    basePrice: 329, spice: "Spicy", rating: 4.9, reviews: 176,
    description: "Premium prawn pickle prepared in traditional Andhra style.",
  },
  {
    id: 6, name: "Mutton Pickle", category: "Non Veg Specials",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    basePrice: 349, spice: "Hot", rating: 4.8, reviews: 210,
    description: "Slow-cooked mutton pickle bursting with authentic flavour.",
  },
  {
    id: 7, name: "Karivepaku Powder", category: "Powders & Masalas",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
    basePrice: 99, spice: "Mild", rating: 4.7, reviews: 88,
    description: "Fresh curry leaves powder made in small homemade batches.",
  },
  {
    id: 8, name: "Kandi Powder", category: "Powders & Masalas",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
    basePrice: 109, spice: "Medium", rating: 4.8, reviews: 97,
    description: "Authentic kandi podi prepared with roasted lentils and spices.",
  },
  {
    id: 9, name: "Murukulu", category: "Traditional Snacks",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop",
    basePrice: 129, spice: "Medium", rating: 4.6, reviews: 118,
    description: "Crunchy homemade Andhra murukulu prepared fresh daily.",
  },
  {
    id: 10, name: "Chekkalu", category: "Traditional Snacks",
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=1200&auto=format&fit=crop",
    basePrice: 119, spice: "Mild", rating: 4.7, reviews: 111,
    description: "Traditional crispy rice snacks with authentic taste.",
  },
]

/* ─────────────────────────────────────────────
   DECORATIVE DIVIDER
───────────────────────────────────────────── */
function OrnamentDivider({ small = false }) {
  return (
    <div className={`flex items-center gap-3 ${small ? "my-3" : "my-5"}`}>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${C.gold})` }} />
      <svg width={small ? 16 : 22} height={small ? 16 : 22} viewBox="0 0 22 22" fill="none">
        <rect x="11" y="0" width="7.78" height="7.78" rx="1" transform="rotate(45 11 0)" fill={C.gold} fillOpacity="0.9" />
        <rect x="11" y="0" width="4.5"  height="4.5"  rx="0.5" transform="rotate(45 11 0)" fill={C.cream} />
      </svg>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${C.gold})` }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader({ title, count, onExplore }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
      <div>
        <h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight"
          style={{ fontFamily: "Cinzel, serif", color: C.dark }}
        >
          {title}
        </h3>
        <OrnamentDivider small />
        <p className="text-sm mt-1" style={{ color: C.muted }}>
          {count} authentic {count === 1 ? "item" : "items"} · Handcrafted daily
        </p>
      </div>
      <button
        onClick={onExplore}
        className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:gap-3"
        style={{
          border: `1.5px solid ${C.green}`,
          color: C.green,
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = C.green
          e.currentTarget.style.color = "#fff"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.color = C.green
        }}
      >
        Explore All <ChevronRight size={15} />
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PRODUCT SLIDER SECTION
───────────────────────────────────────────── */
function ProductSlider({ title, products, onOpen }) {
  if (!products.length) return null

  return (
    <motion.div
      className="mb-20"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <SectionHeader
        title={title}
        count={products.length}
        onExplore={() => {}}
      />

      {/* MOBILE — swiper */}
      <div className="sm:hidden -mx-4 px-4">
        <Swiper spaceBetween={14} slidesPerView={1.18} grabCursor>
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} onOpen={onOpen} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* DESKTOP — grid */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <ProductCard product={p} onOpen={onOpen} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [search, setSearch]                     = useState("")
  const [sortBy, setSortBy]                     = useState("featured")
  const [selectedProduct, setSelectedProduct]   = useState(null)
  const [isModalOpen, setIsModalOpen]           = useState(false)
  const [sortOpen, setSortOpen]                 = useState(false)

  const handleOpenModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  /* ── Filter + Sort ── */
  const filteredProducts = useMemo(() => {
    let list = [...ALL_PRODUCTS]

    if (search.trim())
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )

    if (selectedCategory !== "All")
      list = list.filter((p) => p.category === selectedCategory)

    switch (sortBy) {
      case "low":    list.sort((a, b) => a.basePrice - b.basePrice); break
      case "high":   list.sort((a, b) => b.basePrice - a.basePrice); break
      case "rating": list.sort((a, b) => b.rating - a.rating);       break
      default:       list.sort((a, b) => (b.bestSeller || 0) - (a.bestSeller || 0))
    }

    return list
  }, [search, selectedCategory, sortBy])

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label

  return (
    <>
      {/* ════════════════════════════════════════
          PAGE WRAPPER
      ════════════════════════════════════════ */}
      <section
        id="products"
        style={{
          background: C.cream,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background Texture Dots ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${C.gold}22 1.5px, transparent 1.5px)`,
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        {/* ── Soft radial glows ── */}
        <div aria-hidden="true" style={{
          position: "absolute", top: -160, right: -120,
          width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.gold}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div aria-hidden="true" style={{
          position: "absolute", bottom: -180, left: -100,
          width: 480, height: 480, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.green}14 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* ════════════════════════════════════════
            HERO HEADING
        ════════════════════════════════════════ */}
        <div
          className="relative z-10 text-center px-4 pt-20 pb-12 sm:pt-28 sm:pb-16 max-w-4xl mx-auto"
        >
          {/* top label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-5 px-5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: `${C.green}12`,
              color: C.green,
              border: `1px solid ${C.green}30`,
              fontFamily: "Cinzel, serif",
            }}
          >
            <Flame size={12} /> Straight from the Kitchen
          </motion.div>

          {/* main title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
            style={{ fontFamily: "Cinzel, serif", color: C.dark }}
          >
            Authentic<br />
            <span style={{ color: C.green }}>Andhra</span>{" "}
            <span style={{ color: C.gold }}>Specials</span>
          </motion.h2>

          <OrnamentDivider />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-base sm:text-lg mt-2"
            style={{ color: C.muted, maxWidth: 520, margin: "0.5rem auto 0" }}
          >
            Traditional homemade foods crafted fresh every day —
            preserving generations of authentic Andhra flavour.
          </motion.p>
        </div>

        {/* ════════════════════════════════════════
            STICKY FILTER BAR
        ════════════════════════════════════════ */}
        <div
          className="sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-4"
          style={{
            background: `${C.cream}f0`,
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col gap-4">

            {/* Row 1 — Search + Sort */}
            <div className="flex items-center gap-3">

              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: C.gold }}
                />
                <input
                  type="text"
                  placeholder="Search pickles, powders, snacks…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 text-sm outline-none transition-all"
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 12,
                    color: C.dark,
                    fontFamily: "inherit",
                    boxShadow: "0 2px 12px rgba(212,164,55,0.07)",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = C.gold)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full"
                    style={{ color: C.muted }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-2 h-11 px-4 text-sm font-semibold whitespace-nowrap rounded-xl transition-colors"
                  style={{
                    background: "#fff",
                    border: `1.5px solid ${C.border}`,
                    color: C.dark,
                    boxShadow: "0 2px 12px rgba(212,164,55,0.07)",
                  }}
                >
                  <SlidersHorizontal size={14} style={{ color: C.green }} />
                  <span className="hidden sm:inline">{currentSortLabel}</span>
                </button>

                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-14 rounded-2xl overflow-hidden text-sm w-48"
                      style={{
                        background: "#fff",
                        border: `1.5px solid ${C.border}`,
                        boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                        zIndex: 50,
                      }}
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                          className="w-full text-left px-5 py-3 transition-colors font-medium"
                          style={{
                            background: sortBy === opt.value ? `${C.green}10` : "transparent",
                            color: sortBy === opt.value ? C.green : C.dark,
                            borderLeft: sortBy === opt.value ? `3px solid ${C.green}` : "3px solid transparent",
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Row 2 — Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {CATEGORIES.map(({ label, icon: Icon }) => {
                const active = selectedCategory === label
                return (
                  <button
                    key={label}
                    onClick={() => setSelectedCategory(label)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all"
                    style={{
                      fontFamily: "Cinzel, serif",
                      background: active ? C.green : "#fff",
                      color: active ? "#fff" : C.muted,
                      border: `1.5px solid ${active ? C.green : C.border}`,
                      boxShadow: active ? `0 4px 14px ${C.green}40` : "none",
                      transform: active ? "translateY(-1px)" : "none",
                    }}
                  >
                    <Icon size={13} />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            RESULTS COUNT
        ════════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
          <p className="text-xs font-medium tracking-wider uppercase" style={{ color: C.muted }}>
            {filteredProducts.length === 0
              ? "No products found"
              : `${filteredProducts.length} ${filteredProducts.length === 1 ? "product" : "products"} found`
            }
          </p>
        </div>

        {/* ════════════════════════════════════════
            PRODUCT LISTINGS
        ════════════════════════════════════════ */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: `${C.gold}18` }}
              >
                <Search size={28} style={{ color: C.gold }} />
              </div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: "Cinzel, serif", color: C.dark }}
              >
                No Results
              </h3>
              <p style={{ color: C.muted }} className="text-sm">
                Try a different search or category
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedCategory("All") }}
                className="mt-5 px-6 py-2 rounded-full text-sm font-semibold"
                style={{ background: C.green, color: "#fff" }}
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Category "All" — grouped sliders */}
          {selectedCategory === "All" && filteredProducts.length > 0 && (
            <>
              {["Veg Pickles", "Non Veg Specials", "Powders & Masalas", "Traditional Snacks"].map((cat) => {
                const catProducts = filteredProducts.filter((p) => p.category === cat)
                return (
                  <ProductSlider
                    key={cat}
                    title={cat}
                    products={catProducts}
                    onOpen={handleOpenModal}
                  />
                )
              })}
            </>
          )}

          {/* Filtered single category */}
          {selectedCategory !== "All" && filteredProducts.length > 0 && (
            <ProductSlider
              title={selectedCategory}
              products={filteredProducts}
              onOpen={handleOpenModal}
            />
          )}
        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={selectedProduct}
          />
        )}
      </AnimatePresence>

      {/* ── Global style: hide scrollbar on category pills ── */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  )
}
