import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { FaArrowRight, FaArrowLeft, FaChevronRight } from "react-icons/fa"
import ProductCard from "./ProductCard"

/* ─────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────── */
const C = {
  cream:  "#FFF9EE",
  green:  "#0B5D3B",
  gold:   "#D4A437",
  dark:   "#1A1A1A",
  red:    "#6E0E12",
  muted:  "#9CA3AF",
  border: "rgba(212,164,55,0.18)",
}

/* ─────────────────────────────────────────────
   ORNAMENT DIVIDER (matches other components)
───────────────────────────────────────────── */
function OrnamentDivider() {
  return (
    <div style={{
      display: "flex", alignItems: "center",
      gap: 10, margin: "8px 0 0", maxWidth: 320,
    }}>
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(to right, ${C.gold}70, transparent)`,
      }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="7" y="0" width="4.95" height="4.95" rx="0.6"
          transform="rotate(45 7 0)" fill={C.gold} />
        <rect x="7" y="0" width="2.8" height="2.8" rx="0.3"
          transform="rotate(45 7 0)" fill={C.cream} />
      </svg>
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(to right, transparent, ${C.gold}30)`,
      }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   NAV ARROW BUTTON
───────────────────────────────────────────── */
function NavArrow({ direction, onClick, disabled }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 42, height: 42, borderRadius: "50%",
        border: `1.5px solid ${disabled ? C.border : hovered ? C.green : C.border}`,
        background: disabled ? "transparent" : hovered ? C.green : "#fff",
        color: disabled ? C.border : hovered ? "#fff" : C.dark,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        flexShrink: 0,
        boxShadow: !disabled && hovered ? `0 6px 20px ${C.green}35` : "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.22s ease",
        opacity: disabled ? 0.35 : 1,
      }}
    >
      {direction === "left"
        ? <FaArrowLeft  size={12} />
        : <FaArrowRight size={12} />
      }
    </motion.button>
  )
}

/* ─────────────────────────────────────────────
   SCROLL DOTS
───────────────────────────────────────────── */
function ScrollDots({ total, activeIndex }) {
  const visible = Math.min(total, 5)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      {Array.from({ length: visible }).map((_, i) => {
        const isActive = i === Math.min(activeIndex, visible - 1)
        return (
          <motion.div
            key={i}
            animate={{
              width: isActive ? 22 : 6,
              background: isActive ? C.green : `${C.gold}55`,
            }}
            transition={{ duration: 0.25 }}
            style={{ height: 6, borderRadius: 999 }}
          />
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────
   PRODUCT ROW
───────────────────────────────────────────── */
export default function ProductRow({ title, subtitle, products, onOpen }) {
  const scrollRef   = useRef(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [dotIndex, setDotIndex] = useState(0)

  /* ── Update nav state on scroll ── */
  const updateNav = () => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
    const cardWidth = el.querySelector("[data-card]")?.offsetWidth || 380
    setDotIndex(Math.round(el.scrollLeft / (cardWidth + 20)))
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", updateNav, { passive: true })
    updateNav()
    return () => el.removeEventListener("scroll", updateNav)
  }, [products])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector("[data-card]")?.offsetWidth || 380
    el.scrollBy({ left: dir === "right" ? cardWidth + 20 : -(cardWidth + 20), behavior: "smooth" })
  }

  return (
    <section style={{ position: "relative", marginBottom: 80 }}>

      {/* ════════════════════════════════
          SECTION HEADER
      ════════════════════════════════ */}
      <div style={{
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", gap: 16,
        marginBottom: 28,
      }}>

        {/* ── Left: Title block ── */}
        <div>
          {/* Category label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: 10, letterSpacing: "0.14em",
              textTransform: "uppercase", fontWeight: 700,
              color: C.gold, marginBottom: 6,
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span style={{
              display: "inline-block", width: 18, height: 1.5,
              background: C.gold, borderRadius: 1,
            }} />
            Sahasra Foods
          </motion.p>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(1.6rem, 4vw, 3rem)",
              fontWeight: 800, color: C.dark, lineHeight: 1.1,
            }}
          >
            {title}
          </motion.h2>

          <OrnamentDivider />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              fontSize: 13, color: C.muted, marginTop: 8,
              maxWidth: 480, lineHeight: 1.65,
            }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ── Right: Nav cluster ── */}
        <div style={{
          flexShrink: 0, display: "flex", flexDirection: "column",
          alignItems: "flex-end", gap: 14,
        }}>

          {/* Explore button — desktop */}
          <motion.button
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "none",
              alignItems: "center", gap: 8,
              padding: "10px 20px", borderRadius: 12,
              border: `1.5px solid ${C.border}`,
              background: "#fff",
              color: C.dark, fontSize: 13, fontWeight: 700,
              cursor: "pointer", transition: "all 0.22s",
              fontFamily: "Cinzel, serif",
              letterSpacing: "0.03em",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.green
              e.currentTarget.style.color = "#fff"
              e.currentTarget.style.borderColor = C.green
              e.currentTarget.style.boxShadow = `0 6px 22px ${C.green}40`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff"
              e.currentTarget.style.color = C.dark
              e.currentTarget.style.borderColor = C.border
              e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)"
            }}
            className="md:flex"
          >
            Explore All
            <FaChevronRight size={11} />
          </motion.button>

          {/* Arrow nav + dots */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <ScrollDots total={products.length} activeIndex={dotIndex} />

            <div style={{ width: 1, height: 20, background: C.border, margin: "0 4px" }} />

            <NavArrow direction="left"  onClick={() => scroll("left")}  disabled={!canLeft}  />
            <NavArrow direction="right" onClick={() => scroll("right")} disabled={!canRight} />
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════
          SCROLL TRACK
      ════════════════════════════════ */}
      <div style={{ position: "relative" }}>

        {/* Left fade */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: 64, zIndex: 10, pointerEvents: "none",
          background: `linear-gradient(to right, ${C.cream}, transparent)`,
          opacity: canLeft ? 1 : 0,
          transition: "opacity 0.3s",
        }} className="hidden lg:block" />

        {/* Right fade */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: 64, zIndex: 10, pointerEvents: "none",
          background: `linear-gradient(to left, ${C.cream}, transparent)`,
          opacity: canRight ? 1 : 0,
          transition: "opacity 0.3s",
        }} className="hidden lg:block" />

        {/* ── Scrollable row ── */}
        <div
          ref={scrollRef}
          style={{
            display: "flex", gap: 20,
            overflowX: "auto", overflowY: "visible",
            paddingBottom: 12, paddingTop: 6,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            /* hide scrollbar */
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <style>{`
            div[data-scroll-track]::-webkit-scrollbar { display: none; }
          `}</style>

          {products.map((product, index) => (
            <motion.div
              key={product.id}
              data-card
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.48, delay: index * 0.08, ease: "easeOut" }}
              style={{
                flexShrink: 0,
                scrollSnapAlign: "start",
                /* responsive widths */
                width: "min(88vw, 360px)",
              }}
              className="sm:w-[360px] lg:w-[380px]"
            >
              <ProductCard product={product} onOpen={onOpen} />
            </motion.div>
          ))}

          {/* End spacer */}
          <div style={{ flexShrink: 0, width: 4 }} />
        </div>
      </div>

      {/* ── Mobile "Explore All" ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex md:hidden justify-center mt-6"
      >
        <button style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "11px 28px", borderRadius: 12,
          border: `1.5px solid ${C.border}`,
          background: "#fff", color: C.dark,
          fontSize: 13, fontWeight: 700,
          fontFamily: "Cinzel, serif",
          letterSpacing: "0.03em",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}>
          Explore All <FaChevronRight size={11} />
        </button>
      </motion.div>

    </section>
  )
}